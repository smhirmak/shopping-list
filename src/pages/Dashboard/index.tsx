import { useState } from 'react';
import GridLayout from 'react-grid-layout';
// import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

const Dashboard = () => {
  interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
  }
  const [layout, setLayout] = useState<LayoutItem[]>([
    { i: 'a', x: 0, y: 0, w: 1, h: 2, minW: undefined, maxW: undefined },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2, minW: undefined, maxW: undefined },
  ]);

  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout);
  };

  return (
    <div className="flex size-full">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable
        isResizable
        onLayoutChange={handleLayoutChange}
      >
        <div className="border border-red-500 bg-red-200" key="a">a</div>
        <div className="border border-red-500 bg-red-200" key="b">b</div>
        <div className="border border-red-500 bg-red-200" key="c">c</div>
      </GridLayout>
    </div>
  );
};

export default Dashboard;
