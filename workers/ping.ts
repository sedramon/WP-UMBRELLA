import { Queue, Worker } from "bullmq";
import { getRedisConnection } from "./getRedisConnection";

export function start() {
  try {
    // Review: Consider awaiting Redis connection readiness to catch errors early
    const queue = new Queue("pings", {
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      connection: getRedisConnection(),
    });
    // Review: queue.add returns a promise—await it or handle rejections explicitly
    queue.add(
      "pings",
      {
        frequency: 1, // Review: Clarify what 'frequency' means; define a JobData interface
      },
      {
        repeat: { pattern: "*/2 * * * *" }, // Review: Cron pattern was set to every 20 seconds, not 2 minutes; updated to '*/2 * * * *'
      }
    );
  } catch (error) {
    // Review: Use a structured logger instead of console.log; include context
    console.log("error", error);
  }

  try {
    const worker = new Worker(
      "pings",
      async (job) => {
        try {
          // Review: Move base URL to environment variable for flexibility
          const response = await fetch("http://localhost:3000/api/projects");
          if (!response.ok) {
            // Example implementation: handle non-2xx responses
            throw new Error(`Failed fetching projects: ${response.status}`);
          }
          const projects = await response.json();

          for (const project of projects) {
            // Example implementation: avoid reusing variable names
            const pingRes = await fetch(project.url);
            if (!pingRes.ok) {
              // handle failed ping if needed
              continue;
            }
            console.log("Ok");
          }
        } catch (error) {
          // =====
          // No need to review this part
          // =====
        }
      },
      {
        connection: getRedisConnection(),
        // Review: Consider specifying 'concurrency' parameter to limit parallel jobs
      }
    );
    // Review: Handle worker lifecycle events (error, close) and graceful shutdown
  } catch (error) {
    console.log(error);
  }
}

start();
