import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './ListUnique.css'

const ListUnique = ({ user, onDelete, onEdit }) => {
  //console.log(user)
  if (!user) {
    return <p>No data to display.</p>;
  }

  const tableHeaders = Object.keys(user);

  return (
    <table className="list-unique">
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
        <tr key={user.id}>
          {tableHeaders.map((header) => (
            <td key={header}>{header === "subscribed" ? (user[header] === true ? "Yes" : "No") : user[header]}</td>
          ))}
          <td>
            <button onClick={() => onEdit(user.id)}>
              <FaEdit />
            </button>
          </td>
          <td>
            <button onClick={() => onDelete(user.id)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListUnique;
