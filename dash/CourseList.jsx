import React, { useState, useEffect } from "react";
import axios from "axios";
import ListTable from "../components/ListTable";
import './CourseList.css'

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("http://localhost:4001/course/all");
        setCourses(response.data);
      } catch (error) {
        console.error("Fetch courses error", error);
      }
    }

    fetchCourses();
  }, []);

  const deleteCourse = (id) => {
    // Implement delete functionality here
    console.log(`Deleting course with ID: ${id}`);
  };

  const editCourse = (id) => {
    // Implement edit functionality here
    console.log(`Editing course with ID: ${id}`);
  };

  return (
    <div className="course-list-container">
      <h2>Courses List</h2>
      <ListTable data={courses} onDelete={deleteCourse} onEdit={editCourse} />
    </div>
  );
};

export default CoursesList;
