"use client";

import styles from './YearsWheel.module.css';
import { useEffect, useRef, useState } from 'react';

export default function YearsWheel({ setSelectedYear }) {
  const [years, setYears] = useState([]);
  const wheelRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [zoom, setZoom] = useState(1); // Zoom factor (1 = default)
  const minZoom = 0.5;
  const maxZoom = 2;
  const baseYearWidth = 100;
  const yearWidth = baseYearWidth / zoom;

  // Generate years from 1800 to 2025 on page load
  useEffect(() => {
    const generatedYears = Array.from({ length: 235 }, (_, i) => 1800 + i);
    setYears(generatedYears);

    if (wheelRef.current && generatedYears.length > 0) {
      const middleIndex = Math.floor(generatedYears.length / 2);
      const initialScroll = middleIndex * yearWidth - wheelRef.current.offsetWidth / 2 + yearWidth / 2;
      wheelRef.current.scrollLeft = initialScroll;
      setSelectedYear(generatedYears[middleIndex]);
    }
    
  }, []);

  // Handle keyboard input for year selection
  useEffect(() => {
    const inputBuffer = [];

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        inputBuffer.push(e.key);

        if (inputBuffer.length > 4) {
          inputBuffer.shift(); // Keep only last 4
        }

        const yearTyped = parseInt(inputBuffer.join(''), 10);
        if (yearTyped >= 1830 && yearTyped <= 2025 && years.includes(yearTyped)) {
          // Scroll to that year
          const index = years.indexOf(yearTyped);
          const scrollTarget = index * yearWidth - wheelRef.current.offsetWidth / 2 + yearWidth / 2;
          wheelRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' });

          setSelectedYear(yearTyped);
          inputBuffer.length = 0; 
        }
      } else {
        inputBuffer.length = 0; 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [years, yearWidth]);


  const scrollTimeout = useRef(null);

  const handleScroll = () => {
  if (scrollTimeout.current) cancelAnimationFrame(scrollTimeout.current);

  scrollTimeout.current = requestAnimationFrame(() => {
    if (!wheelRef.current) return;

    const minIndex = years.indexOf(1804);
    const maxIndex = years.indexOf(2030);
    const minScroll = (minIndex - 0.5) * yearWidth;
    const maxScroll = (maxIndex + 0.5) * yearWidth - wheelRef.current.offsetWidth;

    // Clamp scrollLeft
    if (wheelRef.current.scrollLeft < minScroll) {
      wheelRef.current.scrollLeft = minScroll;
    } else if (wheelRef.current.scrollLeft > maxScroll) {
      wheelRef.current.scrollLeft = maxScroll;
    }

    const scrollPosition = wheelRef.current.scrollLeft;
    const containerWidth = wheelRef.current.offsetWidth;
    const centerPosition = scrollPosition + containerWidth / 2;
    const selectedIndex = Math.round(centerPosition / yearWidth) - 1;

    if (selectedIndex >= 0 && selectedIndex < years.length) {
      setSelectedYear(years[selectedIndex]);
    }
  });
};


  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - wheelRef.current.offsetLeft;
    scrollLeft.current = wheelRef.current.scrollLeft;
    wheelRef.current.style.cursor = 'grabbing';
    wheelRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - wheelRef.current.offsetLeft;
    const walk = (x - startX.current) * (4 / zoom);
    wheelRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    wheelRef.current.style.cursor = 'grab';
    wheelRef.current.style.removeProperty('user-select');
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].pageX - wheelRef.current.offsetLeft;
    scrollLeft.current = wheelRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - wheelRef.current.offsetLeft;
    const walk = (x - startX.current) * (5); // More responsive at higher zoom

    wheelRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleZoom = (e) => {
    e.preventDefault();

    const zoomChange = e.deltaY < 0 ? -0.1 : 0.1; // Scroll down → zoom out
    
    setZoom((prevZoom) => {
      const newZoom = Math.min(maxZoom, Math.max(minZoom, prevZoom + zoomChange));
      return Math.round(newZoom * 100) / 100;
    });
  };



  return (
    <div className={styles.yearsContainer}>
      <div className={styles.highlightBox}></div>
      <div
        className={styles.yearsWheel}
        ref={wheelRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ cursor: 'grab' }}
        onWheel={handleZoom}
      >
        {years.map((year) => (
          <div
            key={year}
            className={styles.year}
            style={{ width: `${yearWidth}px` }}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}
