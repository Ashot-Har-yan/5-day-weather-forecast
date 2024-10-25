
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HourlyForecast = () => {
    const { day } = useParams();
    const [hourlyData, setHourlyData] = useState([]);
    const apiKey = 'e5b3f49657b2ccff409c34647081d13b';
    const city = 'Yerevan';

    useEffect(() => {
        const fetchHourlyWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
                );
                const data = await response.json()
                const filteredData = data.list.filter(item => item.dt_txt.startsWith(day));
                setHourlyData(filteredData);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

        fetchHourlyWeather();
    }, [apiKey, city, day]);

    return (
        <div>
            <h2>Hourly Forecast for {day}</h2>
            {hourlyData.length > 0 ? (
                hourlyData.map((hour, index) => (
                    <div key={index}>
                        <p>{hour.dt_txt}: {hour.main.temp} °C</p>
                        <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather icon" />
                    </div>
                ))
            ) : (
                <p>Hourly data don't available</p>
            )}
        </div>
    );
};

export default HourlyForecast;
