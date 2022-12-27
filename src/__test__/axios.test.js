import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import axios from 'axios';

jest.mock("axios");

// Expected to the dummy data like this in actual data flow..
const dummyWeatherData = {
    "coord": {
        "lon": 18.07,
        "lat": 59.33
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 274.56,
        "feels_like": 269.92,
        "temp_min": 273.23,
        "temp_max": 275.09,
        "pressure": 995,
        "humidity": 92
      },
      "visibility": 10000,
      "wind": {
        "speed": 5.14,
        "deg": 250
      },
      "rain": {
        "1h": 0.51
      },
      "clouds": {
        "all": 100
      },
      "dt": 1672115689,
      "sys": {
        "type": 1,
        "id": 1788,
        "country": "SE",
        "sunrise": 1672127107,
        "sunset": 1672149121
      },
      "timezone": 3600,
      "id": 2673730,
      "name": "Stockholm",
      "cod": 200
};

describe("WeatherData", () => {
    it("should get all weather data", async () => {
        axios.get.mockResolvedValue({ data: dummyWeatherData });
        render(<App/>);

        const weatherData = await waitFor(() => screen.getAllByTestId("weatherData"));
        // expect(weatherData).toHaveLength(1);
        axios.get.mockImplementationOnce(() => Promise.resolve(weatherData));
    });

    it("should not get weather data", async () => {
        const errorMessage = "Network Error";
        axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    });
});

test('fetch data and getData from axios request', () => {
  const testFetch = jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  waitFor(() => expect(testFetch).toHaveBeelCalledTimes(1));
});