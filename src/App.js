import React, { useState, useEffect } from "react";
import airportsData from "./assets/data/airports.json";
import "./App.css";
import { DataTable, Pagination } from "./components";
import DatatableHeading from "./components/DatatableHeading";

function App() {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const searchColumns = ["name", "icao", "iata", "elevation", "latitude", "longitude"];
  const [typesArray, setTypesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [airportsPerPage, setAirportsPerPage] = useState(4);
  const indexOfLastRecord = currentPage * airportsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - airportsPerPage;

  useEffect(() => {
    setData({
      currentData: airportsData,
      totalAirports: airportsData.length,
    });
  }, []);

  //pagination
  const calculateRow = (row) => {
    const currentData = row.slice(indexOfFirstRecord, indexOfLastRecord);
    return {
      currentData: currentData,
      totalAirports: row.length,
    };
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [typesArray.length]);

  //filters
  function search(rows) {
    if (searchQuery && typesArray.length > 0) {
      return calculateRow(
        rows.currentData.filter(
          (row) =>
            searchColumns.some((column) => row[column] && row[column].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) &&
            typesArray.length > 0 &&
            typesArray.some((el) => row.type === el)
        )
      );
    } else if (searchQuery) {
      return calculateRow(
        rows.currentData.filter((row) =>
          searchColumns.some((column) => row[column] && row[column].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
        )
      );
    } else if (typesArray.length > 0) {
      return calculateRow(rows.currentData.filter((row) => typesArray.some((el) => row.type === el)));
    } else {
      return calculateRow(rows.currentData);
    }
  }

  //unique types in data
  let types = [...new Set(data && data.currentData.map((eachDataRecord) => eachDataRecord.type.trim() !== "" && eachDataRecord.type))];
  types = types.filter((data) => data);

  return (
    <div className="airports__container">
      <DatatableHeading />
      <div className="airports__action">
        <div className="airports__action-type">
          <h2>Type</h2>
          <div>
            {types &&
              types.map((eachType) => (
                <label key={eachType}>
                  <input
                    type="checkbox"
                    checked={typesArray.includes(eachType)}
                    onChange={(e) => {
                      const checked = typesArray.includes(eachType);
                      setTypesArray((prev) => (checked ? prev.filter((sc) => sc !== eachType) : [...prev, eachType]));
                    }}
                  />
                  {eachType}
                </label>
              ))}
          </div>
        </div>
        <div className="airport__actions-search">
          <h2>Filter by search</h2>
          <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <label htmlFor="airport__container-records">Show Records:</label>

      <select
        name="airport__container-records"
        id="airport__container-records"
        value={airportsPerPage}
        onChange={(e) => setAirportsPerPage(e.target.value)}
      >
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
      {data && (
        <>
          <DataTable data={search(data)} />
          <Pagination
            currentPage={currentPage}
            airportsPerPage={airportsPerPage}
            indexOfFirstRecord={indexOfFirstRecord}
            indexOfLastRecord={indexOfLastRecord}
            search={search}
            data={data}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
