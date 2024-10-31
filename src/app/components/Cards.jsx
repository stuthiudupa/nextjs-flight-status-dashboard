import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Cards = () => {
    return (
        <div className="grid lg:grid-cols-6 gap-4 p-4">
            <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
                <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">2748</p>
                    <p className="text-gray-600">Total Flights</p>
                </div>
                    <p className="bg-purple-200 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-purple-700 text-2xl"><FaMapMarkerAlt /></span>
                    </p>
            </div>
            <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">78</p>
                    <p className="text-gray-600">Arrivals per Day</p>
                </div>
                    <p className="bg-purple-200 flex justify-center items-center p-2 rounded-lg">
                        <span className="text-purple-700 text-2xl"><FaMapMarkerAlt /></span>
                    </p>
            </div>
            <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
            <div className="flex flex-col w-full pb-4">
                    <p className="text-2xl font-bold">EDDF</p>
                    <p className="text-gray-600">Busiest Airport</p>
                </div>
                    <p className="bg-purple-200 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-purple-700 text-2xl"><FaMapMarkerAlt /></span>
                    </p>
            </div>
        </div>
    );
}

export default Cards