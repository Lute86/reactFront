import React from "react";
import { FaShoppingCart, FaRegBookmark, FaFireAlt } from "react-icons/fa";
import "./CourseCard.css";
import image from "../assets/react.svg";
import { useGlobalState } from "../context";
import axios from "axios";

function CourseCard({ course, onClick }) {
  const { userRole, userInfo } = useGlobalState();

  const addCourse = async (userInfo, id) => {
    console.log(userInfo.id);
    console.log(id);
    try {
      const response = await axios.post(
        `http://localhost:4001/user/${userInfo.id}/addCourse/${id}`,{},
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Add course error", error.message);
    }
    console.log();
  };

  return (
    <div className="courseCardContainer">
      <div className="courseCard">
        <img
          src={image} /* Assuming you have an 'image' prop */
          alt="Course"
          className="courseImage"
          onClick={onClick}
        />

        <div className="courseDetails">
          <h2 className="courseName" onClick={onClick}>{course.course_name}</h2>
          <div className="courseModalityDuration" onClick={onClick}>
            <p className="courseModality">{course.modality}</p>
            <p className="courseDuration">{course.duration}</p>
          </div>
          {userRole == "user" && (
            <div className="courseCard__icons">
              <FaRegBookmark
                className="courseCard__wishlist"
                onClick={() => addCourse(userInfo, course.id)}
              />
              <FaFireAlt className="courseCard__fastSelling" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
