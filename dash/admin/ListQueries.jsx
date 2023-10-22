import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ListQueries.css";
import axios from "axios";
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";

const ListQueries = ({ close }) => {
  const { APIURL, loading, setLoading, userInfo } = useGlobalState();
  const [allQueries, setAllQueries] = useState([]);
  const [allQueriesChanged, setAllQueriesChanged] = useState(false);
  const [editQuery, setEditQuery] = useState(false);
  const [editId, setEditId] = useState(null)
  const [from, setFrom] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [wrongData, setWrongData] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);


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

  const handleContentClick = (event) => {
    // Prevent the click event from propagating to the modal background
    event.stopPropagation();
  };

  const handleEdit = (query) => {
    setReason(query.reason.toLowerCase())
    setEmail(query.email)
    setUserDescription(query.description)
    setEditId(query.id)
    setEditQuery(true)
  }

  const handleEmail = async (event) => {
    event.preventDefault();
    setEmailStatus(false)
    setEditStatus(false)
    setWrongData(false)
    if(from==''||email==""||reason==""||description=="") {
      setWrongData(true)
    }else{
      setLoading(true)
      try {
        const body = {
          from,
          email,
          reason,
          description
        }
        //prueba mandar mail
        const sendEmail = await axios.post(`${APIURL}admin/query/email`, body, {withCredentials:true})
        if(!sendEmail.error){
          setEmailStatus(true)
          //prueba mandar update del answered a query
          const update = await axios.put(`${APIURL}admin/query/${editId}`,{},{withCredentials:true});
          if(!update.error){
            setEditStatus(true)
            setLoading(false)
            alert('Email sent. Query answered status updated')
            setEditQuery(false)
          }
        }
      } catch (error) {
        console.error(error)
        if(!emailStatus)alert("Email not sent")
        if(emailStatus && !editStatus) alert("Email sent, but query answer status not updated")
        setLoading(false)
        setEditQuery(false)
    }
    }
  }
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
        {!editQuery && <table className="all-queries-list-content" onClick={handleContentClick}>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Reply</th>
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
                    <td key={header} >
                            {header === 'createdAt' ? new Date(query[header]).toLocaleDateString() : query[header]}

                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(query)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(query.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>}
        {editQuery && 
          <form className='email-form' onClick={handleContentClick}>
            <div>
              <label htmlFor="user-query">
                Query:
              </label>
              <textarea
                id="user-query"
                value={userDescription}
                readOnly
              />
            </div>
            <div>
              <label>To:
                <input value={email} readOnly/>
              </label>
            </div>
            <div>
              <label>From:
                <input value={from} onChange={(e)=>setFrom(e.target.value)}/>
              </label>

            </div>
            <div>
              <label htmlFor="reason">Reason:</label>
              <input
                id="reason"
                value={reason}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="description">
                Text:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
              />
            </div>
            {wrongData && <p className="wrong-data">Fill data appropriately</p>}
            <button onClick={(e)=>handleEmail(e)}>
              {!loading ? "Submit" : <Spinner />}
            </button>
            <button onClick={()=>setEditQuery(false)}>Back to list</button>
          </form>}
        <button className="button-close-listqueries" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ListQueries;
