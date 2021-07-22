import React from "react";
import "./pagination.css";

export default function Pagination({ currentPage, setCurrentPage, indexOfFirstRecord, indexOfLastRecord, airportsPerPage, search, data }) {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pagination">
      {currentPage - 1 > 0 ? (
        <i className="cursor-pointer fas fa-arrow-left fa-2x" onClick={() => paginate(currentPage - 1)}></i>
      ) : (
        <>&nbsp;</>
      )}
      <span>
        Showing &nbsp;
        <span className="font-weight-bold">
          {indexOfFirstRecord + 1} - {indexOfLastRecord > search(data).totalAirports ? search(data).totalAirports : indexOfLastRecord}
          &nbsp;
        </span>
        of <span className="font-weight-bold">{search(data).totalAirports} </span>results
      </span>
      {currentPage * airportsPerPage < search(data).totalAirports ? (
        <i className="cursor-pointer fas fa-arrow-right fa-2x" onClick={() => paginate(currentPage + 1)}></i>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
}
