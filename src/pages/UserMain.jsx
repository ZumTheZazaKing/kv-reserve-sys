import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Context } from "../context"
import { useContext } from "react"

export const UserMain = () => {

    const navigate = useNavigate()
    const { loggedIn, setLoggedIn } = useContext(Context)

    useEffect(()=>{
        if(!loggedIn)return navigate('/')
    },[loggedIn])

    const logout = () => {
        setLoggedIn(false)
        localStorage.removeItem('loggedIn')
    }

    const goToUserTable = () => {
        navigate('/usertable')
    }

    return (
        <div className="p-4 flex items-center justify-center h-screen flex-col gap-3">
            <h1 className="text-3xl mb-5">Welcome, {loggedIn.Username}</h1>
            <div className="bg-white p-6 rounded flex flex-col gap-2 w-10/12">
                <button onClick={goToUserTable} className="bg-blue-500  hover:bg-blue-700 rounded text-white font-bold py-2 px-4">Table</button>
                <button className="bg-blue-500  hover:bg-blue-700 rounded text-white font-bold py-2 px-4">Location</button>
                <button onClick={logout} className="bg-red-500 mt-3  hover:bg-red-700 rounded text-white font-bold py-2 px-4">Logout</button>
            </div>
        </div>
    )
}