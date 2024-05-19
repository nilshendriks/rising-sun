import styles from "./DateTimeDisplay.module.css";

interface DateTimeDisplayProps {
  dateTime: string | null;
  showDate?: boolean;
  use24HourFormat?: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  dateTime,
  showDate = false,
  use24HourFormat = true
}) => {
  const formatDateTime = (dateTime: string | null): string => {
    if (!dateTime) return "Unknown"; // Handle null case
    const dateTimeParts = dateTime.split("T");
    const date = showDate ? new Date(dateTimeParts[0]) : null;
    const time = dateTimeParts[1];

    // Format time
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1].padStart(2, "0");
    let formattedTime = use24HourFormat
      ? `${hours.toString().padStart(2, "0")}:${minutes}`
      : `${(hours % 12 || 12).toString()}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;

    // Format date if showDate is true
    if (showDate && date) {
      const options: Intl.DateTimeFormatOptions = {
        // weekday: "long",
        // year: "numeric",
        // month: "long",
        // day: "numeric"
        day: "2-digit",
        month: "short"
      };
      const formattedDate = date.toLocaleDateString("en-US", options); // Set locale to "en-US"
      formattedTime = `${formattedDate}, ${formattedTime}`;
    }

    return formattedTime;
  };

  return (
      <span className={styles.DateTimeDisplay}>{dateTime ? formatDateTime(dateTime) : "Loading..."}</span>
  );
};

export default DateTimeDisplay;
