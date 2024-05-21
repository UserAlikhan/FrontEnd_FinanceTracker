import { ChevronFirst, ChevronLast, LogOut } from 'lucide-react'
import React, { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compressSelectPanel, expandSelectPanel } from '../../../state-manager/selectPanel/selectPanelSlice'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logOutSlicer } from '../../../state-manager/users/usersSlice'

function AssetTypesSelectPanelHomePage({ children, mainPageComponent }) {
    const dispatch = useDispatch()

    const assetTypes = useSelector(state => state.assetTypes)
    const user = useSelector(state => state.users)
    const { expanded } = useSelector(state => state.selectPanel)
    
    const handleLogOut = () => {
        Cookies.remove('access_token')
        dispatch(logOutSlicer())
    }

    return (
        <>
            <div className='flex flex-row'>
                <aside className="h-screen">
                    <nav className={`h-full flex flex-col bg-white border-r shadow-sm ${
                        expanded ? "w-max" : "w-min"
                    }`}>
                        <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all ${
                            expanded ? "w-32" : "w-0"
                            }`}
                            alt=""
                        />
                        <button 
                            onClick={() => expanded 
                                    ? dispatch(compressSelectPanel())
                                    : dispatch(expandSelectPanel())
                                }
                                className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
                            >
                                {expanded? <ChevronFirst /> : <ChevronLast />}
                            </button>
                        </div>
                
                        <ul className={`flex-1 px-3`}>{children}</ul>
                        
                        { user.usersInfo  ? (
                             <div className="border-t flex p-3">
                                <img
                                    src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                                    alt=""
                                    className="w-10 h-10 rounded-md"
                                />
                                <div
                                    className={`
                                    flex justify-between items-center
                                    overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                                `}
                                >
                                    <div className="leading-4">
                                        <h4 className="font-semibold">{user.usersInfo.username}</h4>
                                        <span className="text-xs text-gray-600">{user.usersInfo.email}</span>
                                    </div>
                                    <LogOut className=' cursor-pointer' size={20} onClick={handleLogOut}/>
                                </div>
                            </div>
                        ) : (
                            <div className="border-t flex p-3 justify-center items-center">
                                <h2 className=' text-xl text-gray-500 font-normal cursor-pointer'>
                                    <Link to={'/login'}>
                                        Sign In
                                    </Link>
                                </h2>
                            </div>
                        )}
                    </nav>
                </aside>
                
                <div className='flex flex-row justify-between px-7 py-7 relative bg-gray-200 w-full h-full'>
                    {mainPageComponent && mainPageComponent}
                </div>
            </div>
        </>
    )
}

export default AssetTypesSelectPanelHomePage