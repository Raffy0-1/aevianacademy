"use client";

import React, { useEffect, useRef } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
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
        const loadThree = (!(window as any).THREE || !(window as any).THREE?.Group)
          ? loadScript("/vendor/three.r134.min.js").catch(() =>
              loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
            )
          : Promise.resolve();

        const loadRings = (!(window as any).VANTA?.RINGS)
          ? loadScript("/vendor/vanta.rings.min.js").catch(() =>
              loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js")
            )
          : Promise.resolve();

        await Promise.all([loadThree, loadRings]);

        // Safety guard: Suppress Three.js NaN bounding sphere console errors if any degenerate vertex slips through
        if ((window as any).THREE?.BufferGeometry?.prototype?.computeBoundingSphere) {
          const proto = (window as any).THREE.BufferGeometry.prototype;
          if (!proto._patchedForVanta) {
            const originalCompute = proto.computeBoundingSphere;
            proto.computeBoundingSphere = function () {
              try {
                originalCompute.call(this);
                if (this.boundingSphere && isNaN(this.boundingSphere.radius)) {
                  this.boundingSphere.radius = 100;
                }
              } catch (e) {
                // silent recovery
              }
            };
            proto._patchedForVanta = true;
          }
        }

        if (
          isMounted &&
          elRef.current &&
          (window as any).VANTA?.RINGS &&
          (window as any).THREE?.Group
        ) {
          vantaEffect = (window as any).VANTA.RINGS({
            el: elRef.current,
            THREE: (window as any).THREE,
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
