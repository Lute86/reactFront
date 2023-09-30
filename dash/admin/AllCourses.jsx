import React, { useState, useEffect } from "react";
import "./AllCourses.css";
import { useGlobalState } from "../../context";
import ListCourses from "./ListCourses";
import { CiViewList } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import CreateCourse from "./CreateCourse";

const AllCoursesFetch = ({ choice }) => {
  const { loading, setLoading } = useGlobalState();
  const [openCourseList, setOpenCourseList] = useState(false);
  const [openCourseCreation, setOpenCourseCreation] = useState(false);

  function handleClickList() {
    setLoading(true)
    setOpenCourseList(true);
  }

  function handleClickCreate() {
    setLoading(true)
    setOpenCourseCreation(true);
  }

  function handleChoice() {
    choice()
    setLoading(false)
  }

  return (
    <div className="allcourses-modal" onClick={handleChoice}>
      {(!openCourseList && !openCourseCreation) && (
        <div
        className="allcourses-modal-content"
        onClick={(event) => event.stopPropagation()}
        >
          <h3>Courses</h3>
          <hr />
          <div className="allcourses-inside-content">
            <div>
              <FiEdit2 className="allcourses-icon" onClick={handleClickCreate}/>
            </div>
            <div>
              <CiViewList className="allcourses-icon" onClick={handleClickList}/>
            </div>
          </div>
          <button className="allcourses-inside-button" onClick={handleChoice}>Close</button>
        </div>
      )}
      {openCourseList && (
        <div onClick={(event) => event.stopPropagation()}>
          <ListCourses close={() => setOpenCourseList(false)} />
        </div>
      )}
      {openCourseCreation && (
        <div onClick={(event) => event.stopPropagation()}>
          <CreateCourse close={() => setOpenCourseCreation(false)} />
        </div>
      )}
    </div>
  );
};

export default AllCoursesFetch;
