import React from "react";

function InputField({
  item,
  htmlForName,
  type,
  placeholder,
  onChange,
  name,
  value,
}) {
  return (
    <div className="mb-4">
      <label className="font-semibold" htmlFor={htmlForName}>
        {item}
      </label>
      <input
        id={htmlForName}
        name={name}
        type={type}
        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputField;
