import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { setPagination } from '../../../state-manager/pagination/paginationSlice'

function PaginationNews() {

    const dispatch = useDispatch()
    
    const handlePageChange = (data) => {
        dispatch(setPagination({ newsPagination: data.selected + 1 }))
    }

    return (
        <>
            <div className=' flex justify-center items-end mt-8 border w-full h-min border-gray-700'>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={10}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="flex items-center justify-center space-x-2"
                    pageClassName="px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
                    nextClassName="px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
                    disabledClassName="bg-gray-200 cursor-not-allowed"
                />
            </div>
        </>
    )
}

export default PaginationNews