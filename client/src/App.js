// import React, { useState } from 'react';
// import './App.css';
// import copyicon from './copyicon.png';
// import axios from 'axios';

// function App() {
//   const [url, setUrl] = useState("");
//   const [slug, setSlug] = useState("");
//   const [shortUrl, setShortUrl] = useState("");


//   // const generateLink = async () => {
//   //   try {
//   //     const response = await axios.post('/link', { 
//   //       url, 
//   //       slug 
//   //     });
  
//   //     setShortUrl(response?.data?.data?.shortUrl);
//   //   } catch (error) {
//   //     console.error("Error generating link:", error);
//   //   }
//   // }
//   const  generateLink = async () => {
//     const response = await axios.post('/link', {
//       url,
//       slug
//     })

//     setShortUrl(response?.data?.data?.shortUrl)
//   }

//   const copyShorturl = () => {
//     navigator.clipboard.writeText(shortUrl);
//     alert("URL copied");
//   }


//   return (
//     <>
//       <h1 className='text-center main-heading'><span className='colour-dark'>QUicK</span>LiNkS</h1>
//       <div className='app-container'>
//         <div className='link-generation-card'>
//           <h2 >Link Generation</h2>
//           {/* <input
//             type='text'
//             placeholder='URL'
//             className='url-input'
//             value={url}
//             onChange={(e) => {
//               setUrl(e.target.value)
//             }}
//           />
//           <input
//             type='text'
//             placeholder='Slug (optional)'
//             className='url-input'
//             value={slug}
//             onChange={(e) => {
//               setSlug(e.target.value)
//             }}
//           />
//           <div className='shorturl-container'>
//             <input
//               type='text'
//               placeholder='Short URL'
//               className='short-url-input'
//               value={shortUrl}
//               disabled
//             /> */}
//             <input
//             type='text'
//             placeholder='URL'
//             className='user-input'
//             value={url}
//             onChange={(e) => {
//               setUrl(e.target.value)
//             }} />

//           <input
//             type='text'
//             placeholder='Slug (optional)'
//             className='user-input'
//             value={slug}
//             onChange={(e) => {
//               setSlug(e.target.value)
//             }} />

//           <div className='short-url-container'>
//             <input
//               type='text'
//               placeholder='Short URL'
//               className='input-short-url'
//               value={shortUrl}
//               disabled />
//             <img src={copyicon}
//                   alt="copy"
//                   className="copy-icon"
//                   onClick={copyShorturl}
//                   />
         
//             {/* <img src={copyicon} onClick={copyShorturl} className='coyp-icon' alt='Copy Icon' /> */}
//           </div>
//           <button className='btn url-input' onClick={generateLink}>Generate Short URL</button>
//         </div>
//         <div>

//         <h2>All Links</h2>
      
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import copyImg from './copyicon.png'

function App() {
  const [url, setUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [links, setLinks] = useState([])

  const generateLink = async () => {
    const response = await axios.post('/link', {
      url,
      slug
    })
    setShortUrl(response?.data?.data?.shortUrl)
  }

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!')
  }

  const loadLinks = async () => {
    const response = await axios.get('/api/links');
    setLinks(response?.data?.data)
  }

  useEffect(() => {
    loadLinks();
  }, [])

  return (
    <div>
       <h1 className='text-center main-heading'><span className='colour-dark'>QUicK</span>LiNkS</h1>

      <div className='app-container'>
      <div className='link-generation-card'>
        <h2 >Link Generation</h2>
          <input type='text'
            placeholder='URL'
            className='url-input'
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />

          <input
            type='text'
            placeholder='Slug(optional)'
            className='url-input'
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
            }}
          />

         <div className='short-url-container'>
            <input
              type='text'
              placeholder='Short URL'
              className='short-url-input'
              value={shortUrl}
              disabled />

            <img
              src={copyImg}
              alt='copy'
              className='coyp-icon'
              onClick={copyShortUrl}
            />

          </div>

          <button
            type='button'
            className='btn url-input'
            onClick={generateLink}>
            Generate Quick Link
          </button>
        </div>

        <div className='all-links-container'>
     
          {
            links?.map((linksObj, index)=>{
              const {url, slug, clicks} = linksObj;

              return(
               
                <div className='link-card'>
                  <p>
                    <span className='link-text'>
                      URL : </span>
                    <span className='text-url'> {url}</span>
                  </p>
                  <p>
                    <span className='link-text'>
                      Slug : </span>   

                       <span className='text-url'> 
                       {process.env.REACT_APP_BASE_URL}/{slug}
                    
                    </span>
                   
                  </p>
                  <p>
                    <span className='link-text'>Clicks : </span>
                    <span className='text-url'>{clicks}</span></p>
                  </div>
              )
            })
          }
        </div>
       
      </div>
    </div>
    
  )
}

export default App