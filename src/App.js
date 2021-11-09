import github from './auth.js'
import { useEffect, useState, useCallback } from 'react'
import githubQuery from './query/Query'
import RepoInfo from './components/RepoInfo.js'
import SearchBox from './components/searchBox.js'
import NavButtons from './components/NavButton.js'

function App () {
  let [userName, setName] = useState('')
  let [repoList, setrepoList] = useState('')
  let [pageCount, setPageCount] = useState('10')
  let [queryString, setQueryString] = useState('')
  let [totalCount, setTotalCount] = useState(null)

  let [startCursor, setStartCursor] = useState(null)
  let [endCursor, setEndCursor] = useState(null)
  let [hasPreviousPage, setHasPreviousPage] = useState(false)
  let [hasNextPage, setHasNextPage] = useState(true)
  let [paginationKeyword, setPaginationKeyword] = useState('first')
  let [paginationString, setPaginationString] = useState('')

  // github user name
  let [githubUserName,setGithubUserName]=useState('');
  

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      githubQuery(pageCount, queryString, paginationKeyword, paginationString,githubUserName)
    )

    //callback memo hooks for one time excution
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText
    })
      .then(response => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;

        setTotalCount(total);
        setName(viewer.name);
        setrepoList(repos);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [pageCount, queryString, paginationString, paginationKeyword,githubUserName])

  useEffect(() => {
    fetchData();
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
          githubUserName={githubUserName}
          onGithubUserNameChange={(userName)=>{
            setGithubUserName(userName);
          }}
          onTotalChange={(myNumber) => {
            setPageCount(myNumber)
          }}
          onQueryChange={(myString) => {
            setQueryString(myString)
          }}
        />

        <NavButtons
          start={startCursor}
          end={endCursor}
          next={hasNextPage}
          previous={hasPreviousPage}
          onPage={(myKeyword, myString) => {
            setPaginationKeyword(myKeyword)
            setPaginationString(myString)
          }}
        />

        {/* <p>
          <b>Search for :</b> {queryString} | <b>Item per page:</b> {pageCount}{' '}
          | <b>Total results:</b> {totalCount}
        </p> */}

        {repoList && (
          <ul className='list-group list-group-flush'>
            {repoList.map(repo => {
              return <RepoInfo key={repo.node.id} repo={repo.node} />
            })}
          </ul>
        )}
      </h1>
    </div>
  )
}

export default App
