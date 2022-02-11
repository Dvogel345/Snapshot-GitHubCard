import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  // grabbing name off of profile
  const [gitHubName, setGitHubName] = useState('')     
  // grabbing the url of account
  const [gitHubURL, setGitHubURL] = useState('')   
  // For Bonus grabbing an avatar img
  const [gitHubImageURL, setGitHubImageURL] = useState('')              
  // grabbing bio from the profile page
  const [gitHubBio, setGitHubBio] = useState('')

  useEffect(() => {
      fetch('https://api.github.com/users/dvogel345')
      .then(res => res.json())
      .then(data => {
        setGitHubName(data.name)
        setGitHubURL(data.html_url)
        setGitHubImageURL(data.avatar_url)
        setGitHubBio(data.bio)
      })
  }, [])

  return (
    <div className="App">
      <div>
        <h1>Github Profile Info:</h1>
        <h2>{gitHubName}</h2>
        <a href={gitHubURL}><button>Link to GitHub profile</button></a>
      </div>
      {/* For Bonus */}
      <div className="pt-5">
        <img src={gitHubImageURL} alt='Github profile image' width='200' height='200'/>
        <p>{gitHubBio}</p>
      </div>
    </div>
  );
}

export default App
