import { npmInitSpawn } from "./npmInitSpawn.mjs";
import { readmeInit } from './readmeInit.mjs'
export function indexRun() {
    
    npmInitSpawn();
    console.log('Log after init');
    readmeInit();
}