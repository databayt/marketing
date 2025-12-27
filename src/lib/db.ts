import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Get connection string from environment variables
const connectionString = process.env.DATABASE_URL as string;

// Create adapter for PostgreSQL
const adapter = new PrismaPg({ connectionString });

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;

// For debugging Prisma issues
export function debugPrismaEngine() {
  try {
    console.log("Prisma connection URL:", connectionString?.substring(0, 20) + "...");
    console.log("NODE_ENV:", process.env.NODE_ENV);

    return { status: "ok" };
  } catch (error) {
    console.error("Failed to debug Prisma engine:", error);
    return { error: error?.toString() };
  }
}
