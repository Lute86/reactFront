import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaFireAlt,
  FaBookmark,
} from "react-icons/fa";
import "./CourseCard.css";
import image from "../assets/react.svg";
import { useGlobalState } from "../context";
import axios from "axios";

function CourseCard({ course, onClick, isEnrolled, setUserCourses  }) {
  const { userRole, userInfo, pingUser, APIURL } = useGlobalState();

  const image = [
    { img: "src/assets/courses/programming.png", alt: "programming" },
    { img: "src/assets/courses/career.png", alt: "career" },
    { img: "src/assets/courses/training.png", alt: "training" },
    { img: "src/assets/courses/courses.png", alt: "course" },
  ];

  function handleImage(type) {
    if (type == "career") return image[1].img;
    else if (type == "training") return image[2].img;
    else if (type == "course") return image[3].img;
    else return image[0].img;
  }

  const addCourse = async (userInfo, id) => {
    // console.log(userInfo.id);
    // console.log(id);
    try {
      const response = await axios.post(
        `${APIURL}user/${userInfo.id}/addCourse/${id}`,
        {},
        { withCredentials: true }
      );

      alert("Course added successfully");

      const update = await axios.get(`${APIURL}user/my/courses/${userInfo.id}`, {
        withCredentials: true
      });

      const updatedUserCourses = update.data;

      // Update the userCourses state with the updated array of courses
      setUserCourses(updatedUserCourses);
    } catch (error) {
      console.error("Add course error", error.message);
    }
  };

  return (
    <div className="courseCardContainer">
      <div className="courseCard">
        <img
          src={handleImage(course.type)} /* Assuming you have an 'image' prop */
          alt="Course"
          className="courseImage"
          onClick={onClick}
        />

        <div className="courseDetails">
          <h2 className="courseName" onClick={onClick}>
            {course.course_name}
          </h2>
          <div className="courseModalityDuration" onClick={onClick}>
            <p className="courseModality">{course.modality}</p>
            <p className="courseDuration">{course.duration}</p>
          </div>
          {userRole == "user" && (
            <div className="courseCard__icons">
              {!isEnrolled ? (
                // Render add to wishlist button if the course is not enrolled
                <FaRegBookmark
                  className={`courseCard__wishlist`}
                  onClick={() => {
                    pingUser();
                    addCourse(userInfo, course.id);
                  }}
                />
              ) : (
                // Render remove from wishlist button if the course is enrolled
                <FaBookmark
                  className={`courseCard__wishlist`}
                  onClick={() => {
                    pingUser();
                  }}
                />
              )}
              <FaFireAlt className="courseCard__fastSelling" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
