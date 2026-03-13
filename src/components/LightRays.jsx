/**
 * LightRays Component
 * Renders animated, glowing light rays/beams that sweep across the screen.
 * Creates a cinematic volumetric lighting effect layered above the cosmic background.
 */
export default function LightRays() {
  const rays = [
    { color: "rgba(14,165,233,0.12)", angle: -30, left: "15%", duration: "8s", delay: "0s",  width: "3px", height: "70vh" },
    { color: "rgba(168, 85,247,0.10)", angle:  20, left: "35%", duration: "10s", delay: "2s",  width: "2px", height: "60vh" },
    { color: "rgba(14,165,233,0.08)", angle: -15, left: "55%", duration: "7s",  delay: "1s",  width: "4px", height: "80vh" },
    { color: "rgba(52,211,153,0.09)", angle:  35, left: "72%", duration: "12s", delay: "3s",  width: "2px", height: "65vh" },
    { color: "rgba(168, 85,247,0.07)", angle: -25, left: "85%", duration: "9s",  delay: "0.5s", width: "3px", height: "75vh" },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {rays.map((ray, i) => (
        <div
          key={i}
          className="absolute top-0 origin-top"
          style={{
            left: ray.left,
            width: ray.width,
            height: ray.height,
            background: `linear-gradient(to bottom, ${ray.color}, transparent)`,
            transform: `rotate(${ray.angle}deg)`,
            filter: "blur(1px)",
            animation: `rayPulse ${ray.duration} ease-in-out ${ray.delay} infinite alternate`,
            boxShadow: `0 0 12px 4px ${ray.color}`,
          }}
        />
      ))}

      {/* ─── Wide gossamer beams ─────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[70vh] -translate-x-1/2 origin-top"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,165,233,0.05), transparent)",
          transform: "rotate(-10deg)",
          filter: "blur(40px)",
          animation: "rayPulse 12s ease-in-out 0s infinite alternate",
        }}
      />
      <div
        className="absolute top-0 left-3/4 w-[500px] h-[60vh] -translate-x-1/2 origin-top"
        style={{
          background:
            "linear-gradient(to bottom, rgba(168,85,247,0.06), transparent)",
          transform: "rotate(18deg)",
          filter: "blur(30px)",
          animation: "rayPulse 10s ease-in-out 4s infinite alternate",
        }}
      />

      {/* ─── Horizontal shimmer band ─────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "38%",
          background:
            "linear-gradient(to right, transparent, rgba(14,165,233,0.3) 30%, rgba(168,85,247,0.3) 70%, transparent)",
          animation: "shimmerLine 6s ease-in-out infinite alternate",
          filter: "blur(1px)",
          boxShadow: "0 0 12px 2px rgba(14,165,233,0.2)",
        }}
      />
    </div>
  );
}
