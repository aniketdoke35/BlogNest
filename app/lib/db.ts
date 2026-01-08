import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function getDatabaseUrl() {
    const url = process.env.DATABASE_URL
    if (url && url.startsWith("prisma+postgres://")) {
        try {
            const parsed = new URL(url);
            const apiKey = parsed.searchParams.get("api_key");
            if (apiKey) {
                const decoded = Buffer.from(apiKey, "base64").toString("utf-8");
                const json = JSON.parse(decoded);
                if (json.databaseUrl) {
                    return json.databaseUrl;
                }
            }
        } catch (e) {
            console.warn("Failed to decode prisma+postgres URL", e);
        }
    }
    return url;
}

const connectionString = getDatabaseUrl()
const pool = new Pool({
    connectionString,
    max: 1 // Limit pool size for local dev database
})
const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
