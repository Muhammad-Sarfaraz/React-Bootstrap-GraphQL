import github from './auth.js'
import { useEffect,useState } from 'react';


function App () {

  let [userName,setName]=useState('');

  useEffect(() => {
    const githubQuery = {
      query: `
      {
        viewer {
          login
        }
      }`
    }

    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: JSON.stringify(githubQuery)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const user=data.data.viewer.login;
        setName(user)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>
        <p>Hey there {userName}</p>
      </h1>
    </div>
  )
}

export default App
