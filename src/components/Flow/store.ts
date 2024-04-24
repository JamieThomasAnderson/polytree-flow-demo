import { create } from 'zustand';
import {
  Edge, Node, Connection, EdgeChange, NodeChange, applyNodeChanges, applyEdgeChanges, addEdge, updateEdge 
} from 'reactflow';

import styles from './Flow.module.css';
import CustomNode from './CustomNode';


const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
    type: 'custom',
    className: styles.customNode,
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
    type: 'custom',
    className: styles.customNode,
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
    type: 'custom',
    className: styles.customNode,
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    type: 'custom',
    className: styles.customNode,
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'poo' },
  { id: 'e1-3', source: '1', target: '3' },
];


type RFState = {
  nodes: Node[];
  edges: Edge[];
  edgeUpdateSuccessful: boolean;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onEdgeUpdateStart: () => void;
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void;
  onEdgeUpdateEnd: (_:MouseEvent, edge: Edge) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  toggleEdgeUpdateSuccessful: () => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  edgeUpdateSuccessful: true,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onEdgeUpdateStart: () => {
    set({ edgeUpdateSuccessful: false });
  },
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
    set({
      edges: updateEdge(oldEdge, newConnection, get().edges),
      edgeUpdateSuccessful: true,
    });
  },
  onEdgeUpdateEnd: (_:MouseEvent, edge: Edge) => {
    if (!get().edgeUpdateSuccessful) {
      console.log(edge)
      set({
        edges: get().edges.filter((e) => e.id !== edge.id),
      });
    }

    set({ edgeUpdateSuccessful: true });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  toggleEdgeUpdateSuccessful: () => {
    set((state) => ({ edgeUpdateSuccessful: !state.edgeUpdateSuccessful }));
  },
}));

export default useStore;
