"use client";
// Quill — PM Quest's coach mascot. A friendly owl-ish character drawn in SVG.
// mood: "idle" | "happy" | "sad" | "celebrate" | "think"
export default function Mascot({ mood = "idle", size = 96 }) {
  const eyeY = mood === "happy" || mood === "celebrate" ? 40 : 42;
  const blink = mood === "sad";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={`mascot mascot-${mood}`} role="img" aria-label={`coach ${mood}`}>
      <defs>
        <linearGradient id="qbody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c6cf0" />
          <stop offset="1" stopColor="#6C5CE7" />
        </linearGradient>
      </defs>

      {/* celebration sparkles */}
      {mood === "celebrate" && (
        <g className="sparkles">
          <circle cx="20" cy="24" r="3" fill="#ffb703" />
          <circle cx="100" cy="30" r="2.5" fill="#ff5a3c" />
          <circle cx="96" cy="70" r="2.5" fill="#18a999" />
          <circle cx="24" cy="74" r="2.5" fill="#ff5a3c" />
        </g>
      )}

      {/* feet */}
      <ellipse cx="46" cy="108" rx="9" ry="5" fill="#ffb703" />
      <ellipse cx="74" cy="108" rx="9" ry="5" fill="#ffb703" />

      {/* body */}
      <path className="qbody" d="M60 18c24 0 38 18 38 44 0 28-18 44-38 44s-38-16-38-44C22 36 36 18 60 18z" fill="url(#qbody)" />
      {/* belly */}
      <ellipse cx="60" cy="74" rx="24" ry="26" fill="#efe9ff" />

      {/* ear tufts */}
      <path d="M34 26c-4-8-2-14 2-16 3 6 4 12 2 18z" fill="#6C5CE7" />
      <path d="M86 26c4-8 2-14-2-16-3 6-4 12-2 18z" fill="#6C5CE7" />

      {/* eyes */}
      <g>
        <circle cx="48" cy={eyeY} r="13" fill="#fff" />
        <circle cx="72" cy={eyeY} r="13" fill="#fff" />
        {blink ? (
          <>
            <path d="M40 42q8 6 16 0" stroke="#14213d" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M64 42q8 6 16 0" stroke="#14213d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle className="pupil" cx="48" cy={eyeY} r="6" fill="#14213d" />
            <circle className="pupil" cx="72" cy={eyeY} r="6" fill="#14213d" />
            <circle cx="50" cy={eyeY - 2} r="2" fill="#fff" />
            <circle cx="74" cy={eyeY - 2} r="2" fill="#fff" />
          </>
        )}
      </g>

      {/* beak */}
      <path d="M60 54l-7 8h14z" fill="#ffb703" />

      {/* mouth / expression */}
      {mood === "happy" || mood === "celebrate" ? (
        <path d="M50 70q10 10 20 0" stroke="#14213d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : mood === "sad" ? (
        <path d="M52 74q8 -7 16 0" stroke="#14213d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : null}

      {/* little brows for 'think' */}
      {mood === "think" && (
        <>
          <path d="M40 30l14 4" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 30l-14 4" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
