import React from "react";

const Loader = () => {
  return (
    <div className="p-[250px] ">
      <div class=" p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-green-400 via-yellow-400 to-red-600 md:w-[130px] md:h-[130px] h-[150px] w-[150px] aspect-square rounded-full">
        <div class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
      </div>
    </div>
  );
};

export default Loader;
