import Redis, { RedisOptions } from "ioredis";

// Review: Define and spread your RedisOptions into the constructor—currently `config` is unused.
const config: RedisOptions = {
  maxRetriesPerRequest: null,      // Review: BullMQ deprecation warning—ensure you understand retry behavior.
  enableReadyCheck: false,         // Review: Disabling ready check may mask startup failures.
};

/// Review: Pull host/port (and password) from env vars instead of hard‑coding “localhost”/“6379”.
const connection = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  ...(config as object),
});

/// Review: Attach listeners for production‑grade monitoring and error handling.
connection.on("error", (err) => {
  console.error("Redis connection error:", err);
});
connection.on("ready", () => {
  console.log("Redis connected");
});

export const getRedisConnection = () => connection;
export default connection;
