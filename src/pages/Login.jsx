import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../context"

export const Login = () => {

    const navigate = useNavigate()

    const [loginInfo,setLoginInfo] = useState({username:"",password:""})
    const [users,setUsers] = useState([])
    const [loginWarn, setLoginWarn] = useState(false)
    const { setLoggedIn } = useContext(Context)

    useEffect(()=>{
        fetch('https://api.apispreadsheets.com/data/FSPMisHjHdmrMxt2/')
        .then(res => res.json())
        .then(data => {
            setUsers(data.data)
        })
    },[])

    const login = () => {
        if(!loginInfo.username || !loginInfo.password)return setLoginWarn("Fill in all fields")
        for(let user of users){
            if(user.Username === loginInfo.username){
                if(user.Password === loginInfo.password){
                    localStorage.setItem('loggedIn',JSON.stringify(user))
                    setLoggedIn(user)
                    if(user.Rank === 'admin'){
                        navigate('/admin')
                    }else{
                        navigate('/user')
                    }
                }else{
                    return setLoginWarn('Password incorrect')
                }
            }
        }
        return setLoginWarn("Username not found")
    }

    return (
        <main className="flex items-center justify-center h-screen flex-col">
            <div className="w-11/12 sm:w-96 border bg-white p-6 rounded-md flex flex-col gap-6">
                <h1 className="text-4xl font-bold">Login</h1>
                <div className="flex flex-col gap-3">
                    <label>Username:</label>
                    <input type="text" className="p-2 bg-zinc-200" value={loginInfo.username} onChange={e=>setLoginInfo({...loginInfo,username:e.target.value})}/>
                    <label>Password:</label>
                    <input type="password" className="p-2 bg-zinc-200" value={loginInfo.password} onChange={e=>setLoginInfo({...loginInfo,password:e.target.value})}/>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={e=>{setLoginInfo({username:"",password:""});setLoginWarn(false)}} className="bg-red-500  hover:bg-red-700 rounded text-white font-bold py-2 px-4">Reset</button>
                    <button onClick={login} className="bg-blue-500  hover:bg-blue-700 rounded text-white font-bold py-2 px-4">Login</button>
                </div>
            </div>
            <div className={`p-4 text-center text-md text-red-500 ${loginWarn?'':'invisible'}`}>
                Login failed. {loginWarn}
            </div>
        </main>
    )
}