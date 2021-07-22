import React from "react";
import "./DatatableHeading.css";

export default function DatatableHeading() {
  return (
    <div className="airports__container-heading">
      <h1>
        Filter <span>Airports</span>
      </h1>
      <i className="cursor-pointer fab fa-windows fa-2x"></i>
    </div>
  );
}
