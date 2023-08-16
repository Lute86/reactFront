import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context";
import CourseCard from "../components/CourseCard"; // Make sure to adjust the import path
import "../index.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Courses() {
  const { serverDown, setServerDown, loading, setLoading } = useGlobalState();
  const [courses, setCourses] = useState(null);
  const [option, setOption] = useState(""); // State to track the selected option

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
  }, []);

  // Filter courses based on the selected option
  const filteredCourses = courses
    ? option === ""
      ? courses // Show all courses when no option is selected
      : courses.filter(
          (course) => course.modality.toLowerCase() === option.toLowerCase()
        )
    : null;

  return (
    <div className="courses-body">
      <h2>Courses</h2>
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
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : <p>No courses found</p>} 
      </div>
    </div>
  );
}

export default Courses;
