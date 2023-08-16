import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './ListTable.css'

const ListTable = ({ data, onDelete, onEdit }) => {
  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  const tableHeaders = Object.keys(data[0]);

  return (
    <table className="list-table">
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {tableHeaders.map((header) => (
              <td key={header}>{item[header]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(item.id)}>
                <FaEdit />
              </button>
            </td>
            <td>
              <button onClick={() => onDelete(item.id)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTable;
