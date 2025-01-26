function TopNav(props) {

    const handleVisualize = () => {
        props.visualize();
    }
    const handleReset = () => {
        props.handleReset();
    }
    return(
        <>
            <div className="nav">
                <button className="visualize" onClick={handleReset}>Reset</button>
                <button className="visualize" onClick={handleVisualize}>Visualize</button>
            </div>
        </>
    )
}

export default TopNav;