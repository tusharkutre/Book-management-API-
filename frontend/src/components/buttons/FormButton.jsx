import React from "react";

const FormButton = ({ name }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 cursor-pointer py-2 mb-5 rounded-md hover:bg-blue-600"
      >
        {name}
      </button>
    </>
  );
};

export default FormButton;
