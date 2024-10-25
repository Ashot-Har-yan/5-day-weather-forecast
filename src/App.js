import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from "react-router-dom"; 
import WeatherForecast from './wether';
import HourlyForecast from './hourly/HourlyForecast';

const App = () => {
    return (
        <RouterProvider
        router={
          createBrowserRouter(
            createRoutesFromElements(
                <Route path="/" element={<WeatherForecast />} >
                <Route path="/hourly/:day" element =  {<HourlyForecast />}></Route>
         </Route>
            )
          )
            }
        />
    );
};

export default App;