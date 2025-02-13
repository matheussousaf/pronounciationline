import { createReadStream } from "fs";
import path from "path";
import csv from "csv-parser";

interface TextData {
  text: string;
  label: string;
}

function parseCSV(filePath: string): Promise<TextData[]> {
  return new Promise((resolve, reject) => {
    const results: TextData[] = [];
    createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export async function GET(req: Request): Promise<Response> {
  try {
    
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level") || "C1";
    const validLevels = ["B1", "B2", "C1", "C2"];
    if (!validLevels.includes(level)) {
      return Response.json(
        { error: "Invalid level. Choose from B1, B2, C1, C2." },
        { status: 400 }
      );
    }
    
    const filePath = path.resolve("src/data", "texts.csv");
    
    const texts = await parseCSV(filePath);
    
    const filteredTexts = texts.filter((item) => item.label === level);
    if (filteredTexts.length === 0) {
      return Response.json(
        { error: "No texts found for this level." },
        { status: 404 }
      );
    }
    
    const randomText =
      filteredTexts[Math.floor(Math.random() * filteredTexts.length)];

    return Response.json(randomText);
  } catch (error) {
    return Response.json(
      { error: error || "Failed to load texts." },
      { status: 500 }
    );
  }
}
