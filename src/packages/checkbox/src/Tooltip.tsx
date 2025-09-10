import React from "react";

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className="ubmisg-group ubmisg-relative ubmisg-inline-block">
      {children}
      <div
        role="tooltip"
        className="ubmisg-pointer-events-none ubmisg-absolute ubmisg-bottom-full ubmisg-left-1/2 ubmisg-mb-2 ubmisg--translate-x-1/2 ubmisg-whitespace-nowrap ubmisg-rounded ubmisg-bg-gray-800 ubmisg-px-2 ubmisg-py-1 ubmisg-text-sm ubmisg-text-white ubmisg-opacity-0 ubmisg-transition group-hover:ubmisg-opacity-100"
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
