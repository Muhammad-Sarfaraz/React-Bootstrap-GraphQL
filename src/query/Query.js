// const githubQuery = {
//       query: `
//       {
//         viewer {
//           login
//         }
//       }`
//     }

// export default githubQuery;

// const githubQuery = {
//     query: `
//     {
//       viewer {
//         name
//         repositories(first:10){
//             nodes{
//                 name
//                 description
//                 id
//                 url
//             }
//         }
//       }
//     }`
//   }

// export default githubQuery;

// const githubQuery = {
//     query: `
//     {
//       viewer {
//         name
//       }
//       search(query:"user:Muhammad-Sarfaraz sort:updated-desc",type:REPOSITORY,first:10){
//           nodes{
//               ... on Repository{
//                   name
//                   description
//                   id
//                   url
//               }
//           }
//       }
//     }`
//   }

// export default githubQuery;

// const githubQuery = {
//     query: `
//     {
//       viewer {
//         name
//       }
//       search(query:"user:Muhammad-Sarfaraz sort:updated-desc",type:REPOSITORY,first:20){
//           nodes{
//               ... on Repository{
//                   name
//                   description
//                   id
//                   url
//                   viewerSubscription
//                   licenseInfo{
//                       spdxId
//                   }
//               }
//           }
//       }

//     }`
//   }

// export default githubQuery;

// const githubQuery = (pageCount, queryString) => {
//   return {
//     query: `
//     {
//       viewer {
//         name
//       }
//       search(query: "${queryString}user:Muhammad-Sarfaraz sort:updated-desc",type:REPOSITORY,first:${pageCount}){
//         repositoryCount
//         nodes{
//               ... on Repository{
//                   name
//                   description
//                   id
//                   url
//                   viewerSubscription
//                   licenseInfo{
//                       spdxId
//                   }
//               }
//           }
//       }

//     }`
//   }
// }

// export default githubQuery

// pagination
const githubQuery = (
  pageCount,
  queryString,
  paginationKeyword,
  paginationString,
  githubUserName
) => {
  return {
    query: `
    {
      viewer {
        name
      }
      search(query: "${queryString} user:${githubUserName} sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              viewerSubscription
              licenseInfo {
                spdxId
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
  };
};

export default githubQuery;