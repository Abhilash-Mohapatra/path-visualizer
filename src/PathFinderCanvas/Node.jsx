function Node(props) {
  const { onMouseDown,onMouseUp,onMouseOver,row,col,isStart,isDestination,isWall,isVisited } = props;
  const nodeId = `node-${row}-${col}`

  const customClassList = () => {
    let classes = 'node ';
    classes += isStart ? 'node-start' : isDestination ? 'node-destination' : isWall ? 'node-wall' : isVisited ? 'node-visited' : '';
    return classes;
  }

  return (
    <>
      <div className={`${customClassList()}`} id={nodeId} 
        onMouseDown={() => onMouseDown(row,col)}
        onMouseUp={() => onMouseUp(row,col)}
        onMouseEnter={() => onMouseOver(row,col)}
      ></div>
    </>
  )
}

export default Node;
