import React from 'react';
import { data } from '../data/data.js';
import { FaPlaneDeparture } from "react-icons/fa";

const Departures = ({ departureData }) => {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
      <h1>Recent Departures</h1>
      <ul>
        {departureData.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className='bg-purple-100 rounded-lg p-3'>
              <FaPlaneDeparture className='text-purple-800' />
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>{order.icao24}</p>
              <p className='text-gray-400 text-sm'>{order.estArrivalAirport}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>{order.lastSeen}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departures;