"use client";

import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface TimeDisplayProps {
  timezone: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timezone }) => {
  const [formattedDateTime, setFormattedDateTime] = useState<string>("");

  useEffect(() => {
    const fetchLocalDateTime = () => {
      const currentDateTime = moment.tz(timezone);
      // const formattedDateTime = currentDateTime.format("MMMM D, YYYY h:mm A");
      const formattedDateTime = currentDateTime.format("MMMM D, h:mm A");
      setFormattedDateTime(formattedDateTime);
    };

    fetchLocalDateTime();

    const interval = setInterval(fetchLocalDateTime, 60000); // Update time every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timezone]);

  return (
      <span>{formattedDateTime}</span>
  );
};

export default TimeDisplay;
