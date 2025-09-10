import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Confetti from "react-confetti";

export default function useConfetti(trigger: boolean) {
  const [show, setShow] = useState(false);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const timeout = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timeout);
  }, [trigger]);

  if (typeof window === "undefined" || !show || !windowSize) return null;
  return ReactDOM.createPortal(
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={400}
    />,
    document.body
  );
}

export { useConfetti };
