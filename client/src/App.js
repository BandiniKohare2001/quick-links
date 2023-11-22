import React, { useState } from 'react';
import './App.css';
import copyicon from './copyicon.png';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");


  // const generateLink = async () => {
  //   try {
  //     const response = await axios.post('/link', { 
  //       url, 
  //       slug 
  //     });
  
  //     setShortUrl(response?.data?.data?.shortUrl);
  //   } catch (error) {
  //     console.error("Error generating link:", error);
  //   }
  // }
  const  generateLink = async () => {
    const response = await axios.post('/link', {
      url,
      slug
    })

    setShortUrl(response?.data?.data?.shortUrl)
  }

  const copyShorturl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("URL copied");
  }


  return (
    <>
      <h1 className='text-center main-heading'><span className='colour-dark'>QUicK</span>LiNkS</h1>
      <div className='app-container'>
        <div className='link-generation-card'>
          <h2 >Link Generation</h2>
          <input
            type='text'
            placeholder='URL'
            className='url-input'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type='text'
            placeholder='Slug (optional)'
            className='url-input'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <div className='shorturl-container'>
            <input
              type='text'
              placeholder='Short URL'
              className='short-url-input'
              value={shortUrl}
              disabled
            />
            <img src={copyicon} onClick={copyShorturl} className='coyp-icon' alt='Copy Icon' />
          </div>
          <button className='btn url-input' onClick={generateLink}>Generate Short URL</button>
        </div>
        <div>

        <h2>All Links</h2>
      
        </div>
      </div>
    </>
  );
}

export default App;