import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useGlobalState } from "../context";
import "./SingleCourse.css";

function SingleCourse({ id }) {
  const { serverDown, setServerDown, userInfo } = useGlobalState();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCourse = async () => {
    try {
      const response = await axios.get("http://localhost:4001/course/" + id);
      setCourse(response.data[0]);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch courses error", error);
      setServerDown(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCourse();
  }, []);

  return (
    <>
      {course != null ? (
        <div className="single-course-container">
          <h3>{course.course_name}</h3>
          <p>{course.description}</p>
          {course.teachers.length > 0 && (
            <p className="teacher">
              {course.teachers.length>1?"Teachers":"Teacher"}: {course.teachers.map((item, index)=>{
                const {first_name, last_name} = item
                return <p key={index}>{`${first_name} ${last_name}`}</p>;
              })}
            </p>
          )}
          {/* {userInfo && userInfo.role != 'admin' && !userInfo.subscribed && <button>Subscribe</button>} */}
        </div>
      ) : loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : serverDown ? (
        <p className="server-down">
          Ups...server seems unreachable at the moment
        </p>
      ) : (
        <p className="magic-message">Course disappeared like magic</p>
      )}
    </>
  );
}

export default SingleCourse;
