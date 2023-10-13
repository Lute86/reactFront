import React, { useState, useEffect } from "react";
import "./AllCourses.css";
import { useGlobalState } from "../../context";
import ListCourses from "./ListCourses";
import { CiViewList } from "react-icons/ci";
import { FiEdit2, FiImage } from "react-icons/fi";
import CreateCourse from "./CreateCourse";
import ImageUploadForm from "../../components/UploadImage";


const AllCoursesFetch = ({ choice }) => {
  const { loading, setLoading } = useGlobalState();
  const [openCourseList, setOpenCourseList] = useState(false);
  const [openCourseCreation, setOpenCourseCreation] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);

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

  function handleUpload(){
    setLoading(true)
    setOpenImageUpload(true);
  }

  return (
    <div className="allcourses-modal" onClick={handleChoice}>
      {(!openCourseList && !openCourseCreation && !openImageUpload) && (
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
              <FiImage className="allcourses-icon" onClick={handleUpload}/>
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
      {openImageUpload && (
        <>
          <ImageUploadForm close={() => setOpenImageUpload(false)} />
        </>
      )}
    </div>
  );
};

export default AllCoursesFetch;
