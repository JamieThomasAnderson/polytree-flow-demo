import React, { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ReactFlow, { MiniMap, Controls, Background, BackgroundVariant, ReactFlowProvider } from 'reactflow';

import 'reactflow/dist/style.css';

import useStore from './store';
import CustomNode from './CustomNode';
import Sidebar from './sidebar';

import './Flow.module.css';

const nodeTypes = {
  custom: CustomNode,
};


const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onNodeClick: state.onNodeClick,
  onConnect: state.onConnect,
  onEdgeUpdateStart: state.onEdgeUpdateStart,
  onEdgeUpdate: state.onEdgeUpdate,
  onEdgeUpdateEnd: state.onEdgeUpdateEnd,
});

function Flow() {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
  } = useStore(
    useShallow(selector),
  );


  return (
      <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            snapToGrid
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
          >
            <Background variant={"dots" as BackgroundVariant} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        <Sidebar />
      </ReactFlowProvider>
  );
}

export default Flow;
