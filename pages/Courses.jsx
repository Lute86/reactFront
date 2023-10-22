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
import usePingUser from "../hooks/usePingUser";

function Courses() {
  const { serverDown, setServerDown, loading, setLoading, userInfo, APIURL } =
    useGlobalState();
  const [courses, setCourses] = useState(null);
  const [option, setOption] = useState(""); // State to track the selected option
  const [optionType, setOptionType] = useState(""); // State to track the selected option
  const [modalId, setModalId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { pingUser } = usePingUser();
  const [userCourses, setUserCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function presentCourses() {
      try {
        const courses = await axios.get(
          `${APIURL}user/my/courses/${userInfo.id}`,
          { withCredentials: true }
        );
        if (!courses.error) {
          setUserCourses(courses.data);
          console.log(courses.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (userInfo && userInfo.role === "user") {
      presentCourses();
    }
  }, []);

  async function getCourses() {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4001/course/all");
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch courses error", error);
      setServerDown(true);
    }
  }

  useEffect(() => {
    setServerDown(false);
    getCourses();
    pingUser();
  }, [navigate]);

  // Filter courses based on the selected option
  const filteredCourses = courses
    ? option === ""
      ? courses // Show all courses when no option is selected
      : courses.filter(
          (course) => course.modality.toLowerCase() === option.toLowerCase()
        )
    : null;
  const filteredCoursesType = courses
    ? optionType === ""
      ? filteredCourses // Show all courses when no option is selected
      : filteredCourses.filter((course) => course.type === optionType)
    : null;

  const handleCourseClick = (id) => {
    // console.log("id", id)
    setModalId(id);
    setModalOpen(true);
  };

  const handleOption = (op) => {
    setOptionType("");
    setOption(op);
  };

  return (
    <div className="courses-body">
      <InfiniteCarousel />
      <h2>Courses</h2>
      <hr className="hr-body" />
      <div className="courses-options">
        <p className="p-option" onClick={() => handleOption("")}>
          All
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => handleOption("In-Person")}>
          In-person
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => handleOption("Hybrid")}>
          Hybrid
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => handleOption("Online")}>
          Online
        </p>
      </div>
      <hr className="hr-options" />
      <div className="courses-options-type">
        <p className="p-option" onClick={() => setOptionType("")}>
          All
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOptionType("course")}>
          Course
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOptionType("career")}>
          Career
        </p>
        <p> | </p>
        <p className="p-option" onClick={() => setOptionType("training")}>
          Training
        </p>
      </div>
      <div className="container-courses">
        {serverDown ? (
          <p className="p-courses-error">Error: Server is not responding</p>
        ) : loading ? (
          <Spinner />
        ) : filteredCoursesType ? (
          <div className="courseList">
            {filteredCoursesType.map((course) => {
              // Check if the course is in userCourses array
              const isEnrolled = userCourses.some((userCourse) => userCourse.id === course.id);

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleCourseClick(course.id)}
                  isEnrolled={isEnrolled}
                  setUserCourses={setUserCourses}
                />
              );
            })}
          </div>
        ) : (
          <p>No courses found</p>
        )}
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <SingleCourse id={modalId} />
        </Modal>
      )}
      <InfiniteCarousel />
    </div>
  );
}

export default Courses;
