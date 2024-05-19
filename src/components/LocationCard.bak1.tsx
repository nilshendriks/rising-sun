// "use client";

import { FC } from "react";
import TemperatureDisplay from "./TemperatureDisplay";
import styles from "./LocationCard.module.css";
import TimeDisplay from "./TimeDisplay";

interface LocationCardProps {
  location: string;
  unit: string;
}

const LocationCard: FC<LocationCardProps> = ({ location, unit }) => {
  return (
    <div className={styles.LocationCard}>
      <p className={styles.LocationCard__location}>{location}</p>
      {/* <TimeDisplay location={location} /> */}
      <TemperatureDisplay
        location={location}
        unit={unit}
      />
    </div>
  );
};

export default LocationCard;
