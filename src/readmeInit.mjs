import * as fs from "fs";
import { answerStringQuestion } from "@gld5000-cli/readline";

function getPackageObject() {
  const packageJsonContent = getFile("./package.json");
  const packageObject = JSON.parse(packageJsonContent);
  return packageObject;
}
/**
 * Get file content from path in e.g. "./package.json"
 * @param {string} pathIn
 * @returns {string}
 */
function getFile(pathIn = "./package.json") {
  try {
    return fs.readFileSync(pathIn, "utf8");
  } catch (error) {
    console.log("error:", error);
    return "";
  }
}
/**
 * Write file content to path in e.g. "./package.json"
 * @param {string} content
 * @param {string} pathIn
 * @returns {string}
 */
function writeFile(content, pathIn = "./README.md") {
  try {
    return fs.writeFileSync(pathIn, content, "utf8");
  } catch (error) {
    return JSON.stringify(error);
  }
}
function getLicense() {
  return getFile("./LICENSE");
}
function getReadme() {
  return getFile("./README.md");
}
export async function readmeInit() {
  const intro =
    "\n\nThis utility will walk you through creating a README.md file for your NPM package.\n\nIt only covers some useful items, and uses your package.json to generate defaults.\n\nPress ^C at any time to quit.\n\n";
  console.log(intro);
  const { name, description } = getPackageObject();
  const license = getLicense();
  const readme = getReadme();
  const hasBinExecutable = checkBin();
  const header = await answerStringQuestion("Header", `# [${name}](https://www.npmjs.com/package/${name})`);
  const install = await answerStringQuestion("Install", `npm i -D ${name}`);
  const importExample = await answerStringQuestion("Import", `import { * as ${kebabToCamel(name.split("/")[1])} } from '${name}'`);

  const lines = [
    readme,
    header,
    `${description}`,
    `## Install`,
    ...getScriptBlock(install),
    `## Example Usage`,
    `### Import (.mjs)`,
    ...getScriptBlock(importExample),
    `### Example Input`,
    ...getScriptBlock(`...`),
    `### Example Output`,
    ...getScriptBlock(`...`),
    `## Update`,
    ...getScriptBlock(`npm update ${name}`),
    `## Uninstall`,
    ...getScriptBlock(`npm uninstall ${name}`),
    hasBinExecutable
      ? `## Execute Directly from NPM \n${getScriptBlock(`npx ${name}`).join(
          "\n"
        )}`
      : "",
    `## License`,
    license,
  ];
  writeFile(lines.join("\n"));
}
function getScriptBlock(input) {
  return ["```", ...input.split(/[\n\r]+/), "```"];
}

function checkBin() {
  try {
    fs.accessSync("bin");
    return true;
  } catch (error) {
    return false;
  }
}
function kebabToCamel(kebabString) {
  const words = kebabString.trim().split("-");
  let newString = "";
  for (let i = 0; i < words.length; i += 1) {
    if (i === 0) {
      newString += words[i].toLowerCase();
    } else {
      newString +=
        words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
    }
  }
  return newString;
}
