import React from "react";

const InputContainer = ({ onChangeText, placeholder, stateValue }) => {
  
  const handleChange = (e) => {
    
    onChangeText(e.target.value);
    // implement throttling
  };
  return (
    <input
      className="w-full h-10 rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans"
      type="text"
      placeholder={placeholder}
      value={stateValue}
      onChange={handleChange}
    />
  );
};

export default InputContainer;
