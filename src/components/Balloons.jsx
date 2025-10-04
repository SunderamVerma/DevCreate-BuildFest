import React from 'react';

function Balloons() {
  const colors = ['#ff5733', '#33ff57', '#3357ff', '#f333ff', '#ffda33'];
  const balloonArray = Array.from({ length: 10 });

  return (
    <div id="balloon-container">
      {balloonArray.map((_, index) => (
        <div
          key={index}
          className="balloon"
          style={{
            left: `${Math.random() * 80}%`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        ></div>
      ))}
    </div>
  );
}

export default Balloons;