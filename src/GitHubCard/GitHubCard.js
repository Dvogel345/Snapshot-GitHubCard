import React from "react"
import Card from "react-bootstrap/Card"
import { useEffect, useState } from 'react'

function GitHubCard() {
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
      <div className='card'>
      <Card style={{ width: "18rem"}}>
        <Card.Img variant="top" src={gitHubImageURL} alt='Github profile avatar' width='200' height='200'/>
        <Card.Body>
            <Card.Title>{gitHubName}</Card.Title>
            <Card.Text>
            {gitHubBio}
            <br></br>
            <a href={gitHubURL}><button>Link to GitHub profile</button></a>
            </Card.Text>
        </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default GitHubCard;