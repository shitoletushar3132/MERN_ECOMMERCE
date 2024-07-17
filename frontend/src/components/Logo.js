import React from "react";

function Logo({ w , h  }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 60"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tushar's Cart</title>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        fill="none"
       
      >
        <g
          id="Tushar's-Cart"
          fill="#dc2626"
          fontSize="20"
          fontWeight={700}
        >
          <text id="Tushar's-Cart" x="10" y="40">
            Tushar's Cart
          </text>
        </g>
      </g>
    </svg>
  );
}

export default Logo;
