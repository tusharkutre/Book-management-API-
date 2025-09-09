import React from "react";

const FormButton = ({ name }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full cursor-pointer inline-flex items-center justify-center rounded-lg bg-slate-900 text-white font-medium px-4 py-2 shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition"
      >
        {name}
      </button>
    </>
  );
};

export default FormButton;
