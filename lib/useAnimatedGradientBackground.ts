import { useEffect, useRef } from "react";

export function useAnimatedGradientBackground(
  colors: string[],
  duration = 8000
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let step = 0;
    let requestId: number;
    const animate = () => {
      step += 0.002;
      const color1 = colors[Math.floor(step) % colors.length];
      const color2 = colors[(Math.floor(step) + 1) % colors.length];
      ref.current!.style.background = `linear-gradient(120deg, ${color1}, ${color2})`;
      requestId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(requestId);
  }, [colors, duration]);
  return ref;
}
