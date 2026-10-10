"use client";

import React, { useEffect, useRef } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.body.appendChild(script);
  });
}

interface VantaRingsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function VantaRingsBackground({ className = "", children }: VantaRingsBackgroundProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let vantaEffect: any = null;
    let isMounted = true;

    async function init() {
      try {
        if (!(window as any).THREE) {
          await loadScript("/vendor/three.r134.min.js").catch(() =>
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
          );
        }
        if (!(window as any).VANTA?.RINGS) {
          await loadScript("/vendor/vanta.rings.min.js").catch(() =>
            loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js")
          );
        }
        if (isMounted && elRef.current && (window as any).VANTA?.RINGS) {
          vantaEffect = (window as any).VANTA.RINGS({
            el: elRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x111a24, // Aevian Deep Navy
            color: 0xc86d51,          // Aevian Copper
          });
        }
      } catch (err) {
        // Fallback silently if WebGL is unavailable
      }
    }

    init();

    return () => {
      isMounted = false;
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (e) {
          // ignore cleanup error
        }
      }
    };
  }, []);

  return (
    <div ref={elRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
