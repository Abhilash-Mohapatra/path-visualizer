function Node(props) {
  const { onMouseDown,onMouseUp,onMouseOver,row,col } = props;
  const nodeId = `node-${row}-${col}`

  return (
    <>
      <div className="node" id={nodeId} 
        onMouseDown={() => onMouseDown(row,col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseOver(row,col)}
      ></div>
    </>
  )
}

export default Node;
