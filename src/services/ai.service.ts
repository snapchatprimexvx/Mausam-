// src/services/ai.service.ts
// Gemini AI recommendation service
// Architecture: FRONTEND → BACKEND → Gemini API → Recommendations

import { GoogleGenAI } from '@google/genai';

interface WeatherData {
  location: { name: string; country: string };
  current: { temp_c: number; condition: { text: string }; humidity: number; uv: number };
  aqi: { index: number; label: string };
  pollen: { grass: string; tree: string; weed: string };
  [key: string]: any;
}

export async function generateRecommendation(
  city: string,
  persona: string,
  weatherData: WeatherData
): Promise<string> {
  const geminiApiKey = import.meta.env.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined);

  if (!geminiApiKey) {
    const error = new Error('GEMINI_API_KEY is not set. Please add it to your .env file.');
    console.error('[AIService]', error.message);
    throw error;
  }

  console.log(`[AIService] Generating AI recommendation for ${city} / ${persona}`);

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });

  const prompt = `
You are Mausam AI, a personalized weather assistant for Indian users.
Generate a brief, highly contextual recommendation (max 3 sentences)
for a user with the persona: "${persona}".

Current Weather Data:
- Location: ${weatherData.location.name}, ${weatherData.location.country}
- Temperature: ${weatherData.current.temp_c}°C
- Condition: ${weatherData.current.condition.text}
- Humidity: ${weatherData.current.humidity}%
- UV Index: ${weatherData.current.uv}
- AQI: ${weatherData.aqi.index} (${weatherData.aqi.label})
- Pollen: Weed: ${weatherData.pollen.weed}, Tree: ${weatherData.pollen.tree}, Grass: ${weatherData.pollen.grass}
- Persona-specific data: ${JSON.stringify(weatherData[persona] || {})}

Requirements:
1. Speak directly to the "${persona}" persona concerns (e.g., skin alerts for health, wave height for surfers, flight warnings for travelers, soil moisture for gardeners, traffic for commuters).
2. Keep it crisp, warm, and highly actionable.
3. Use simple language. No HTML or code.
4. Start with the most important insight for this persona.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: prompt
  });

  const recommendationText = response.text;
  if (!recommendationText) {
    throw new Error('Gemini returned empty response');
  }

  console.log(`[AIService] Gemini response received (${recommendationText.length} chars)`);
  return recommendationText;
}
