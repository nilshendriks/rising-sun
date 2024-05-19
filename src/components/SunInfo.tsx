import styles from "./SunInfo.module.css";

interface SunInfoProps {
  sunrise: string | null;
  sunset: string | null;
  use24HourFormat?: boolean;
}

const SunInfo: React.FC<SunInfoProps> = ({
  sunrise,
  sunset,
  use24HourFormat = true
}) => {
  const formatTime = (time: string | null): string => {
    if (!time) return "Unknown"; // Handle null case
    const timeParts = time.split("T")[1].split(":");
    // const hours = timeParts[0].padStart(2, '0');
    // const minutes = timeParts[1].padStart(2, '0');
    let hours = parseInt(timeParts[0], 10); // Parse the hours as a number
    const minutes = timeParts[1].padStart(2, "0");
    // const seconds = timeParts[2].split('+')[0].padStart(2, '0'); // Remove timezone offset if present
    // return `${hours}:${minutes}:${seconds}`;
    let formattedHours = "";

    if (use24HourFormat) {
      formattedHours = hours.toString().padStart(2, "0"); // Add leading zeros for 24-hour format
      formattedHours = formattedHours + `:${minutes}`;
    } else {
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
      formattedHours = hours.toString(); // No leading zeros for 12-hour format
      formattedHours = formattedHours + `:${minutes} ${amPm}`; // Add AM/PM indicator
    }

    return `${formattedHours}`;
  };

  return (
    <div className={styles.SunInfo}>
      <p>Sunrise: {sunrise ? formatTime(sunrise) : "Unknown"}</p>
      <p>Sunset: {sunset ? formatTime(sunset) : "Unknown"}</p>
    </div>
  );
};

export default SunInfo;
