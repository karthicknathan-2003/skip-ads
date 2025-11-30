import { useEffect, useRef, useState } from "react";

export default function () {
  //   States
  const [isAdPlaying, setIsAdPlaying] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [skipTimer, setSkipTimer] = useState(5);

  //   Refs
  const adVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  //   Play the ad and track its play time.
  const handleTimeUpdate = () => {
    const currentTime = adVideoRef.current.currentTime;
    if (currentTime >= 5) {
      setCanSkip(true);
    }
  };

  //   Countown timer for skip in 'x' seconds.
  useEffect(() => {
    if (!isAdPlaying) {
      return;
    }
    const timer = setInterval(() => {
      setSkipTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isAdPlaying]);

  //   Handle skip button.
  const handleSkip = () => {
    setIsAdPlaying(false);
  };

  //   Play the main video, when the ad is skipped.
  useEffect(() => {
    if (!isAdPlaying && mainVideoRef.current) {
      mainVideoRef.current.play();
    }
  }, [isAdPlaying]);

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "550px",
      }}
    >
      {isAdPlaying ? (
        <div style={{ position: "relative", width: "100%" }}>
          <video
            ref={adVideoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            onTimeUpdate={handleTimeUpdate}
            autoPlay
            width="100%"
          />
          <button
            onClick={handleSkip}
            disabled={!canSkip}
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              padding: "10px 20px",
              border: 0,
              cursor: canSkip ? "pointer" : "not-allowed",
              fontSize: "14px",
            }}
          >
            {canSkip ? "Skip Ad" : `Skip in ${skipTimer}`}
          </button>
        </div>
      ) : (
        <video
          ref={mainVideoRef}
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          controls
          width="100%"
        />
      )}
    </div>
  );
}
