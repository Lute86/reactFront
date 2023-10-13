import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalState } from '../context';
import './UploadImage.css'
import Spinner from './Spinner';

const ImageUploadForm = ({close}) => {
  const [file, setFile] = useState(null);
  const {APIURL, setLoading, loading} = useGlobalState()

  useEffect(()=>{
    setLoading(false)
  },[])


  const handleClose = () => {
    close()
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(APIURL+'admin/upload', formData, {
        withCredentials:true,
      });

      console.log('Image uploaded successfully');
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='upload-container' onClick={(e)=>e.stopPropagation()}>
      <h2>Upload Image</h2>
      <hr />
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{loading ? <Spinner/>:'Upload'}</button>
      </form>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default ImageUploadForm;
