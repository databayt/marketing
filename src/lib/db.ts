import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

/**
 * Two runtimes, one `db`:
 *
 * - Cloudflare Workers (production, CF_WORKERS=1): Neon's serverless driver. A Worker's
 *   socket belongs to the request that opened it — reusing it from a later request hangs —
 *   so each request gets its own client, keyed on the per-request ctx object.
 *   (Same recipe as food, space and co.)
 * - Node (local dev, scripts): one client over direct TCP (`pg`).
 */

function nodeClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
  return new PrismaClient({ adapter });
}

function workerClient() {
  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL as string }),
    log: ["error", "warn"],
    errorFormat: "minimal",
  });
}

function workerCtx(): object | undefined {
  if (!process.env.CF_WORKERS) return undefined;
  try {
    return getCloudflareContext().ctx;
  } catch {
    return undefined;
  }
}

const perRequest = new WeakMap<object, PrismaClient>();
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function currentClient(): PrismaClient {
  const ctx = workerCtx();
  if (ctx) {
    let client = perRequest.get(ctx);
    if (!client) {
      client = workerClient();
      perRequest.set(ctx, client);
    }
    return client;
  }
  globalForPrisma.prisma ??= nodeClient();
  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = currentClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
