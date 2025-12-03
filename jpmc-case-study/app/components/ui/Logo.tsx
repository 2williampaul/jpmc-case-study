"use client";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold text-black">Billy Paul</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black"
      >
        {/* 3/4 circle with right-angled corner cut out */}
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
          fill="currentColor"
        />
        {/* Inner circle to create ring */}
        <circle cx="12" cy="12" r="8" fill="white" />
        {/* Right-angled corner cut out (top-right quadrant) */}
        <rect x="12" y="2" width="10" height="10" fill="white" />
        {/* Visible 3/4 arc - redraw the outer arc */}
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

