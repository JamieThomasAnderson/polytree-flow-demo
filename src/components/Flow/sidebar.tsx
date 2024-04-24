

export default () => {
  const onDragStart = (event: any, nodeType:any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="p-4 bg-yellow-200">
      <div className="mb-4">You can drag these nodes to the pane on the right.</div>
      <div className="p-2 mb-2 bg-blue-500 text-white cursor-move" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="p-2 mb-2 bg-green-500 text-white cursor-move" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="p-2 mb-2 bg-red-500 text-white cursor-move" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};