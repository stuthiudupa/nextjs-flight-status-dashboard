import { NextResponse } from 'next/server';

export async function GET() {
    const username = process.env.OPEN_SKY_USERNAME;
    const password = process.env.OPEN_SKY_PASSWORD;

    // get only data from 2 hours ago
    const endTime = Math.floor(Date.now() / 1000);
    const beginTime = endTime - (2 * 60 * 60);

    const apiUrl = `https://opensky-network.org/api/flights/all?begin=${beginTime}&end=${endTime}`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        }
    });

    if (response.ok) {
        const flights = await response.json();

        const totalFlights = flights.length;

        const arrivalsPerDay = flights.reduce((acc, flight) => {
            return acc + 1; 
        }, 0);

        const airportFrequency = flights.reduce((acc, flight) => {
            const arrivalAirport = flight.estArrivalAirport;
            if (arrivalAirport) {
                acc[arrivalAirport] = (acc[arrivalAirport] || 0) + 1;
            }
            return acc;
        }, {});
        const busiestAirport = Object.entries(airportFrequency).sort((a, b) => b[1] - a[1])[0] || [];

        const latestFlights = flights
        .filter(flight => flight.estArrivalAirport !== null) 
        .sort((a, b) => b.lastSeen - a.lastSeen)
        .slice(0, 20).map(flight => {
            const now = Date.now(); 
            const lastSeenTime = flight.lastSeen * 1000; 
            const elapsedTime = now - lastSeenTime; 
        
            const hours = Math.floor(elapsedTime / (1000 * 60 * 60)); 
            const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); 
        
            return {
                icao24: flight.icao24,
                estArrivalAirport: flight.estArrivalAirport,
                lastSeen: `${hours} hours ${minutes} minutes ago`
            };
        });

        const airportCount = {};

        flights.forEach(flight => {
            const arrivalAirport = flight.estArrivalAirport; 
            if (arrivalAirport) {
                airportCount[arrivalAirport] = (airportCount[arrivalAirport] || 0) + 1;
            }
        });

        const sortedAirportCount = Object.entries(airportCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); 

        const topAirports = sortedAirportCount.map(([airport, count]) => ({
            airport: airport,
            count: count
        }));

        return NextResponse.json({
            totalFlights,
            arrivalsPerDay,
            busiestAirport: busiestAirport[0],
            airportCount: topAirports,
            latestFlights
        });
    } else {
        return NextResponse.json({ message: "Failed to fetch data" }, { status: response.status });
    }
}
