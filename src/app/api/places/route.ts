import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apiKey = "AIzaSyD5DDgkqYerJpBqwE2PVU-WVRQAs8ujfbw";
  const placeId = searchParams.get('place_id');

  if (placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Geocoding API error:", error);
      return NextResponse.json({ error: "Failed to fetch geocode" }, { status: 500 });
    }
  }

  const input = searchParams.get('input');
  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
