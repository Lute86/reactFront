import React, { useState, useEffect } from "react";
import axios from "axios";
import './AllQueries.css'
import { useGlobalState } from '../../context'
import ListQueries from "./ListQueries";
import { CiViewList } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";

const AllQueries = ({ choice }) => {
  const { loading, setLoading } = useGlobalState();
  const [openQueriesList, setOpenQueriesList] = useState(false);
  
  function handleClickList() {
    setLoading(true)
    setOpenQueriesList(true);
  }

  // function handleEdit() {
  //   //TODO
  // }

  function handleChoice() {
    choice()
    setLoading(false)
  }


  return (
    <div className="allqueries-modal" onClick={handleChoice}>
      {!openQueriesList && (
        <div
        className="allqueries-modal-content"
        onClick={(event) => event.stopPropagation()}
        >
          <h3>Queries</h3>
          <hr />
          <div className="allqueries-inside-content">
            {/* <div>
              <FiEdit2 className="allqueries-icon" onClick={handleEdit}/>
            </div> */}
            <div>
              <CiViewList className="allqueries-icon" onClick={handleClickList}/>
            </div>
          </div>
          <button className="allqueries-inside-button" onClick={handleChoice}>Close</button>
        </div>
      )}
      {openQueriesList && (
        <>
          <ListQueries close={() => setOpenQueriesList(false)} />
        </>
      )}
      
    </div>
  );
};

export default AllQueries;