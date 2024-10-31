// pages/index.js

import Head from 'next/head';
import Image from 'next/image';

import Header from '../app/components/Header'
import Cards from '../app/components/Cards'
import BarChart from './components/BarChart'
import PieChart from './components/Departures'

export default function Home() {
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
        <Cards/>
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
            <BarChart/>
            <PieChart/>
        </div>
      </main>
      </>
  );
}
