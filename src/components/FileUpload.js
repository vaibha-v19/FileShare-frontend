import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './FileUpload.css';

// Set the app element for the modal (for accessibility reasons)
Modal.setAppElement('#root');

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const response = await axios.post('https://fileshare-backend-6nvj.onrender.com/', formData);
      setLink(response.data.link);
      setLoading(false);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {loading && <img src="/loading.gif" alt="Loading..." className="loading-gif" />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Upload Success"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Upload Successful</h2>
        <p>File uploaded successfully! Shareable link:</p>
        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default FileUpload;
