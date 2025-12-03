"use client";

export default function Logo() {
  return (
    <div className="flex items-center">
      <span className="text-xl font-bold text-black uppercase tracking-tight relative">
        BILLY PA
        <span className="relative inline-block">
          U
          {/* Graphic element positioned above the "UL" - quarter circle shape */}
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-2.5 left-0 text-black"
          >
            {/* Quarter-circle shape: curved edge on top-right, straight edges forming right angle pointing down-left */}
            <path
              d="M0 10 L0 0 L8 0 A8 8 0 0 1 8 8 L0 10 Z"
              fill="currentColor"
            />
          </svg>
          L
        </span>
      </span>
    </div>
  );
}

