import React, { useState } from 'react';
import { FaPlaneDeparture } from "react-icons/fa";

const Departures = ({ departureData }) => {
  const [expandedId, setExpandedId] = useState(null); 
  const [flightDetails, setFlightDetails] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const toggleExpanded = async (id, icao24) => {
    if (expandedId === id) {

      setExpandedId(null);
      setFlightDetails(null);
      setError(null);
    } else {

      setExpandedId(id);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/getflight?icao24=${icao24}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }
        const data = await response.json();
        setFlightDetails(data.flightInfo); 
      } catch (err) {
        setError(err.message);
        setFlightDetails(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Departures</h1>
      <ul>
        {departureData.map((order, id) => (
          <li
            key={id}
            className={`bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex flex-col cursor-pointer ${
              expandedId === id ? "bg-gray-200" : ""
            }`}
          >
            <div
              className="flex items-center"
              onClick={() => toggleExpanded(id, order.icao24)}
            >
              <div className="bg-purple-100 rounded-lg p-3">
                <FaPlaneDeparture className="text-purple-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">{order.icao24}</p>
                <p className="text-gray-400 text-sm">{order.estDepartureAirport}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {order.lastSeen}
              </p>
            </div>

            {/* Expanded Section */}
            {expandedId === id && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                {loading && <p>Loading flight details...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {flightDetails && (
                  <div>
                    {Object.entries(flightDetails).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <p className='text-purple-800 uppercase font-semibold text-sm py-1'>{key}</p> {value?.toString() || "N/A"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departures;
