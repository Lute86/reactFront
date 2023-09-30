import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateCourse.css";
import { useGlobalState } from "../../context";
import Spinner from "../../components/Spinner";
import axios from "axios";

const CreateCourse = ({close}) => {
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    description: "",
    modality: "",
    duration: "",
    price: 0,
    active: true,
    start_date: null,
    finish_date: null,
    type: "",
  });

  const [teacherList, setTeacherList] = useState([])
  const [teacherId, setTeacherId] = useState("");
  const [successMsg, setSuccessMsg] = useState(false)
  const [failedInput, setFailedInput] = useState(new Set());
  const navigate = useNavigate();
  const {
    APIURL,
    loginError,
    setLoginError,
    serverDown,
    setServerDown,
    loading,
    setLoading,
  } = useGlobalState();
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  async function getTeachersList(){
    try {
      const response = await axios.get(APIURL+`admin/teacher/all`, {withCredentials:true})
      setTeacherList(response.data)
    } catch (error) {
      console.error('Error fetching teachers list: ', error)
    }
  }
  async function addTeachersToCourse(id){
    console.log(id)
    try {
      const response = await axios.post(
        APIURL + `admin/teacher/${teacherId}/course/${id}`,
        {},
        { withCredentials: true }
      );
      if (!response.data) throw new Error();
    } catch (error) {
      alert("Could't add teacher ");
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    getTeachersList()
    return () => {
      setLoading(false);
      setLoginError(false);
      setServerDown(false);
    };
  }, []);

  const handleCourseCreation = async () => {
    setLoading(true);
    setFailedInput([]);
    try {
      const response = await axios.post(
        APIURL + "admin/course/create",
        newCourse,
        { withCredentials: true }
      );

      if (!response.data) throw new Error();
      if(teacherId) addTeachersToCourse(response.data.id)
      setSuccessMsg(true)
      setTimeout(()=>{
        setSuccessMsg(false)
        close();
      }, 1000)
    } catch (error) {
      console.error("Registration error", error);
      setLoginError(true);

      if (
        error.response !== undefined &&
        (error.response.status === 401 || error.response.data.error)
      ) {
        console.log("Entro credentials error");
        if (error.response.data.error === "Validation error") {
          console.error("Email exists");
          setDuplicateEmail(true);
        }
      } else if (
        !error.response ||
        (error.response && error.response.status === 500)
      ) {
        console.log("Server error");
        setServerDown(true);
      } else if (
        !error.response ||
        (error.response && error.response.status === 400)
      ) {
        // error.response.data.errors.forEach(element => {
        //   console.log("Wrong credentials 400", element.msg, element.param)
        //   setFailedInput(prevFailedInput => [...prevFailedInput, element.param]);
        // })
        const paramValues = error.response.data.errors;
        paramValues.map((element) => {
          console.log("Wrong credentials 400", element.msg, element.param);
          setFailedInput((prev) => new Set([...prev, element.param]));
        });
      }
      setLoading(false);
    }
  };

  const handleInputs = (value) => {
    let valueInput = false;
    failedInput.forEach((element) => {
      if (element === value) {
        valueInput = true;
      }
    });
    return valueInput;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  return (
    <div className="course-creation-container">
      {!successMsg && <div className="course-creation-form">
        <h1>New Course</h1>
        <div>
          <label htmlFor="courseName" className={`${handleInputs("course_name") ? "label-fail" : ""}`}>Course Name:</label>
          <input
            id="courseName"
            type="text"
            name="course_name"
            value={newCourse.course_name}
            onChange={handleInputChange}
            placeholder="Course Name"
          />
        </div>
        <div>
          <label htmlFor="description" className={`${handleInputs("description") ? "label-fail" : ""}`}>Description:</label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            maxLength={255}
          />
        </div>
        <div>
          <label htmlFor="modality" className={`${handleInputs("modality") ? "label-fail" : ""}`}>Modality:</label>
          <select
            id="modality"
            name="modality"
            value={newCourse.modality}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration" className={`${handleInputs("duration") ? "label-fail" : ""}`}>Duration:</label>
          <input
            id="duration"
            type="text"
            name="duration"
            value={newCourse.duration}
            onChange={handleInputChange}
            placeholder="e.g., 12 weeks, 3 months, etc."
          />
        </div>
        <div>
          <label htmlFor="price" className={`${handleInputs("price") ? "label-fail" : ""}`}>Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={newCourse.price}
            onChange={handleInputChange}
            placeholder="Course Price"
          />
        </div>
        <div>
          <label htmlFor="startDate" className={`${handleInputs("start_date") ? "label-fail" : ""}`}>Start Date:</label>
          <input
            id="startDate"
            type="date"
            name="start_date"
            value={newCourse.start_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="finishDate" className={`${handleInputs("finish_date") ? "label-fail" : ""}`}>Finish Date:</label>
          <input
            id="finishDate"
            type="date"
            name="finish_date"
            value={newCourse.finish_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="type" className={`${handleInputs("type") ? "label-fail" : ""}`}>Type:</label>
          <select
            id="type"
            name="type"
            value={newCourse.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="course">Course</option>
            <option value="career">Career</option>
            <option value="training">Training</option>
          </select>
        </div>
        <div>
          <label htmlFor="teacherId">Teacher ID:</label>
          <select
            id="teacherId"
            name="teacherId"
            value={teacherId}
            onChange={(e)=>setTeacherId(e.target.value)}
          >
            <option key={0} value={null}>Not assigned</option>
            {teacherList.map(teacher=>{
              return <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
            })}
          </select>
        </div>

        <p className={loginError ? "p-login-error" : "p-login"}>
          {serverDown ? "Server down" : `"Wrong insertions"`}
        </p>
        <button onClick={handleCourseCreation}>
          {!loading ? "Create" : <Spinner />}
        </button>
        <button onClick={()=>close()}>
          Close
        </button>
      </div>}
      {successMsg && <div className="successful-creation">Successful creation</div>}
    </div>
  );
};

export default CreateCourse;
