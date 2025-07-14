import { npmInitSpawn } from "./npmInitSpawn.mjs";
import { readmeInit } from "./readmeInit.mjs";
import { logTimestampArrow } from "@gld5000k/timestamp";
export function indexRun() {
  logTimestampArrow();
  npmInitSpawn();
  readmeInit();
}
