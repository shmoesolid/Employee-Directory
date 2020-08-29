import React from "react";
import "./style.css";

function ButtonBar(props) {
  return (
    <div className="text-center button-bar rounded">
        <button className="rounded" onClick={() => props.sizeToFit()}>Size to Fit</button>&nbsp;
        <button className="rounded" onClick={() => props.autoSizeAll(false)}>Auto-Size</button>
    </div>
  );
}

export default ButtonBar;