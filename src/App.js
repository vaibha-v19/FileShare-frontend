import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="file-upload-container">
        <h1>File Share App</h1>
        <FileUpload />
      </div>
    </div>
  );
};

export default App;
