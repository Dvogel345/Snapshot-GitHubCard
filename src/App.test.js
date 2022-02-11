import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import renderer from 'react-test-renderer'

beforeEach(() => {
  // sets everything back to initial state after each test
  fetch.resetMocks();
})

test('renders a snapshot', () => {
  const tree = renderer.create(<App/>).toJSON()
  expect(tree).toMatchSnapshot()
})

// describe is a jest method that contains one or more related tests.
describe('receives values from GitHub REST API using jest fetch mock', () => {
  test("receives GitHub name", async () => {
    fetch.mockResponseOnce(JSON.stringify({name: 'Derek Vogel'}))
    render(<App />)
    const gitHubName = await waitFor(() => screen.getByRole('heading', { level: 2 }))
    expect(gitHubName).toHaveTextContent('Derek Vogel')
  })

  test("receives GitHub URL", async () => {
    fetch.mockResponseOnce(JSON.stringify({html_url: 'https://github.com/dvogel345'}))
    render(<App />)
    const gitHubURL = await waitFor(() => screen.getByRole('link'))
    expect(gitHubURL).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  // For Bonus
  // grabbing image from profile
  test("receives GitHub Image URL", async () => {
    fetch.mockResponseOnce(JSON.stringify({avatar_url: 'https://avatars.githubusercontent.com/u/78238679?v=4'}))
    render(<App />)
    const gitHubURL = await waitFor(() => screen.getByAltText('Github profile image'))
    expect(gitHubURL).toHaveAttribute('src', expect.stringContaining('githubusercontent'))
  })

  // grabbing bio from the profile
  test("recives GitHub Bio from profile", async () => {
    fetch.mockResponseOnce(JSON.stringify({bio: "Student with Thrive DX partnered with NJIT, Remote\r\nFull-Stack Web Developer Bootcamp"}))
    render(<App />)
    const gitHubBio = await waitFor(() => screen.getAllByRole('p'))
    expect(gitHubBio).toHaveTextContent("Student with Thrive DX partnered with NJIT, Remote\r\nFull-Stack Web Developer Bootcamp")
  })
})

