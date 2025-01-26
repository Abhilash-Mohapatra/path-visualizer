function Node(props) {
  const { onMouseDown,onMouseUp,onMouseOver,row,col,isStart,isDestination,isWall } = props;
  const nodeId = `node-${row}-${col}`

  const customClassList = () => {
    let classes = 'node ';
    classes += isStart ? 'node-start' : isDestination ? 'node-destination' : isWall ? 'node-wall' : '';
    return classes;
  }

  return (
    <>
      <div className={`${customClassList()}`} id={nodeId} 
        onMouseDown={() => onMouseDown(row,col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseOver(row,col)}
      ></div>
    </>
  )
}

export default Node;
