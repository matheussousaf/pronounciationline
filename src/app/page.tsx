"use client";

import { useState, useEffect } from "react";

interface TextData {
  text: string;
  label: string;
}

export default function Home() {
  const [textData, setTextData] = useState<TextData | null>(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("C1");

  const fetchRandomText = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/texts?level=${level}`);
      const data = await res.json();
      setTextData(data);
    } catch (error) {
      console.error("Error fetching text:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomText();
  }, [level]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-800">
      <div className="max-w-4xl bg-gray-600 p-6 rounded-lg shadow-md">
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 w-full bg-gray-400 border rounded mb-4"
        >
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : textData ? (
          <>
            <p className="mt-4 whitespace-pre-line">{textData.text}</p>
          </>
        ) : (
          <p className="text-red-600">Failed to load text.</p>
        )}
      </div>
    </main>
  );
}
