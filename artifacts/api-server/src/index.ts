import app from "./app";
import { logger } from "./lib/logger";
import { startBot } from "./lib/bot";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

process.on("uncaughtException", (err) => {
  logger.error({ err }, "خطأ غير متوقع — تم التجاهل للحفاظ على الجلسة");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "رفض وعد غير معالج — تم التجاهل للحفاظ على الجلسة");
});

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  startBot();
});
