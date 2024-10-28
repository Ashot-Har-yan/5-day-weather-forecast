import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from "react-router-dom"; 
import WeatherForecast from './main/daily';
import HourlyForecast from './main/hourly';
import { ROUTES } from './util/constant';




const App = () => {
  const router = createBrowserRouter(
      createRoutesFromElements(
          <>
              <Route path='/' element={<WeatherForecast />} />
              <Route path={ROUTES.HOUR} element={<HourlyForecast />} />
          </>
      )
  );

  return <RouterProvider router={router} />;
};

export default App;
