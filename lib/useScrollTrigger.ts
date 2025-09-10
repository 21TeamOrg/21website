import { useEffect, useState } from "react";

export function useScrollTrigger(offset = 100) {
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > offset) setTriggered(true);
      else setTriggered(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return triggered;
}
