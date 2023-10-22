import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import './ListUserCourses.css'
import { useGlobalState } from "../context";

const ListUserCourses = ({ data, onDelete }) => {
  const { setModalOpen } = useGlobalState();
  console.log(data);
  if (!data || data.length === 0) {
    return (
      <>
        <p>You are not registered on any courses at the moment</p>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </>
    );
  }
  const tableHeaders = ['course_name', 'modality', 'duration','start_date', 'finish_date'];
  return (
    <div className="list-user-course-container">
      <div className="scrollable-table">
        <table className="list-user-course">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{(header.charAt(0).toUpperCase() + header.slice(1))}</th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {tableHeaders.map((header) => (
                  <td key={header}>
                    {item[header]}
                    </td>
                ))}
                <td>
                  <button onClick={() => onDelete(item.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="listusercourses-close-button" onClick={() => setModalOpen(false)}>Close</button>
    </div>
  );
};

export default ListUserCourses;
