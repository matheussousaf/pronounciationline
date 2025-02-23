import { useEffect, useState } from "react";

export function useText() {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchText = async () => {
    setLoading(true);
    const response = await fetch("/api/texts");

    // fake delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await response.json();

    setText(data.text);
    setLoading(false);
  };

  useEffect(() => {
    fetchText();
  }, []);

  return {
    text,
    loading,
  }
}
