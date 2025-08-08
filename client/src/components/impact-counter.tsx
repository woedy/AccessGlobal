import { useState, useEffect } from "react";

interface ImpactCounterProps {
  target: number;
  label: string;
  duration?: number;
}

export default function ImpactCounter({ target, label, duration = 2000 }: ImpactCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    return `${num}${num === target && target >= 100 ? '+' : ''}`;
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-2 text-white">
        {formatNumber(count)}
      </div>
      <div className="text-primary-100">{label}</div>
    </div>
  );
}
