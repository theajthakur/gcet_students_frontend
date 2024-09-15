// DataTable.js
import React from "react";
const DataTable = ({ data }) => {
  // Check if data is provided
  if (!data) {
    return <p>No data available</p>;
  }

  // Create table rows for each key-value pair in the data object
  const rows = Object.entries(data)
    .filter(([key]) => key !== "id") // Filter out entries with key "id"
    .map(([key, value]) => (
      <tr key={key}>
        <td>
          <strong>{key.replace("_", " ").toUpperCase()}</strong>
        </td>
        <td>{value === null ? "N/A" : value}</td>
      </tr>
    ));

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
