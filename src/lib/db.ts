import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaPg({ connectionString });

// Attach to global in dev to prevent exhausting the DB connection pool
// across HMR reloads. https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
