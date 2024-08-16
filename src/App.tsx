import './App.css'
import { useEffect, useRef } from 'react';

const RadarChartSVG = ({ arcs, branches }: any) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg: any = svgRef.current;

    // Draw radial arcs (half circles)
    arcs.forEach((arc: any, _: any) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        `M0,${arc.y} A${arc.radius},${arc.radius} 0 0,1 ${arc.endX},${arc.endY}`
      );
      path.setAttribute("stroke", "white");
      path.setAttribute("fill", "none");
      svg.appendChild(path);
    });

    // Draw branches emerging from the center
    branches.forEach((branch: any, index: any) => {
      const path: any = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const { controlX, controlY, endX, endY, color } = branch;

      path.setAttribute(
        "d",
        `M0,300 Q${controlX},${controlY} ${endX},${endY}`
      );
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", 2);
      path.setAttribute("fill", "none");

      svg.appendChild(path);

      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
        duration: 2000 + index * 500,  // stagger the animation
        fill: 'forwards',
        easing: 'ease-in-out',
      });
    });
  }, [arcs, branches]);

  return (
    <svg ref={svgRef} width="400" height="600">
    </svg>
  );
};

const arcs = [
  { radius: 100, y: 100, endX: 100, endY: 200 },
  { radius: 200, y: 200, endX: 200, endY: 400 },
  { radius: 300, y: 300, endX: 250, endY: 600 },
];

const branches = [
  {
    arcIndex: 0,
    controlX: 50,
    controlY: 150,
    endX: 100,
    endY: 200,
    color: "red",
  },
  {
    arcIndex: 1,
    controlX: 100,
    controlY: 300,
    endX: 200,
    endY: 400,
    color: "green",
  },
  {
    arcIndex: 1,
    controlX: 100,
    controlY: 300,
    endX: 250,
    endY: 600,
    color: "blue",
  },
];

const Legend = ({ items }: any) => {
  return (
    <div style={{ marginTop: '-200px', marginLeft: '-200px', display: 'flex', flexDirection: 'column' }}>
      {items.map((item: any, index: any) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: item.color,
              marginRight: '10px',
            }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const legendItems = [
  { label: 'Individual', color: 'red' },
  { label: 'Team', color: 'green' },
  { label: 'Group', color: 'blue' },
];

function App() {
  return (
    <>
      <RadarChartSVG arcs={arcs} branches={branches} />
      <Legend items={legendItems} />
    </>
  )
}

export default App
