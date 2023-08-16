import React from 'react';
import { FaShoppingCart, FaRegBookmark, FaFireAlt } from 'react-icons/fa';
import './CourseCard.css';
import image from '../assets/react.svg';
import { useGlobalState } from '../context';


function CourseCard({ course }) {
  const {userRole} = useGlobalState();
  return (
    <div className='courseCardContainer'>
      <div className='courseCard'>
        <img
          src={image} /* Assuming you have an 'image' prop */
          alt='Course'
          className='courseImage'
        />

        <div className='courseDetails'>
          <h2 className='courseName'>{course.course_name}</h2>
          <div className='courseModalityDuration'>
            <p className='courseModality'>{course.modality}</p>
            <p className='courseDuration'>{course.duration}</p>
          </div>
          {/* <p className='courseDescription'>{course.description}</p> */}
          {userRole == "user" &&
          <div className='courseCard__icons'>
            <FaShoppingCart className='courseCard__cart' />
            <FaRegBookmark className='courseCard__wishlist' />
            <FaFireAlt className='courseCard__fastSelling' />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
