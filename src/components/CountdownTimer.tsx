import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CountdownTimerProps {
  targetDate?: string; // ISO format
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Default to 24 hours from now if no targetDate is provided
    const target = targetDate ? new Date(targetDate).getTime() : new Date().getTime() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <div className="bg-app-danger text-white w-10 h-10 flex items-center justify-center font-black text-lg rounded-none shadow-lg">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-app-danger">Hrs</span>
      </div>
      <span className="text-app-danger font-black text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-app-danger text-white w-10 h-10 flex items-center justify-center font-black text-lg rounded-none shadow-lg">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-app-danger">Min</span>
      </div>
      <span className="text-app-danger font-black text-xl mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-app-danger text-white w-10 h-10 flex items-center justify-center font-black text-lg rounded-none shadow-lg">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest mt-1 text-app-danger">Sec</span>
      </div>
    </div>
  );
}
