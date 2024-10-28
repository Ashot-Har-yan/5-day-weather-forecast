import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Button } from 'antd';
import './index.css'

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
                
                const data = await response.json();
             console.log(data)

                if (response.ok) {
                    const filteredData = data.list.filter(item => item.dt_txt);
                    setHourlyData(filteredData);
                } else {
                    console.error("API Error:", data.message); 
                }
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };

        fetchHourlyWeather();
    }, [apiKey, city, day]);

    return (
        <div className='hourly_container'> 
        <h2 style={{justifySelf:'center'}}>Hourly Forecast for {city} </h2>
            {hourlyData.length > 0 ? (
                hourlyData.map((hour, index) => (
                    <div key={index} className='daily_container'>
                        <p>{hour.dt_txt}: {hour.main.temp} °C</p>
                        <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather icon" />
                    </div>
                ))
            ) : (
                <p>No hourly data available</p>
            )}
            <Button type='primary' htmlType='submit'>
            <Link to = '/'>
                    Go to see daily weather
                </Link>
            </Button>
                
        </div>
    );
};

export default HourlyForecast;
