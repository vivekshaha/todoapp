import React from "react";

const Todorow = ({ data, todochnagefun, removefun, check }) => {
  return (
    <div key={data} className="flex items-center">
      <input
        className="w-8"
        type="checkbox"
        defaultChecked={check}
        onClick={() => {
          todochnagefun(data);
        }}
      />

      <h1 className="p-2 font-bold">{data}</h1>
      <button
        className="p-1 ml-6 text-white bg-red-400 rounded-md "
        onClick={() => {
          removefun(data);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Todorow;
