import { useEffect, useState } from "react";

const Maintenance = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-07-16T07:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown("We're back online!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <img src="/Realestway horizontal.svg" width="500" />
      <h1 style={{ fontSize: "2rem", color: "#100073", marginBottom: "1rem" }}>
        🚧 Realestway is Under Maintenance
      </h1>
      <p style={{ fontSize: "1rem", color: "#555" }}>
        We&apos;re working on improvements. Please check back soon.
      </p>
      <p style={{ fontSize: "1.5rem", color: "#00a256", marginTop: "1.5rem" }}>
        {countdown}
      </p>
    </div>
  );
};

export default Maintenance;
