// src/services/weather.service.ts
// WeatherAPI.com integration service
// Architecture: FRONTEND → BACKEND → WeatherAPI → Weather Data

import { MOCK_WEATHER_DB } from '../data/mock-weather';

interface WeatherResponse {
  location: {
    name: string;
    country: string;
    timezone: string;
    localTime: string;
  };
  current: {
    temp_c: number;
    condition: { text: string; code: number; icon: string };
    humidity: number;
    uv: number;
    wind_kph: number;
    wind_dir: string;
    visibility_km: number;
    pressure_mb: number;
  };
  aqi: {
    index: number;
    label: string;
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
  };
  pollen: {
    grass: string;
    tree: string;
    weed: string;
  };
  fitness: {
    sunrise: string;
    sunset: string;
    best_running_hours: string[];
    heat_alert: boolean;
    comfort_index: number;
  };
  marine: {
    sea_condition: string;
    wave_height_m: number;
    water_temp_c: number;
    tide_timings: Array<{ time: string; type: string; height_m: number }>;
  };
  travel: {
    saved_destinations: Array<{ name: string; temp_c: number; condition: string }>;
    flight_alerts: { status: string; details: string };
    packing_suggestions: string;
  };
  family: {
    school_commute: string;
    rain_alerts: string;
    severe_warning: string | null;
  };
  agriculture: {
    soil_moisture_pct: number;
    rainfall_prediction_24h_mm: number;
    frost_alert: boolean;
    seasonal_planting_guidance: string;
  };
  commute: {
    traffic_status: string;
    visibility_alert: string;
    storm_fog_alert: string;
  };
  event_planner: {
    extended_comfort: string;
    rain_probability_pct: number;
  };
}

// Map internal city names to WeatherAPI query strings
function mapCityToQuery(city: string): string {
  const cityMap: Record<string, string> = {
    'mumbai': 'Mumbai, India',
    'new_delhi': 'New Delhi, India',
    'london': 'London, United Kingdom',
    'sydney': 'Sydney, Australia',
    'new_york': 'New York, United States'
  };
  return cityMap[city] || city;
}

function mapConditionIcon(code: number): string {
  if (code === 1000) return 'sunny';
  if ([1003, 1006, 1009].includes(code)) return 'cloudy';
  if ([1063, 1066, 1069, 1072, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return 'rainy';
  if ([1030, 1135, 1147].includes(code)) return 'foggy';
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'stormy';
  return 'cloudy';
}

export async function fetchWeatherData(city: string, locationQuery?: string): Promise<WeatherResponse> {
  const apiKey = import.meta.env.WEATHER_API_KEY || (typeof process !== 'undefined' ? process.env.WEATHER_API_KEY : undefined);

  // If no API key, use mock data (dynamic if not in MOCK_WEATHER_DB)
  if (!apiKey) {
    console.log('[WeatherService] No WEATHER_API_KEY found. Using mock data.');
    if (MOCK_WEATHER_DB[city]) {
      return MOCK_WEATHER_DB[city] as WeatherResponse;
    }
    return generateDynamicMockWeather(city, locationQuery);
  }

  // Use free-form location query if provided, otherwise fall back to city mapping
  const query = locationQuery || mapCityToQuery(city);
  console.log(`[WeatherService] Fetching real data for "${query}" from WeatherAPI.com`);

  try {
    const apiResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=3&aqi=yes`
    );

    if (!apiResponse.ok) {
      throw new Error(`WeatherAPI error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // Fetch astronomy data for sunrise/sunset
    let astroData = null;
    try {
      const astroResponse = await fetch(
        `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${encodeURIComponent(query)}&dt=${new Date().toISOString().split('T')[0]}`
      );
      if (astroResponse.ok) {
        astroData = await astroResponse.json();
      }
    } catch {
      console.log('[WeatherService] Astronomy data not available');
    }

    // Fetch marine data (only works for coastal cities)
    let marineData = null;
    try {
      const marineResponse = await fetch(
        `https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${encodeURIComponent(query)}&days=1`
      );
      if (marineResponse.ok) {
        marineData = await marineResponse.json();
      }
    } catch {
      console.log('[WeatherService] Marine data not available for this location');
    }

    // Format response to match our unified schema
    const formattedData: WeatherResponse = {
      location: {
        name: data.location.name,
        country: data.location.country,
        timezone: data.location.tz_id,
        localTime: data.location.localtime
      },
      current: {
        temp_c: data.current.temp_c,
        condition: {
          text: data.current.condition.text,
          code: data.current.condition.code,
          icon: mapConditionIcon(data.current.condition.code)
        },
        humidity: data.current.humidity,
        uv: data.current.uv,
        wind_kph: data.current.wind_kph,
        wind_dir: data.current.wind_dir,
        visibility_km: data.current.vis_km,
        pressure_mb: data.current.pressure_mb
      },
      aqi: {
        index: Math.round(data.current.air_quality?.pm2_5 || 0),
        label: getAQILabel(data.current.air_quality?.pm2_5 || 0),
        pm25: data.current.air_quality?.pm2_5 || 0,
        pm10: data.current.air_quality?.pm10 || 0,
        no2: data.current.air_quality?.no2 || 0,
        o3: data.current.air_quality?.o3 || 0
      },
      pollen: {
        grass: 'Low',
        tree: 'Low',
        weed: 'Low'
      },
      fitness: {
        sunrise: astroData?.astronomy?.astro?.sunrise || '06:00 AM',
        sunset: astroData?.astronomy?.astro?.sunset || '06:00 PM',
        best_running_hours: calculateBestRunningHours(data.forecast?.forecastday?.[0]),
        heat_alert: data.current.temp_c > 35,
        comfort_index: calculateComfortIndex(data.current.temp_c, data.current.humidity)
      },
      marine: {
        sea_condition: marineData?.current?.condition?.text || 'N/A',
        wave_height_m: marineData?.current?.wave_height || 0,
        water_temp_c: marineData?.current?.water_temp || 0,
        tide_timings: []
      },
      travel: {
        saved_destinations: [],
        flight_alerts: { status: 'Normal', details: 'No flight disruptions reported.' },
        packing_suggestions: generatePackingSuggestion(data.current.temp_c, data.current.condition.text)
      },
      family: {
        school_commute: generateCommuteAdvice(data.current.condition.text, data.current.humidity),
        rain_alerts: data.current.condition.text.includes('rain') ? 'Rain expected today.' : 'No rain expected.',
        severe_warning: null
      },
      agriculture: {
        soil_moisture_pct: estimateSoilMoisture(data.current.humidity),
        rainfall_prediction_24h_mm: data.forecast?.forecastday?.[0]?.day?.totalprecip_mm || 0,
        frost_alert: data.current.temp_c < 2,
        seasonal_planting_guidance: 'Check local planting calendar for your region.'
      },
      commute: {
        traffic_status: 'Normal traffic conditions.',
        visibility_alert: data.current.vis_km < 5 ? `Reduced visibility: ${data.current.vis_km}km` : 'Good visibility.',
        storm_fog_alert: data.current.condition.code >= 1087 ? 'Storm warning active.' : 'No alerts.'
      },
      event_planner: {
        extended_comfort: `${calculateComfortIndex(data.current.temp_c, data.current.humidity)}/100 comfort index.`,
        rain_probability_pct: data.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || 0
      }
    } as any;

    return formattedData;
  } catch (error) {
    console.error('[WeatherService] Error fetching from WeatherAPI.com, falling back to dynamic mock:', error);
    if (MOCK_WEATHER_DB[city]) {
      return MOCK_WEATHER_DB[city] as WeatherResponse;
    }
    return generateDynamicMockWeather(city, locationQuery);
  }
}

function getAQILabel(pm25: number): string {
  if (pm25 <= 12) return 'Good';
  if (pm25 <= 35.4) return 'Moderate';
  if (pm25 <= 55.4) return 'Poor';
  if (pm25 <= 150.4) return 'Very Poor';
  return 'Severe';
}

function calculateBestRunningHours(forecastDay: any): string[] {
  if (!forecastDay?.hour) return ['06:00 AM - 07:00 AM', '06:00 PM - 07:00 PM'];

  const goodHours: string[] = [];
  for (const hour of forecastDay.hour) {
    const time = hour.time?.split(' ')[1] || '';
    const temp = hour.temp_c || 0;
    const rain = hour.will_it_rain || 0;
    const wind = hour.wind_kph || 0;
    const code = hour.condition?.code || 1000;

    // Good running: 18-28°C, no rain, wind < 25kph, not stormy
    if (temp >= 18 && temp <= 28 && rain === 0 && wind < 25 && code < 1087) {
      goodHours.push(time);
    }
  }

  if (goodHours.length === 0) return ['06:00 AM - 07:00 AM', '06:00 PM - 07:00 PM'];

  // Group consecutive hours into ranges
  const ranges: string[] = [];
  let start = goodHours[0];
  let end = goodHours[0];

  for (let i = 1; i < goodHours.length; i++) {
    const prev = parseInt(goodHours[i - 1].split(':')[0]);
    const curr = parseInt(goodHours[i].split(':')[0]);
    if (curr === prev + 1) {
      end = goodHours[i];
    } else {
      ranges.push(`${formatTime(start)} - ${formatTime(end)}`);
      start = goodHours[i];
      end = goodHours[i];
    }
  }
  ranges.push(`${formatTime(start)} - ${formatTime(end)}`);

  return ranges.slice(0, 3); // Max 3 ranges
}

function formatTime(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function calculateComfortIndex(temp: number, humidity: number): number {
  const index = 100 - ((temp - 20) * 2 + (humidity - 50) * 0.5);
  return Math.max(0, Math.min(100, Math.round(index)));
}

function generatePackingSuggestion(temp: number, condition: string): string {
  const suggestions: string[] = [];
  if (temp > 30) suggestions.push('Light breathable clothing');
  if (temp < 15) suggestions.push('Warm jacket layers');
  if (condition.toLowerCase().includes('rain')) suggestions.push('Carry an umbrella or raincoat');
  if (temp > 25) suggestions.push('Sunscreen and sunglasses');
  return suggestions.join('. ') || 'Standard casual wear recommended.';
}

function generateCommuteAdvice(condition: string, humidity: number): string {
  if (condition.toLowerCase().includes('rain')) return 'Wet roads. Allow extra commute time.';
  if (humidity > 80) return 'Humid conditions. Stay hydrated during commute.';
  return 'Normal commute conditions.';
}

function estimateSoilMoisture(humidity: number): number {
  return Math.min(100, Math.max(20, humidity * 0.9));
}

function generateDynamicMockWeather(city: string, locationQuery?: string): WeatherResponse {
  let name = city.charAt(0).toUpperCase() + city.slice(1);
  let country = 'India';
  let region = '';

  if (locationQuery) {
    const parts = locationQuery.split(',');
    if (parts.length > 0) name = parts[0].trim();
    if (parts.length > 1) region = parts[parts.length - 2].trim();
    if (parts.length > 1) country = parts[parts.length - 1].trim();
  }

  // Generate realistic values based on name hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const temp_c = 15 + (absHash % 22);
  const humidity = 40 + (absHash % 50);
  const uv = 1 + (absHash % 10);
  const wind_kph = 5 + (absHash % 30);
  const visibility_km = 3 + (absHash % 8);
  const pm25 = 10 + (absHash % 150);

  const conditions = ['Sunny', 'Hazy Sunshine', 'Partly Cloudy', 'Passing Showers', 'Light Drizzle', 'Clear and Crisp', 'Overcast'];
  const conditionText = conditions[absHash % conditions.length];
  const isRainy = conditionText.toLowerCase().includes('shower') || conditionText.toLowerCase().includes('drizzle') || conditionText.toLowerCase().includes('rain');

  const formattedData: WeatherResponse = {
    location: {
      name,
      country,
      timezone: 'Asia/Kolkata',
      localTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
    },
    current: {
      temp_c,
      condition: {
        text: conditionText,
        code: isRainy ? 1063 : 1000,
        icon: isRainy ? 'rainy' : 'sunny'
      },
      humidity,
      uv,
      wind_kph,
      wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][absHash % 8],
      visibility_km,
      pressure_mb: 1000 + (absHash % 25)
    },
    aqi: {
      index: pm25,
      label: getAQILabel(pm25),
      pm25,
      pm10: pm25 * 1.5,
      no2: 5 + (absHash % 15),
      o3: 10 + (absHash % 30)
    },
    pollen: {
      grass: ['Low', 'Moderate', 'High'][absHash % 3],
      tree: ['Low', 'Moderate', 'High'][(absHash + 1) % 3],
      weed: ['Low', 'Moderate', 'High'][(absHash + 2) % 3]
    },
    fitness: {
      sunrise: '05:50 AM',
      sunset: '06:40 PM',
      best_running_hours: ['06:00 AM - 07:30 AM', '06:00 PM - 07:30 PM'],
      heat_alert: temp_c > 35,
      comfort_index: calculateComfortIndex(temp_c, humidity)
    },
    marine: {
      sea_condition: country.toLowerCase() === 'nepal' || region.toLowerCase().includes('delhi') ? 'N/A (Inland)' : 'Moderate Chop',
      wave_height_m: country.toLowerCase() === 'nepal' || region.toLowerCase().includes('delhi') ? 0 : 1.2,
      water_temp_c: country.toLowerCase() === 'nepal' || region.toLowerCase().includes('delhi') ? 0 : 25.0,
      tide_timings: []
    },
    travel: {
      saved_destinations: [
        { name: 'London', temp_c: 16.0, condition: 'Drizzle' },
        { name: 'New York', temp_c: 24.0, condition: 'Sunny' }
      ],
      flight_alerts: {
        status: isRainy ? 'Minor Delays' : 'Normal',
        details: isRainy ? 'Wet runways may cause minor schedules adjustments.' : 'All local flights operating normally.'
      },
      packing_suggestions: isRainy ? `Carry an umbrella or raincoat in ${name}.` : `Wear light layers and sun protection in ${name}.`
    },
    family: {
      school_commute: isRainy ? 'Wet tarmac. Drive carefully near school zones.' : 'Dry roads. Standard school commute times.',
      rain_alerts: isRainy ? 'Light showers expected. Pack rain gear.' : 'Clear skies, no rain warnings.',
      severe_warning: null
    },
    agriculture: {
      soil_moisture_pct: estimateSoilMoisture(humidity),
      rainfall_prediction_24h_mm: isRainy ? 12.5 : 0,
      frost_alert: temp_c < 3,
      seasonal_planting_guidance: `Ideal temperature ranges in ${name} for seasonal ground cultivation.`
    },
    commute: {
      traffic_status: isRainy ? 'Slow transit due to wet roads.' : 'Normal traffic flow.',
      visibility_alert: visibility_km < 5 ? `Reduced visibility: ${visibility_km}km` : 'Perfect road visibility.',
      storm_fog_alert: 'No storm or fog warnings.'
    },
    event_planner: {
      extended_comfort: `${calculateComfortIndex(temp_c, humidity)}/100 comfort rating for outdoor events.`,
      rain_probability_pct: isRainy ? 70 : 10
    }
  };

  return formattedData;
}
