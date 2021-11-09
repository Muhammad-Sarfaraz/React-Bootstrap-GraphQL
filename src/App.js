import github from './auth.js'
import { useEffect, useState, useCallback } from 'react'
import githubQuery from './query/Query'
import RepoInfo from './components/RepoInfo.js'
import SearchBox from './components/searchBox.js'

function App () {
  let [userName, setName] = useState('')
  let [repoList, setrepoList] = useState('')
  let [pageCount, setPageCount] = useState('10')
  let [queryString, setQueryString] = useState('')
  let [totalCount, setTotalCount] = useState(null)
  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString))

    //callback memo hooks for one time excution
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText
    })
      .then(response => response.json())
      .then(data => {
        const viewer = data.data.viewer
        const repos = data.data.search.nodes
        const total = data.data.search.repositoryCount
        setTotalCount(total)

        setName(viewer.name)
        setrepoList(repos)
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [pageCount, queryString])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='App container mt-5'>
      <h1 className='text-primary'>
        <i className='bi bi-diagram-2-fill'></i>
        <p>Hey there {userName}</p>

        <SearchBox
          totalCount={totalCount}
          pageCount={pageCount}
          queryString={queryString}
          onQueryChange={myString => {
            setQueryString(myString)
          }}
          onTotalChange={myNumber => {
            setPageCount(myNumber)
          }}
        />

        {/* <p>
          <b>Search for :</b> {queryString} | <b>Item per page:</b> {pageCount}{' '}
          | <b>Total results:</b> {totalCount}
        </p> */}

        {repoList && (
          <ul className='list-group list-group-flush'>
            {repoList.map(repo => {
              return <RepoInfo key={repo.id} repo={repo} />
            })}
          </ul>
        )}
      </h1>
    </div>
  )
}

export default App
