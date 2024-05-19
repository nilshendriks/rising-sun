"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./TemperatureDisplay.module.css";

interface TemperatureDisplayProps {
  location: string;
  unit: string;
  updateInterval?: number;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
  location,
  unit,
  updateInterval = 8
}) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = useMemo(
    () => async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=515c041e453c40c5a4c124051241404&q=${location}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        // console.log(data);
        // console.log(data.location.tz_id);
        return data.current.temp_c;
      } catch (error: any) {
        setError(error.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [location]
  );

  useEffect(() => {
    const updateTemperature = async () => {
      const temp = await fetchWeather();
      if (temp !== null) {
        setTemperature(temp);
      }
    };

    updateTemperature();
    const interval = setInterval(
      updateTemperature,
      updateInterval * 60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [location, updateInterval, fetchWeather]);

  return (
    <div className={styles.TemperatureDisplay}>
      {loading ? (
        <p>
          Loading... <span className="spinner"></span>
        </p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className={styles.TemperatureDisplay__temperature}>
          {/* {temperature} <span className="degree">°{unit}</span> */}
          {temperature} <span className={styles.degree}>°</span>
        </p>
      )}
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 5px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default TemperatureDisplay;
