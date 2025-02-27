import React from 'react'

const Details = () => {
    return (
        <div>
          <form>
            <div className="flex relative flex-col">
              <input
                className="input-class border shadow-sm shadow-white"
                type="text"
                value=""
                name="zipCode"
              />
              <label className="absolute left-3 -top-3 bg-white transition-all text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
                Zip-code
              </label>
            </div>
          </form>
        </div>
      );
}

export default Details