import React from "react";

const FormGroup = ({ label, placeholder, value, onchange }) => {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor={label}
        className="
          mb-2 block
          text-sm font-medium
          capitalize
          text-gray-300
        "
      >
        {label}
      </label>

      <input
        id={label}
        value={value}
        onChange={onchange}
        type={label === "password" ? "password" : "text"}
        name={label}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border border-white/10
          bg-[#181818]
          px-4 py-3
          text-sm text-white
          outline-none
          placeholder:text-gray-600
          transition-all duration-200

          focus:border-pink-500/60
          focus:bg-[#1c1c1c]
          focus:ring-2
          focus:ring-pink-500/10

          hover:border-white/20
        "
      />
    </div>
  );
};

export default FormGroup;
