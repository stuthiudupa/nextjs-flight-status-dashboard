"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  

const BarChart = ({ airportCount }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        const labels = airportCount.map(entry => entry.airport); 
        const data = airportCount.map(entry => entry.count);
        setChartData({
            labels,
            datasets: [
                {
                    label: 'Arrivals by airport',
                    data,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(105, 34, 177,0.4)',  
                }, 
            ]
        });
        
        setChartOptions({
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Arrivals by airport',
                },
            },
            maintainAspectRatio: false,
            responsive: true,
        });
    }, []);

    return (
        <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default BarChart;
