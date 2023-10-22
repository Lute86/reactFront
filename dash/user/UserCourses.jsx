import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserCourse.css";
import { useGlobalState } from "../../context";
import ListUserCourses from "../../components/ListUserCourses";

const UserCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const { userInfo, userRole, setModalOpen } = useGlobalState();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(
          `http://localhost:4001/user/my/courses/${userInfo.id}`,
          { withCredentials: true }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Fetch courses error", error);
      }
    }

    fetchCourses();
  }, [userInfo, userRole]);

  const unsubscribeFromCourse = async (courseId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        // Send a request to unsubscribe the user from the course
        await axios.delete(
          `http://localhost:4001/user/${userInfo.id}/removeCourse/${courseId}`,
          {
            withCredentials: true,
          }
        );

        // Update the courses list by removing the unsubscribed course
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
      } catch (error) {
        console.error("Unsubscribe error", error);
      }
    }
  };

  return (
    <div className="course-list-container">
      <h2 className="h2-user-courses">My Courses</h2>
      <hr className="course-list-container-hr"/>
      <ListUserCourses data={courses} onDelete={unsubscribeFromCourse} />
    </div>
  );
};

export default UserCoursesList;
