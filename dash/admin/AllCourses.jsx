import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllCourses.css";
import { useGlobalState } from "../../context";
import ListUsers from "./ListUsers";
import ListCourses from "./ListCourses";
import { FaEdit, FaList } from "react-icons/fa";
import Spinner from "../../components/Spinner";

const AllCoursesFetch = ({ choice }) => {
  const { loading, setLoading } = useGlobalState();
  const [openCourseList, setOpenCourseList] = useState(false);

  function handleClickList() {
    setLoading(true)
    setOpenCourseList(true);
  }
  function handleChoice() {
    choice()
    setLoading(false)
  }

  return (
    <div className="allcourses-modal" onClick={handleChoice}>
      {!openCourseList && (
        <div
        className="allcourses-modal-content"
        onClick={(event) => event.stopPropagation()}
        >
          <h3>Courses</h3>
          <hr />
          <div className="allcourses-inside-content">
            <div>
              <FaEdit className="allcourses-fa-icon"/>
            </div>
            <div>
              <FaList className="allcourses-fa-icon" onClick={handleClickList} />
            </div>
          </div>
          <button className="allcourses-inside-button" onClick={handleChoice}>Close</button>
        </div>
      )}
      {openCourseList && (
        <>
          <ListCourses close={() => setOpenCourseList(false)} />
        </>
      )}
    </div>
  );
};

export default AllCoursesFetch;
