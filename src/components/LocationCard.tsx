"use client";

import { FC, useEffect, useState } from "react";
import TemperatureDisplay from "./TemperatureDisplay";
import moment from "moment-timezone";
// import TimeDisplay from "./TimeDisplay";
// import SunInfo from './SunInfo';
import styles from "./LocationCard.module.css";
import DateTimeDisplay from "./DateTimeDisplay";
import { Sunrise, Sunset } from 'react-feather';

interface LocationCardProps {
  location: string;
  unit: string;
}

const LocationCard: FC<LocationCardProps> = ({ location, unit }) => {
  const [timezone, setTimezone] = useState<string>("");
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [currentDeviceTime, setCurrentDeviceTime] = useState<string>(moment().format());

  // Extract the city name from the location string
  const cityName = location.split(",")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch timezone
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=515c041e453c40c5a4c124051241404&q=${location}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch timezone data");
        }
        const data = await response.json();
        setTimezone(data.location.tz_id);
        // console.log(data.location.tz_id);

        // Fetch sunrise and sunset
        const sunResponse = await fetch(
          `https://api.sunrise-sunset.org/json?lat=${data.location.lat}&lng=${data.location.lon}&date=today&formatted=0&tzid=${data.location.tz_id}`
        );
        if (!sunResponse.ok) {
          throw new Error("Failed to fetch sunrise-sunset data");
        }
        const sunData = await sunResponse.json();
        // console.log(sunData);
        setSunrise(sunData.results.sunrise);
        setSunset(sunData.results.sunset);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Update device time every second
    const interval = setInterval(() => {
      setCurrentDeviceTime(moment().format()); // Update current device time
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount

  }, [location]);

  // Convert device time to local time of the location
  const localDeviceTime = moment.tz(currentDeviceTime, timezone).format();

  return (
    <div className={styles.LocationCard}>
      <p className={styles.LocationCard__location}>{cityName}</p>
      <div className={styles.LocationCard__time}>
        {timezone && <DateTimeDisplay dateTime={moment.tz(currentDeviceTime, timezone).format()} showDate={true} />}
      </div>
      <TemperatureDisplay location={location} unit={unit} />
      <div className={styles.LocationCard__suninfo}>
        <div className={styles.LocationCard__sunrise}>
          <Sunrise /> <DateTimeDisplay dateTime={sunrise} />
        </div>
        <div className={styles.LocationCard__sunset}>
          <Sunset /> <DateTimeDisplay dateTime={sunset} />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
