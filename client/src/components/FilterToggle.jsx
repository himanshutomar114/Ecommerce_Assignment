import React from "react";
import { ChevronDown } from "lucide-react";

const FilterToggle = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <details className="group" open>
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer 
                          font-medium text-gray-700 hover:bg-gray-50">
        {title}
        <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 py-3 border-t border-gray-100">{children}</div>
    </details>
  </div>
);

export default FilterToggle;
