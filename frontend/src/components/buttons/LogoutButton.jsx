import React from "react";

const LogoutButton = ({ name , onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-slate-200 cursor-pointer ring-1 ring-slate-400 px-2 py-2 rounded-xl"
      >
        {name}
      </button>
    </>
  );
};

export default LogoutButton;
