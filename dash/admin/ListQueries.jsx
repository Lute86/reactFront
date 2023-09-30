import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ListQueries.css";
import axios from "axios";
import { useGlobalState } from "../../context";

const ListQueries = ({ close }) => {
  // Note the change from 'user' to 'users'
  const { APIURL, loading, setLoading, userInfo } = useGlobalState();
  const [allQueries, setAllQueries] = useState([]);
  const [allQueriesChanged, setAllQueriesChanged] = useState(false);


  useEffect(() => {
    async function getAllQueries() {
      //console.log(userInfo.id)
      try {
        if (userInfo && userInfo.role == 'admin') {
          const response = await axios.get(APIURL+"admin/query/all", {
            withCredentials: true,
          });
          //console.log(response.data)
          setAllQueries(response.data);
        }
      } catch (error) {
        console.error("Fetch courses error", error);
      }
      setLoading(false)
    }
  
    getAllQueries();
  }, [allQueriesChanged]); // Include userInfo as a dependency to re-fetch when it changes
  

  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this query?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        const deleteQuery = await axios.delete(
          APIURL + `admin/query/delete/${id}`,
          { withCredentials: true }
        );
        if (!deleteQuery.error) {
          // User confirmed and deletion was successful
          setAllQueriesChanged(!allQueriesChanged);
        }
      } catch (error) {
        console.error("Unable to delete query:", error);
      }
    } else {
      // User cancelled the deletion, no action needed
      console.log("User cancelled the deletion.");
    }
  };

  const handleDescription = (descripcion) => {
    console.log("Consulta: ", descripcion)
  };

  const handleContentClick = (event) => {
    // Prevent the click event from propagating to the modal background
    event.stopPropagation();
  };

  // Check if allUsers is defined and not an empty array
  if (!Array.isArray(allQueries) || allQueries.length === 0) {
    return <div className="all-queries-list-modal" onClick={() => close()}>
    <div className="no-data-container" >
      <div className="no-data-title" onClick={handleContentClick}>
        <h3>Queries</h3>
        <hr />
      </div>
      <p onClick={handleContentClick}>No data to display</p>

      <button className="no-data-button-close" onClick={() => close()}>Close</button>
    </div>
  </div>
  }

  const tableHeadersFull = Object.keys(allQueries[0]); 
  const filtros = ["updatedAt", 'deletedAt'];
  const tableHeaders = tableHeadersFull.filter((key) => !filtros.includes(key));

  return (
    <div className="all-queries-list-modal" onClick={() => close()}>
      <div className="all-queries-list-container">
        <table className="all-queries-list-content" onClick={handleContentClick}>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allQueries.map(
              (
                query // Map through the 'users' array
              ) => (
                <tr key={query.id}>
                  {tableHeaders.map((header) => (
                    <td key={header} onClick={header === 'description' ? ()=>handleDescription(query.description) : null}>
                            {header === 'createdAt' ? new Date(query[header]).toLocaleDateString() : query[header]}

                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleDelete(query.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button className="button-close-listqueries" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ListQueries;
