import { useState } from "react";

const LikeButton = ({ initialLiked = false, onToggle }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = () => {
    const next = !liked;
    setLiked(next);
    if (onToggle) onToggle(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "Unlike" : "Like"}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 ${
        liked
          ? "bg-rose-100 ring-rose-300 text-rose-600 hover:bg-rose-200"
          : "bg-white ring-slate-200 text-slate-500 hover:bg-slate-50"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 8.25 11.25 8.25 11.25S21 15.47 21 8.25z"
        />
      </svg>
    </button>
  );
};

export default LikeButton;


