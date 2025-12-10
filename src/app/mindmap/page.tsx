"use client";

import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
import { useRouter } from "next/navigation";

const initialNodes = [
  { id: "1", data: { label: "blueprint.md" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "sample1.md" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "sample2.md" }, position: { x: 400, y: 100 } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e1-3", source: "1", target: "3" },
];

export default function MindMapPage() {
  const router = useRouter();

  const handleNodeClick = (_event: any, node: any) => {
    // Open file in editor (simulate navigation)
    router.push("/?file=" + node.data.label);
  };

  return (
    <div className="h-screen w-full bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4 text-center">File Relationship Mind Map</h1>
      <div className="h-[80vh] w-full rounded-lg border bg-card shadow-lg p-4">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodeClick={handleNodeClick}
          fitView
          style={{ background: "#1B1B1B" }}
        >
          <Background color="#5A35B3" gap={16} />
          <MiniMap nodeColor={() => "#4A148C"} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
