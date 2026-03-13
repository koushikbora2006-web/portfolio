/**
 * GridBackground Component
 * Renders a stunning 3D perspective grid that fills the entire screen behind all content.
 * Uses pure CSS/SVG for maximum performance — no Three.js overhead.
 */
export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* ─── 3D Perspective Grid ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[80vh]"
        style={{
          perspective: "600px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: "rotateX(75deg)",
            transformOrigin: "50% 0%",
            backgroundImage: `
              linear-gradient(to right, rgba(14,165,233,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(14,165,233,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ─── Radial fade at horizon ─────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(14,165,233,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ─── Shimmer / animated scanlines ─────────────────────────────────── */}
      <div
        className="absolute inset-0 animate-[gridShimmer_4s_linear_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, rgba(14,165,233,0.03) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}
