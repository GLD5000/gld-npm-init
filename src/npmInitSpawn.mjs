import { spawnSync } from "node:child_process";

export function npmInitSpawn() {
  spawnSync("npm init", {
    shell: true,
    detached: true,
    stdio: "ignore",
  });
}
