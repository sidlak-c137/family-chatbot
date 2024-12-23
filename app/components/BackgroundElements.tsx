import { useEffect, useState } from 'react';
import santaSilhouette from "~/components/assets/santa.png";
import treeImage from "~/components/assets/tree.png";
import giftsImage from "~/components/assets/gifts.png";

interface Snowflake {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

interface SnowDrift {
  x: number;
  height: number;
  width: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const generateSnowflakes = (): Snowflake[] => {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: -Math.random() * 20,
    duration: Math.random() * 10 + 10,
  }));
};

const generateSnowDrifts = (): SnowDrift[] => {
  return Array.from({ length: 15 }).map(() => ({
    x: Math.random() * 100,
    height: Math.random() * 40 + 20,
    width: Math.random() * 200 + 100,
  }));
};

const generateStars = (): Star[] => {
  return Array.from({ length: 100 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 40,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * -10,
    duration: Math.random() * 3 + 2,
  }));
};

export function BackgroundElements() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [snowDrifts, setSnowDrifts] = useState<SnowDrift[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setSnowflakes(generateSnowflakes());
    setSnowDrifts(generateSnowDrifts());
    setStars(generateStars());
  }, []);

  return (
    <>
      {/* Stars */}
      {stars.map((star, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            borderRadius: "50%",
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0.8,
            boxShadow: "0 0 2px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}

      {/* Larger, brighter stars with glow effect */}
      {stars.slice(0, 15).map((star, index) => (
        <div
          key={`bright-${index}`}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size + 1}px`,
            height: `${star.size + 1}px`,
            background: "white",
            borderRadius: "50%",
            animation: `twinkle ${star.duration * 1.5}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: 0.9,
            boxShadow:
              "0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6)",
          }}
        />
      ))}

      {/* Glowing moon with Santa */}
      <div
        className="absolute"
        style={{
          top: "30px",
          right: "80px",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle at center, #fff 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
          borderRadius: "50%",
          animation: "glow 4s ease-in-out infinite",
          opacity: 0.8,
          overflow: "hidden",
        }}
      >
        {/* Santa silhouette */}
        <img
          src={santaSilhouette}
          alt="Santa Claus"
          className="absolute bottom-0 right-0"
          style={{
            width: "70%",
            height: "auto",
            transform: "translateX(-15%) translateY(-100%)",
          }}
        />
      </div>

      {/* Mountain silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "60vh",
          background: "black",
          clipPath: `polygon(
            0% 100%,
            0% 20%,
            10% 40%,
            25% 7%,
            40% 45%,
            55% 5%,
            70% 40%,
            85% 8%,
            100% 40%,
            100% 100%
          )`,
          opacity: 0.8,
          zIndex: 2,
        }}
      />

      {/* Add the tree image */}
      <div
        className="absolute left-[-5%] bottom-0 w-1/3 h-screen bg-contain bg-no-repeat bg-bottom"
        style={{
          backgroundImage: `url(${treeImage})`,
          zIndex: 3,
          opacity: 1,
          filter: 'brightness(1) contrast(1)',
        }}
      />

      {/* Add the gifts image */}
      <div
        className="absolute right-[-5%] bottom-0 w-1/3 h-screen bg-contain bg-no-repeat bg-bottom"
        style={{
          backgroundImage: `url(${giftsImage})`,
          zIndex: 3,
          opacity: 1,
          filter: 'brightness(1) contrast(1)',
        }}
      />

      {/* Animated snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute pointer-events-none"
          style={{
            left: flake.left,
            top: "-20px",
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: "white",
            borderRadius: "50%",
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            opacity: 0.8,
            boxShadow: "0 0 2px rgba(255, 255, 255, 0.8)",
            filter: "blur(0.5px)",
            zIndex: 4,
          }}
        />
      ))}

      {/* Snow ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "300px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.8) 100%)",
          maskImage: "linear-gradient(to top, white 20%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, white 20%, transparent)",
          zIndex: 5,
        }}
      >
        {/* Snow drifts */}
        {snowDrifts.map((drift, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              bottom: "0",
              left: `${drift.x}%`,
              width: `${drift.width}px`,
              height: `${drift.height}px`,
              background: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              filter: "blur(10px)",
              transform: "translateX(-50%)",
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Northern lights effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(88, 180, 151, 0.1) 0%,
              rgba(111, 204, 186, 0) 70%
            )
          `,
          animation: "float 8s ease-in-out infinite",
          zIndex: 1,
        }}
      />

      {/* Random snow piles on the ground */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: `${Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 20 + 10}px`,
              background: "rgba(255,255,255,0.9)",
              borderRadius: "50%",
              filter: "blur(3px)",
              transform: "scale(1, 0.3)",
            }}
          />
        ))}
      </div>
    </>
  );
}
