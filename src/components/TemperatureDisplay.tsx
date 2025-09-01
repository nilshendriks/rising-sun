
"use client";

import styles from "./TemperatureDisplay.module.css";

interface TemperatureDisplayProps {
  temp_c: number;
  temp_f?: number;
  unit: string;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({
  temp_c,
  temp_f,
  unit
}) => {
  const temperature = unit === "C" ? temp_c : temp_f ?? temp_c;

  return (
    <div className={styles.TemperatureDisplay}>
      <p className={styles.TemperatureDisplay__temperature}>
        {temperature} <span className={styles.degree}>°</span>
      </p>
    </div>
  );
};

export default TemperatureDisplay;
