import React, { useState } from 'react'
import { FaRegFileWord } from "react-icons/fa";
import axios from 'axios'

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState('')
  const [downloadError, setDownloadError] = useState('')

const refresh = () => {
  location.reload();
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setConvert('Please Select a file');
      return;
    }
    const formData = new FormData()
    formData.append("file", selectedFile)
    try {
      const response = await axios.post("http://localhost:3000/convertFile", formData, {
        responseType: "blob",
      });

      
      const url = window.URL.createObjectURL(new Blob([response.data]))
     


      const link = document.createElement("a")


      
      link.href = url;

      console.log(link.href)
      link.setAttribute("download", selectedFile.name.replace(/\.[^/.]=$/, "") + ".pdf")
      

      document.body.appendChild(link)
      
      link.click()
      link.parentNode.removeChild(link)
      setSelectedFile(null)
      setDownloadError("")
      setConvert('File Converted Successfully')
    } catch (error) {
    
      if (error.response && error.response.status == 400) {
        setDownloadError("Error converting the file");
      }
      else {

        setConvert("")
      }
    }

  }

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    setSelectedFile(e.target.files[0])
  }
  return (
    <div className='max-w-screen-2xl mx-auto container px-6 md:px-40'>
      <div className=' flex h-screen items-center justify-center'>
        <div className=' border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-blue-600 rounded-lg shadow-lg'>
          <h1 className=' text-3xl text-center mb-4 font-bold'>Convert Word to PDF online</h1>
          <p className=' text-xl text-center mb-4'>Convert any docx file into pdf online without any software download.</p>

          <div className=' flex flex-col items-center space-y-4'>
            <input onChange={handleFileChange} type="file" accept='.docx' className=' hidden' id='fileInput' />

            <label htmlFor="fileInput" className=' hover:text-white w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 shadow-lg cursor-pointer border-blue-300 rounded-lg hover:bg-blue-600 gap-1
            '>
              <FaRegFileWord className=' text-3xl' />

              <span className=' text-3xl m-2'>{selectedFile ? selectedFile.name : "Choose File"}</span>
            </label>

            <button onClick={handleSubmit} disabled={!selectedFile} className=' px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold font-sans disabled:pointer-events-none disabled:bg-gray-400'>Convert File</button>
            {convert ?
  <div className=' text-center'>
              <p className=' text-green-500'>{convert}</p>
              <button onClick={refresh} className=' text-blue-600 text-base'>Convert again?</button>
              </div>
              :
              <p className=' text-red-500'>{downloadError}</p>
            }
          </div>

        </div>
      </div>
    </div>
  )
}
