import React from "react";

const Projects = () => {
  return (
    <div className="px-5 py-6 w-full relative rounded-3xl shadow-sm shadow-black bg-white">
      <form>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex relative flex-col">
            <input
              className="input-class border shadow-sm shadow-white"
              type="text"
              value={""}
              name="zipCode"
            />
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Project name
            </label>
          </div>
          <div className="flex relative flex-col">
            <input
              className="input-class border shadow-sm shadow-white"
              type="text"
              value={""}
              name="zipCode"
            />
            <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Project name
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Projects;
