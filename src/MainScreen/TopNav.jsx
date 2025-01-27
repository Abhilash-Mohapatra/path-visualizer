import { useState } from "react";

function TopNav(props) {
    const [isActive,setIsActive] = useState(false);
    const [value,setValue] = useState(0);
    const { setIsAddWeightMode,setCurrWeight,visualize,handleReset } = props;

    const handleClick = () => {
        setIsAddWeightMode(isAddWeightMode => !isAddWeightMode);
        setIsActive(isActive => !isActive)
    }
    return(
        <>
            <div className="topnav">
                <div className="add-weight">
                    <input className="weight-input" value={value} type="number" min={1} max={100} onChange={(e) => {setValue(e.target.value); setCurrWeight(parseInt(e.target.value)) }}/>
                    <button className={`visualize ${isActive ? 'weight-input-active' : ''}`} onClick={handleClick}>Add Weight</button>
                </div>
                <button className="visualize" onClick={handleReset}>Reset</button>
                <button className="visualize" onClick={visualize}>Visualize</button>
            </div>
        </>
    )
}

export default TopNav;