import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useProjects } from "../../hooks/projectHooks"
import ProjectList from "./ProjectList"

export default function ProjectsPage() {
  const { data, isLoading, error, isError, page, setPage, isPreviousData } = useProjects()

  return (
    <>
      {data ? (
        <>
          <ProjectList projects={data} />
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">Current page: {page + 1}</p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              {page === 0 ? (
                <button className="relative ml-3 inline-flex cursor-not-allowed items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-60 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                  Previous
                </button>
              ) : (
                <button
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                >
                  Previous
                </button>
              )}
              {data.length !== 9 ? (
                <button className="relative ml-3 inline-flex cursor-not-allowed items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-60 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                  Next
                </button>
              ) : (
                <button
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                  onClick={() => {
                    if (!isPreviousData) {
                      setPage((oldPage) => oldPage + 1)
                    }
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </nav>
        </>
      ) : isLoading ? (
        <div className="mt-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faSync} spin className="mr-2" />
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div
          className="mb-4 mt-10 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error.message}
        </div>
      ) : null}
    </>
  )
}
