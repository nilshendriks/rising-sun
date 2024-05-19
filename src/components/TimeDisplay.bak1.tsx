"use client";

import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface TimeDisplayProps {
  timezone: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timezone }) => {
  const [localTime, setLocalTime] = useState<string>("");
  // const [localDate, setLocalDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const fetchLocalTime = () => {
      const currentTime = moment.tz(timezone).format("HH:mm");
      setLocalTime(currentTime);

      const currentDate = moment.tz(timezone);
      const locale = currentDate.locale();
      setFormattedDate(currentDate.format("LLL"));
    };

    fetchLocalTime();

    const interval = setInterval(fetchLocalTime, 60000); // Update time every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [timezone]);

  return (
    <div>
      <p>
        {formattedDate}, {localTime}
      </p>
    </div>
  );
};

export default TimeDisplay;
