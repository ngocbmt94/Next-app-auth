import path from "path";
import fs from "fs";

export function buildPath(fileName) {
  return path.join(process.cwd(), "db", fileName);
}

export function extractData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData); // covert json to data
  return data;
}
