import React from "react";
import "./Skeleton.css";

function Skeleton({ width, height, borderRadius }) {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}></div>
  );
}

export default Skeleton;
