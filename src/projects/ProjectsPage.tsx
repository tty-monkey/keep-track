import ProjectList from "./ProjectList"
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProjects } from './projectHooks.ts'

export default function ProjectsPage() {
  const {
    data,
    isLoading,
    error,
    isError,
    page,
    setPage,
    isPreviousData,
  } = useProjects()

  return (
    <>
      {data ? (
       <>
         <ProjectList projects={data}/>
         <div className="col-sm-4">Current page: {page + 1}</div>
         { page == 0 ? (
           <button
             className="py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-80 opacity-60 cursor-not-allowed"
           >
             Previous
           </button>
         ) : (
           <button
             className="py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-80"
             onClick={() => setPage((oldPage) => oldPage - 1)}
           >
             Previous
           </button>
         )}
         { data.length != 9 ? (
           <button
             className="py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-80 opacity-60 cursor-not-allowed"
           >
             Next
           </button>
         ) : (
           <button
             className="py-2.5 px-5 mt-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-80"
             onClick={() => {
               if (!isPreviousData) {
                 setPage((oldPage) => oldPage + 1)
               }}
             }
             disabled={data.length != 9}
           >
             Next
           </button>
         )}
       </>
      ) : isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <FontAwesomeIcon icon={faSync} spin className="mr-2" />
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-10" role="alert">
          {error.message}
        </div>
        ) : null}
    </>
  )
}
