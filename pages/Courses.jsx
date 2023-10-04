import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import CourseCard from "../components/CourseCard";
import "../index.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import SingleCourse from "../components/SingleCourse";
import { useNavigate } from "react-router-dom";
import InfiniteCarousel from "../components/InfiniteCarousel";


function Courses() {
  const { serverDown, setServerDown, loading, setLoading, pingUser, userInfo } = useGlobalState();
  const [courses, setCourses] = useState(null);
  const [option, setOption] = useState(""); // State to track the selected option
  const [modalId, setModalId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)


  const navigate = useNavigate();
  

  async function getCourses() {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:4001/course/all");
      setCourses(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Fetch courses error", error);
      setServerDown(true);
    }
  }

  useEffect(() => {
    setServerDown(false);
    getCourses();
    //ping user hook
  }, [userInfo?.subscribed]);

  // Filter courses based on the selected option
  const filteredCourses = courses
    ? option === ""
      ? courses // Show all courses when no option is selected
      : courses.filter(
          (course) => course.modality.toLowerCase() === option.toLowerCase()
        )
    : null;

  const handleCourseClick = (id) => {
    // console.log("id", id)
    setModalId(id)
    setModalOpen(true)
  }
  return (
    <div className="courses-body">
      <InfiniteCarousel/>
      <h2>Courses</h2>
      <hr />
      <div className="courses-options">
        <p className="p-option" onClick={() => setOption("")}>
          All
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOption("In-Person")}>
          In-person
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOption("Hybrid")}>
          Hybrid
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOption("Online")}>
          Online
        </p>
      </div>
      <div className="container-courses">
        {serverDown ? (
          <p className="p-courses-error">Error: Server is not responding</p>
        ) : loading ? (
          <Spinner />
        ) : filteredCourses ? (
          <div className="courseList">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course.id)} />
            ))}
          </div>
        ) : <p>No courses found</p>} 
      </div>
      {modalOpen && (<Modal onClose={()=>setModalOpen(false)}>
              <SingleCourse id={modalId}/>
        </Modal>)}
      <InfiniteCarousel/>
    </div>
  );
}

export default Courses;
