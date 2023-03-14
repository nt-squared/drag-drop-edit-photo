import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import './App.css';
import EditSection from "./EditSection";

function App() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) =>
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }))), [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  })

  const images = files.map(file => {
    return <img key={file.path} src={file.preview} alt="" onLoad={() => URL.revokeObjectURL(file.preview)} />
  })

  const removeFiles = () => setFiles([]);

  return (
    <div className="wrapper">
      <div className="dnd-container">
        <div className="dropzone-box">
          <div  {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          {(files.length) ? <button className="clear-button" onClick={() => removeFiles()}>Clear</button> : null}
        </div>
        {(files.length) ?
          <EditSection children={images} />
          : null}
      </div>
    </div>
  );
}

export default App;
