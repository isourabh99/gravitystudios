import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "gravity_portfolio";

interface MongoGlobalCache {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoCache: MongoGlobalCache | undefined;
}

let cached = global._mongoCache;

if (!cached) {
  cached = global._mongoCache = { conn: null, promise: null };
}

/**
 * Get cached MongoDB connection instance for Next.js App Router / Server Actions
 */
export async function connectToDatabase(): Promise<{ client: MongoClient | null; db: Db | null; isConnected: boolean; error?: string }> {
  if (!uri) {
    return {
      client: null,
      db: null,
      isConnected: false,
      error: "MONGODB_URI is not set. Please configure MONGODB_URI in your environment or .env.local file.",
    };
  }

  if (cached?.conn) {
    return {
      client: cached.conn.client,
      db: cached.conn.db,
      isConnected: true,
    };
  }

  if (!cached?.promise) {
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached!.promise = MongoClient.connect(uri, opts).then((client) => {
      const db = client.db(dbName);
      return { client, db };
    });
  }

  try {
    cached!.conn = await cached!.promise;
    return {
      client: cached!.conn.client,
      db: cached!.conn.db,
      isConnected: true,
    };
  } catch (err: any) {
    cached!.promise = null;
    return {
      client: null,
      db: null,
      isConnected: false,
      error: err?.message || "Failed to establish MongoDB connection.",
    };
  }
}

/**
 * Test live MongoDB connection
 */
export async function testMongoConnection(): Promise<{ success: boolean; message: string; pingMs?: number }> {
  const startTime = Date.now();
  const conn = await connectToDatabase();

  if (!conn.isConnected || !conn.db) {
    return {
      success: false,
      message: conn.error || "Could not connect to MongoDB server.",
    };
  }

  try {
    await conn.db.command({ ping: 1 });
    const pingMs = Date.now() - startTime;
    return {
      success: true,
      message: `Connected successfully to MongoDB database "${dbName}" in ${pingMs}ms.`,
      pingMs,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Ping failed: ${err.message}`,
    };
  }
}

