import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ListCourses.css";
import axios from "axios";
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";
import EditCourse from "./EditCourse";

const ListCourses = ({ close }) => {
  // Note the change from 'user' to 'users'
  const { APIURL, userInfo, loading, setLoading } = useGlobalState();
  const [allCoursesChanged, setAllCoursesChanged] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(false);



  useEffect(() => {
    async function getAllCourses() {
      //console.log(userInfo.id)
      try {
        if (userInfo && userInfo.role == "admin") {
          const response = await axios.get(APIURL + "course/all", {
            withCredentials: true,
          });
          //console.log(response.data)
          setAllCourses(response.data);
        }
      } catch (error) {
        console.error("Fetch courses error", error);
      }
      setLoading(false);
    }

    getAllCourses();
  }, [allCoursesChanged]); // Include userInfo as a dependency to re-fetch when it changes

  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    // Check if the user confirmed the deletion
    if (isConfirmed) {
      try {
        const deleteCourse = await axios.delete(
          APIURL + `admin/course/delete/${id}`,
          { withCredentials: true }
        );
        if (!deleteCourse.error) {
          // User confirmed and deletion was successful
          setAllCoursesChanged(!allCoursesChanged);
        }
      } catch (error) {
        console.error("Unable to delete course");
      }
    } else {
      // User cancelled the deletion, no action needed
      console.log("User cancelled the deletion.");
    }
  };

  const handleEdit = (course) => {
    setCourseToEdit(course)
    setEditCourse(true)
  };

  const handleContentClick = (event) => {
    // Prevent the click event from propagating to the modal background
    event.stopPropagation();
  };

  const handleClose = () => {
    setLoading(false);
    close();
  };

  // Check if allUsers is defined and not an empty array
  if (!Array.isArray(allCourses) || allCourses.length === 0) {
    return loading ? (
      <Spinner className="spinner-listcourses" />
    ) : (
      <div className="all-courses-list-modal" onClick={handleClose}>
        <div className="no-data-container">
          <div className="no-data-title" onClick={handleContentClick}>
            <h3>Courses</h3>
            <hr />
          </div>
          <p onClick={handleContentClick}>No data to display</p>

          <button className="no-data-button-close" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const tableHeadersFull = Object.keys(allCourses[0]);
  const filtros = ["deletedAt", "createdAt", "updatedAt"];
  const tableHeaders = tableHeadersFull.filter((key) => !filtros.includes(key));

  return loading ? (
    <Spinner className="spinner-listcourses" />
  ) : !editCourse ? (
    <div className="all-courses-list-modal" onClick={handleClose}>
      <div className="all-courses-list-container">
        <table
          className="all-courses-list-content"
          onClick={handleContentClick}
        >
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map(
              (
                course // Map through the 'courses' array
              ) => (
                <tr key={course.id}>
                  {tableHeaders.map((header) => (
                    <td key={header}>
                      {header === "teachers"
                        ? course[header].map((element) => {
                            return element.last_name+' ';
                          })
                        : header === "start_date" || header === "finish_date"
                        ? (course[header] ? new Date(course[header]).toLocaleDateString() : "none")
                        : header === 'active' ? (course[header] === true ? 'Yes' : "No") 
                        : course[header]}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(course)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(course.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button className="button-close-listcourses" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  ) : <EditCourse close={()=>setEditCourse(false)} course={courseToEdit} change={()=>setAllCoursesChanged(!allCoursesChanged)} />;
};

export default ListCourses;
