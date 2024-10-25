import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

const WeatherForecast = () => {
    const [forecast, setForecast] = useState([]);
    const apiKey = 'e5b3f49657b2ccff409c34647081d13b';
    const city = 'Yerevan';

    useEffect(() => {
        const weather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
                );
                const data = await response.json()
               
                setForecast(data.list);
            } catch (error) {
                console.error("Error fetching the weather data:", error);
            }
        };

        weather();
    }, [apiKey, city]);

    const days = [...new Set(forecast.map(item => item.dt_txt.split(' ')[0]))];

    return (
        <div>
            <h1>5-Day Weather Forecast for {city}</h1>
            <div style={{display:'flex', gap:'10px'}}>
                {days.map((day, index) => {
                    const dailyData = forecast.filter(item => item.dt_txt.startsWith(day));
                    const high = Math.max(...dailyData.map(item => item.main.temp_max));
                    const low = Math.min(...dailyData.map(item => item.main.temp_min));
                    const icon = dailyData[0]?.weather[0]?.icon;

                    return (
                        <div key={index} style={{ marginBottom: '20px',backgroundColor:'#7FFFD4'}}>
                            <h2>{day}</h2>
                            <p>High: {high} °C</p>
                            <p>Low: {low} °C</p>
                            {icon && <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather icon" />}
                            <Link to={`/hourly/${day}`}>View Hourly Forecast</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeatherForecast;
