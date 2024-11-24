import { NextResponse } from 'next/server';

export async function GET(request) {
    const url = new URL(request.url);
    const icao24 = url.searchParams.get('icao24');

    if (!icao24) {
        return NextResponse.json({ message: 'icao24 is required' }, { status: 400 });
    }

    const username = process.env.OPEN_SKY_USERNAME;
    const password = process.env.OPEN_SKY_PASSWORD;

    const now = Math.floor(Date.now() / 1000); 

    const apiUrl = `https://opensky-network.org/api/states/all?time=${now}&icao24=${icao24}`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        }
    });

    if (response.ok) {
        const flights = await response.json();
        const flightInfo = {
            callsign: flights.states[0][1] || null,
            country: flights.states[0][2] || null,
            latitude: flights.states[0][5] || null,
            longitude: flights.states[0][6] || null,
            altitude: flights.states[0][7] || null,
            velocity: flights.states[0][9] || null
        };

        // remove keys with null values
        const filteredFlightInfo = Object.fromEntries(
            Object.entries(flightInfo).filter(([key, value]) => value !== null)
        );

        return NextResponse.json({ flightInfo: filteredFlightInfo });
    } else {
        return NextResponse.json({ message: 'Failed to fetch data' }, { status: response.status });
    }
}
