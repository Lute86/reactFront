import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaRegBookmark, FaFireAlt, FaBookmark } from "react-icons/fa";
import "./CourseCard.css";
import image from "../assets/react.svg";
import { useGlobalState } from "../context";
import axios from "axios";

function CourseCard({ course, onClick }) {
  const { userRole, userInfo, pingUser} = useGlobalState();
  const [blackReg, setBlackReg] = useState(false)

  const image = [
      {img:'src/assets/courses/programming.png', alt:'programming'},
      {img:'src/assets/courses/career.png', alt:'career'},
      {img:'src/assets/courses/training.png', alt:'training'},
      {img:'src/assets/courses/courses.png', alt:'course'},
    ]

  function handleImage(type){
    if(type=='career') return image[1].img;
    else if(type=='training') return image[2].img;
    else if(type=='course') return image[3].img;
    else return image[0].img
  }

  const addCourse = async (userInfo, id) => {
    // console.log(userInfo.id);
    // console.log(id);
    try {
      const response = await axios.post(
        `http://localhost:4001/user/${userInfo.id}/addCourse/${id}`,{},
        { withCredentials: true }
      );
      //console.log(response.data);
      alert('Course added successfully')
    } catch (error) {
      console.error("Add course error", error.message);
    }
    console.log();
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
          <h2 className="courseName" onClick={onClick}>{course.course_name}</h2>
          <div className="courseModalityDuration" onClick={onClick}>
            <p className="courseModality">{course.modality}</p>
            <p className="courseDuration">{course.duration}</p>
          </div>
          {userRole == "user" && (
            <div className="courseCard__icons">
              {!blackReg ? userInfo.subscribed && (<FaRegBookmark
                className="courseCard__wishlist"
                onClick={() => {
                  pingUser();
                  addCourse(userInfo, course.id)
                }}
                onMouseOver={()=>setBlackReg(true)}
              />) : userInfo.subscribed && (<FaBookmark
                className="courseCard__wishlist"
                onClick={() => {
                  pingUser();
                  addCourse(userInfo, course.id)
                }}
                onMouseOut={()=>setBlackReg(false)}
              />)}
              <FaFireAlt className="courseCard__fastSelling" />
            </div>
          )}
          {/* {userRole == "admin" && (
            <div className="courseCard__icons">
              <FaRegBookmark
                className="courseCard__wishlist"
                onClick={() => {
                  pingUser();
                  addCourse(userInfo, course.id)
                }}
              />
              <FaFireAlt className="courseCard__fastSelling" />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
