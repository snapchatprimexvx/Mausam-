import type { APIRoute } from 'astro';
import { fetchWeatherData } from '../../services/weather.service';

export const GET: APIRoute = async ({ url }) => {
  const queryCity = url.searchParams.get('city')?.toLowerCase() || 'mumbai';
  const locationQuery = url.searchParams.get('q') || undefined;

  try {
    const weatherData = await fetchWeatherData(queryCity, locationQuery);

    return new Response(JSON.stringify(weatherData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('[API/weather] Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
