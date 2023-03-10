import React from "react";

function Navbar() {
  return (
    <div
      className={`lg:flex flex-shrink-1 sticky z-20 top-0 left-0 h-16 px-[4%] w-full border-b border-neutral-700 justify-between tablet-400-light bg-neutral-900 items-center}`}
    >
      <div className="flex items-center">
        <div className="flex text-neutral-50 gap-2">
          <p className="cursor-pointer">Home</p>
        </div>
      </div>
      <div className="flex items-center gap-x-6"></div>
    </div>
  );
}

export default Navbar;
