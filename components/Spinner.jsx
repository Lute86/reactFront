import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Spinner.css'

function Spinner() {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner" />
    </div>
  );
}

export default Spinner;
