"use client";

import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from "react";

import Header from '../app/components/Header'
import Cards from '../app/components/Cards'
import BarChart from './components/BarChart'
import Departures from './components/Departures'

export default function Home() {
  const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/opensky');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;
  return (
    <>
      <Head>
        <title>Flight Status Dashboard</title>
        <meta name="description" content="Created with NextJS and TailwindCSS" />
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-gray-200 min-h-screen'>
        <Header/>
        <Cards 
          totalFlights = {data.totalFlights}
          arrivals = {data.arrivalsPerDay}
          busiestAirport = {data.busiestAirport}
        />
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
            <BarChart airportCount = {data.airportCount}/>
            <Departures departureData = {data.latestFlights}/>
        </div>
      </main>
      </>
  );
}
