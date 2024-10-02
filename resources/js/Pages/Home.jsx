import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const { weather, error } = usePage().props;
    const [isNightTime, setIsNightTime] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        if (weather && weather.current) {
            setIsNightTime(weather.current.is_day === 0);
        }

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [weather]);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(currentTime);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    // Styles
    const cardStyle = `p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center`;
    const labelStyle = `text-sm font-semibold text-gray-600 dark:text-gray-400 text-center`;
    const valueStyle = `text-2xl font-bold text-gray-900 dark:text-gray-100`;
    const iconStyle = `w-10 h-10`;

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
            //         Weather Dashboard
            //     </h2>
            // }
        >
            <Head title="Weather Dashboard" />
            <div className={`py-8 px-4 ${isNightTime ? 'dark' : ''}`}>
                <div className="max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">

                    {/* Date & Time */}
                    <div className={`${cardStyle} row-span-2 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-800`}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{formattedDate}</h3>
                        <p className="text-5xl mt-4 mb-2 text-gray-900 dark:text-gray-100">{formattedTime}</p>
                    </div>

                    {/* Current Weather */}
                    <div className={`${cardStyle} col-span-1 bg-blue-100 dark:bg-blue-800`}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Current Weather</h3>
                        <img src={weather.current.condition.icon} alt="Weather Icon" className={iconStyle} />
                        <p className="text-5xl font-bold text-gray-900 dark:text-gray-100 mt-2">{weather.current.temp_c}°C</p>
                        <p className="text-md capitalize mt-1 text-gray-700 dark:text-gray-300">{weather.current.condition.text}</p>
                    </div>

                    {/* Wind Speed & Gust */}
                    <div className={`${cardStyle}`}>
                        <h3 className={labelStyle}>Wind Speed</h3>
                        <p className={valueStyle}>{weather.current.wind_kph} km/h</p>
                        <h3 className={labelStyle}>Gust</h3>
                        <p className={valueStyle}>{weather.current.gust_kph} km/h</p>
                    </div>

                    {/* Wind Direction & Air Quality */}
                    <div className={`${cardStyle}`}>
                        <h3 className={labelStyle}>Wind Direction</h3>
                        <p className={valueStyle}>{weather.current.wind_dir}</p>
                        <h3 className={labelStyle}>Air Quality</h3>
                        <p className={valueStyle}>Good</p>
                    </div>

                    {/* Sunrise & Sunset */}
                    <div className={`${cardStyle}`}>
                        <h3 className={labelStyle}>Sunrise</h3>
                        <p className={valueStyle}>{weather.forecast.forecastday[0].astro.sunrise}</p>
                        <h3 className={labelStyle}>Sunset</h3>
                        <p className={valueStyle}>{weather.forecast.forecastday[0].astro.sunset}</p>
                    </div>

                    {/* 7-Day Forecast */}
                    <div className={`${cardStyle} col-span-2 lg:col-span-3`}>
                        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">7-Day Forecast</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                            {weather.forecast.forecastday.map((day, index) => (
                                <div key={index} className="flex flex-col items-center justify-center bg-blue-100 dark:bg-blue-700 rounded-lg p-2">
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{new Date(day.date).toLocaleDateString([], { weekday: 'long' })}</p>
                                    <img src={day.day.condition.icon} alt="Weather Icon" className={iconStyle} />
                                    <p className="mt-1 text-lg text-gray-800 dark:text-gray-200">{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>
                                    <p className="text-md text-gray-800 dark:text-gray-200">{day.day.condition.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}