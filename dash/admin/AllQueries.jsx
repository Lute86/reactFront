import React, { useState, useEffect } from "react";
import axios from "axios";
import './AllUsers.css'
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
  function handleChoice() {
    choice()
    setLoading(false)
  }

  return (
    <div className="allcourses-modal" onClick={handleChoice}>
      {!openQueriesList && (
        <div
        className="allcourses-modal-content"
        onClick={(event) => event.stopPropagation()}
        >
          <h3>Queries</h3>
          <hr />
          <div className="allcourses-inside-content">
            <div>
              <FiEdit2 className="allcourses-icon"/>
            </div>
            <div>
              <CiViewList className="allcourses-icon" onClick={handleClickList}/>
            </div>
          </div>
          <button className="allcourses-inside-button" onClick={handleChoice}>Close</button>
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