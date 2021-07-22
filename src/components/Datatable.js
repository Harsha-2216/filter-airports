import React from "react";
import "./Datatable.css";

function Datatable({ data }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table cellPadding={0} cellSpacing={0} id="airports">
        <thead>
          <tr>
            <th>Name</th>
            <th>ICAO</th>
            <th>IATA</th>
            <th>Elev.</th>
            <th>Lat.</th>
            <th>Long.</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.currentData.map((row, index) => (
              <tr key={index}>
                <td>{row["name"]}</td>
                <td>{row["icao"]}</td>
                <td>{row["iata"]}</td>
                <td>{row["elevation"]}</td>
                <td>{row["latitude"]}</td>
                <td>{row["longitude"]}</td>
                <td>{row["type"]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable;
