function Node(props) {
  const nodeId = `node-${props.row}-${props.col}`
  
  const handleClick = (ele) => {
    ele.target.classList.add('node-selected')
  }

  return (
    <>
      <div className="node" id={nodeId} onClick={handleClick}></div>
    </>
  )
}

export default Node;
