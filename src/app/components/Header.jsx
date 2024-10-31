import React from "react";
import { FaPlane } from "react-icons/fa";

const Header = () => {
    return (
        <div className="flex justify-between px-6 pt-4">
            <h2 className="text-4xl text-gray-800 font-bold">Flight Status Dashboard</h2>
              <FaPlane className='text-gray-800 text-4xl' />
        </div>
    );
}

export default Header;
