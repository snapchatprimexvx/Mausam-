// src/services/ai.service.ts
// Gemini AI recommendation service
// Architecture: FRONTEND → BACKEND → Gemini API → Recommendations

import { GoogleGenAI } from '@google/genai';
<<<<<<< HEAD
=======
import { MOCK_RECS_DB } from '../data/mock-recommendations';
>>>>>>> 48afc383babc7d73b05edbb707fa98f758fde575

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

<<<<<<< HEAD
  if (!geminiApiKey) {
    const error = new Error('GEMINI_API_KEY is not set. Please add it to your .env file.');
    console.error('[AIService]', error.message);
    throw error;
  }

=======
  // If no API key, use mock data
  if (!geminiApiKey) {
    console.log('[AIService] No GEMINI_API_KEY found. Using mock data.');
    if (MOCK_RECS_DB[city]?.[persona]) {
      return MOCK_RECS_DB[city][persona];
    }
    return generateDynamicMockRecommendation(persona, weatherData);
  }

  // Real Gemini API call
>>>>>>> 48afc383babc7d73b05edbb707fa98f758fde575
  console.log(`[AIService] Generating AI recommendation for ${city} / ${persona}`);

  const ai = new GoogleGenAI({ apiKey: geminiApiKey });

  const prompt = `
You are Mausam AI, a personalized weather assistant for Indian users.
<<<<<<< HEAD
Generate a brief, highly contextual recommendation (max 3 sentences)
=======
Generate a brief, highly contextual recommendation (max 3 sentences) 
>>>>>>> 48afc383babc7d73b05edbb707fa98f758fde575
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

<<<<<<< HEAD
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
=======
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const recommendationText = response.text || 'No recommendation available at this time.';
    return recommendationText;
  } catch (error) {
    console.error('[AIService] Gemini API error, falling back to dynamic mock:', error);
    // Fallback to dynamic mock on error
    if (MOCK_RECS_DB[city]?.[persona]) {
      return MOCK_RECS_DB[city][persona];
    }
    return generateDynamicMockRecommendation(persona, weatherData);
  }
}

function generateDynamicMockRecommendation(persona: string, weatherData: WeatherData): string {
  const name = weatherData.location.name;
  const temp = weatherData.current.temp_c;
  const condition = weatherData.current.condition.text.toLowerCase();
  const isRainy = condition.includes('rain') || condition.includes('shower') || condition.includes('drizzle');
  const aqi = weatherData.aqi.index;
  const aqiLabel = weatherData.aqi.label;

  let advice = '';

  switch (persona) {
    case 'health':
      if (aqi > 150) {
        advice = `Air quality in ${name} is hazardous (${aqi} - ${aqiLabel}). Sensitive individuals and asthmatics must wear masks and limit outdoor activities.`;
      } else if (isRainy) {
        advice = `High humidity and dampness in ${name} may trigger joint pain. Pollen counts are currently low due to rain washing allergens away.`;
      } else {
        advice = `Excellent weather in ${name} (AQI ${aqi} - ${aqiLabel}) with low pollen levels. Great day for a fresh walk outside.`;
      }
      break;

    case 'fitness':
      if (temp > 35) {
        advice = `Avoid outdoor runs during midday in ${name} due to high heat alerts. Best running hours are early morning or late evening. Stay hydrated!`;
      } else if (isRainy) {
        advice = `Slippery running paths expected due to rain in ${name}. Consider indoor exercises or wear anti-slip running shoes.`;
      } else {
        advice = `Ideal running conditions in ${name} (temp: ${temp}°C). The wind is low, and UV index is safe for an outdoor sprint.`;
      }
      break;

    case 'marine':
      if (weatherData.marine && weatherData.marine.sea_condition === 'N/A (Inland)') {
        advice = `${name} is an inland region; sea surfing or marine alerts are not applicable here. Local water bodies are calm.`;
      } else if (isRainy) {
        advice = `Rough sea conditions in coastal area. Wave heights are elevated. Swimming or surfing is not recommended today.`;
      } else {
        advice = `Clean swell with gentle offshore winds. Sea surface temp is pleasant. Excellent conditions for beach walks and recreational activities.`;
      }
      break;

    case 'travel':
      if (isRainy) {
        advice = `Expect flight and airport transit delays in ${name} due to active rainfall. Ensure you pack a high-quality raincoat or umbrella.`;
      } else {
        advice = `No weather-related travel disruptions in ${name}. Light clothing, sunglasses, and sunblock are recommended for local sightseeing.`;
      }
      break;

    case 'family':
      if (isRainy) {
        advice = `Rain is expected during school commute times in ${name}. Make sure kids are dressed in waterproof jackets and allow extra travel time.`;
      } else {
        advice = `Perfect weather for outdoor family play and picnics in ${name}. Commutes are safe and on-schedule.`;
      }
      break;

    case 'agriculture':
      const soilMoisture = weatherData.agriculture?.soil_moisture_pct || 50;
      if (isRainy) {
        advice = `Precipitation is replenishing soil moisture (${soilMoisture}%) in ${name}. Suspend manual watering to protect crop roots from rot.`;
      } else if (soilMoisture < 40) {
        advice = `Soil moisture is low (${soilMoisture}%) in ${name}. We recommend irrigating crops early in the morning to minimize evaporation.`;
      } else {
        advice = `Soil moisture is stable at ${soilMoisture}%. Sowing and standard agricultural maintenance can proceed normally.`;
      }
      break;

    case 'commute':
      if (isRainy) {
        advice = `Wet asphalt will increase stopping distance in ${name}. Expect minor congestion and slow transit on major highways.`;
      } else {
        advice = `Commuting in ${name} is smooth with excellent visibility and clear roads. No weather disruptions reported.`;
      }
      break;

    case 'event_planner':
      const rainProb = weatherData.event_planner?.rain_probability_pct || 10;
      if (rainProb > 50) {
        advice = `A ${rainProb}% chance of rain in ${name} makes outdoor setups risky. Ensure you have waterproof marquees or an alternate indoor venue.`;
      } else {
        advice = `High outdoor suitability rating in ${name} with only ${rainProb}% rain probability. Ideal conditions for garden gatherings or outdoor weddings.`;
      }
      break;

    default:
      advice = `Weather conditions are moderate in ${name}. Normal daily planning advised.`;
  }

  return advice;
>>>>>>> 48afc383babc7d73b05edbb707fa98f758fde575
}
