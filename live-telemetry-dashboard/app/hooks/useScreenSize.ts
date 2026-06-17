'use client';

import { useState, useEffect } from "react";

export function useScreenSize () {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200, // fallback τιμή για τον server
        height: typeof window !== "undefined" ? window.innerHeight : 800
    });

    function handleResize () {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
   
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
       
       return { ...screenSize, isMobile: screenSize.width <= 640, isTablet:  screenSize.width <= 1024, isLaptop: screenSize.width <= 1280 };
}