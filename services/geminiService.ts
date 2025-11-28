import { GoogleGenAI } from "@google/genai";
import { TrendingData, Show, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchTrendingSeries = async (): Promise<TrendingData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the current official Top 10 TV Shows on Netflix (Global or US) for this week.
      
      Return a JSON array wrapped in a markdown code block (e.g., \`\`\`json ... \`\`\`).
      Each object in the array should have these fields:
      - "rank": number (1-10)
      - "title": string
      - "genre": string
      - "synopsis": string (short 1 sentence summary)
      - "rating": string (Make up a plausible match percentage like "98% Match" or an IMDB score)
      - "weeksInTop10": number (estimate if unknown)

      Ensure the list is exactly 10 items.`,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is NOT allowed with googleSearch
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    
    // Extract Sources from Grounding Metadata
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web && web.uri)
      .map((web: any) => ({
        title: web.title || "Source",
        uri: web.uri,
      }));

    // Parse JSON from the markdown block
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
    let shows: Show[] = [];

    if (jsonMatch && jsonMatch[1]) {
      try {
        shows = JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error("Failed to parse JSON from block:", e);
      }
    } else {
        // Fallback: try to parse the raw text if the model just returned JSON without blocks
        try {
            const start = text.indexOf('[');
            const end = text.lastIndexOf(']');
            if (start !== -1 && end !== -1) {
                shows = JSON.parse(text.substring(start, end + 1));
            }
        } catch(e) {
            console.error("Failed to parse raw JSON:", e);
        }
    }

    // Sanity check to ensure we have a list
    if (!Array.isArray(shows)) {
      shows = [];
    }

    return { shows, sources };

  } catch (error) {
    console.error("Error fetching trending series:", error);
    throw error;
  }
};
