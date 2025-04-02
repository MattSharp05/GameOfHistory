"use client";

import styles from './YearsWheel.module.css';
import { useEffect, useRef, useState } from 'react';

export default function YearsWheel() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    // Generate years from 1900 to 2000
    const generatedYears = Array.from({ length: 101 }, (_, i) => 1900 + i);
    setYears(generatedYears);
  }, []);

  const handleScroll = () => {
    if (wheelRef.current) {
      const scrollPosition = wheelRef.current.scrollLeft;
      const containerWidth = wheelRef.current.offsetWidth;
      const yearWidth = 100; // Width of each year (including gap)
      const centerPosition = scrollPosition + (containerWidth / 2);
      const selectedIndex = Math.round(centerPosition / yearWidth);
      
      if (selectedIndex >= 0 && selectedIndex < years.length) {
        setSelectedYear(years[selectedIndex]);
      }
    }
  };

  return (
    <div className={styles.yearsContainer}>
      <div className={styles.highlightBox}></div>
      <div 
        className={styles.yearsWheel} 
        ref={wheelRef}
        onScroll={handleScroll}
      >
        {years.map((year) => (
          <div 
            key={year} 
            className={`${styles.year} ${selectedYear === year ? styles.selected : ''}`}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
} 