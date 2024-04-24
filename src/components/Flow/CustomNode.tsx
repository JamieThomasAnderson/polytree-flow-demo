import { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';

// Delete & Add Nodes
// Note Node
// Artical Node
// Title Node
// Groups


const CustomNode: FC<NodeProps> = ({ data, xPos, yPos, selected }) => {
  return (
    <>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle 
        type="target" 
        position={Position.Top}
        id="top"
      />
      
      <Handle 
        type="target" 
        position={Position.Right}
        id="right"
      />

      <div>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position:{' '}
          <strong>
            {xPos.toFixed(2)},{yPos.toFixed(2)}
          </strong>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Left}
        id="left"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
      />
    </>
  );
};

export default memo(CustomNode);
