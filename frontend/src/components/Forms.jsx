import React from "react";
import { useState } from "react";

const Forms = () => {
  const [formData, setFormData] = useState({
    username: "", //updated input value for this state
    password: "",
  });

  const handleInputChange = (e) => {
      const {name , value} = e.target;

      setFormData((prev)=> ({...prev , [name] : value}))
  } 

  const handleFormSubmit = (e) => {
      e.preventDefault()
      console.log(formData);

      // reset the input values after form submit
      setFormData({
        username : "",
        password : ""
      })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-3" action="" method="POST">
        <div className="username-input">
          <label htmlFor="">Username </label>
          <input
            name="username"
            value={formData.username}
            className="ring-1"
            type="email"
            placeholder="Enter name"
            onChange={handleInputChange}
          />
        </div>
        <div className="password-input">
          <label htmlFor="">Password </label>
          <input
            name="password"
            value={formData.password}
            className="ring-1"
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button
            className="mt-3 w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Forms;
