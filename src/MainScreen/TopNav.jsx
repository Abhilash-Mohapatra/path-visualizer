function TopNav(props) {

    const handleVisualize = () => {
        props.visualize();
    }
    return(
        <>
            <div className="nav">
                <button className="visualize" onClick={handleVisualize}>Visualize</button>
            </div>
        </>
    )
}

export default TopNav;