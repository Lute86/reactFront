import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseList.css";
import { useGlobalState } from "../context";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const { userInfo, userRole } = useGlobalState();

  useEffect(() => {
    async function fetchCourses() {
      try {
        if (userInfo && userInfo.id) {
          if (userRole === "admin") {
            const response = await axios.get("http://localhost:4001/course/all");
            setCourses(response.data);
          } else {
            const response = await axios.get(
              `http://localhost:4001/user/my/courses/${userInfo.id}`,
              { withCredentials: true }
            );
            setCourses(response.data);
          }
        }
      } catch (error) {
        console.error("Fetch courses error", error);
      }
    }

    fetchCourses();
  }, [userInfo, userRole]);

  const unsubscribeFromCourse = async (courseId) => {
    try {
      // Send a request to unsubscribe the user from the course
      await axios.delete(`http://localhost:4001/user/${userInfo.id}/removeCourse/${courseId}`, {
        withCredentials: true,
      });

      // Update the courses list by removing the unsubscribed course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (error) {
      console.error("Unsubscribe error", error);
    }
  };

  return (
    <div className="course-list-container">
      <h2>My Courses</h2>
      <ul className="user-courses-list">
        {courses.map((course) => (
          <li key={course.id}>
            {course.course_name}
            <button onClick={() => unsubscribeFromCourse(course.id)}>
              Unsubscribe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
