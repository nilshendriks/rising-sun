"use client";

import { FC, useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay";
import styles from "./LocationCard.module.css";
import TimeDisplay from "./TimeDisplay";

interface LocationCardProps {
  location: string;
  unit: string;
}

const LocationCard: FC<LocationCardProps> = ({ location, unit }) => {
  const [timezone, setTimezone] = useState<string>("");
  const cityName = location.split(",")[0]; // Extract the city name from the location string

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=515c041e453c40c5a4c124051241404&q=${location}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch timezone data");
        }
        const data = await response.json();
        setTimezone(data.location.tz_id);
      } catch (error) {
        console.error("Error fetching timezone data:", error);
      }
    };

    fetchTimezone();
  }, [location]);

  return (
    <div className={styles.LocationCard}>
      <p className={styles.LocationCard__location}>{cityName}</p>
      <TimeDisplay
        timezone={timezone}
      />
      <TemperatureDisplay
        location={location}
        unit={unit}
      />
    </div>
  );
};

export default LocationCard;
