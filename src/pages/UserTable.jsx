import { useContext, useEffect, useState } from "react"
import { Context } from "../context"

export const UserTable = () => {

    const { loggedIn } = useContext(Context)
    const [days, setDays] = useState([])
    const [subjects, setSubjects] = useState([])
    const [places,setPlaces] = useState([])

    useEffect(()=>{
        if(loggedIn.Class === '2 DVM IPD'){
            fetch('https://api.apispreadsheets.com/data/T0yJOjeOXzs7ddkv/')
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                const tableData = data.data
                
                for(let day of tableData){ 
                    setDays([...days,day.Day])
                    setSubjects([...subjects,day.Subjects.split(',')])
                    setPlaces([...places,day.Places.split(',')])
                    console.log(day);
                }
            })
        }
    },[loggedIn])

    return (
        <div className="flex justify-center items-center h-screen flex-col gap-2">
            <h1 className="text-3xl mb-5">Table</h1>
            <table>
                <tbody className="">
                    {days.length > 0 && days.map((day,i) => {
                        return (
                            <tr className="flex" key={i}>
                                <td className="flex items-center justify-center p-2 bg-slate-600 text-white">{day}</td>
                                {subjects[i].length > 0 && subjects[i].map((subject,j)=>{
                                    return (
                                        <td className="flex flex-col" key={j}>
                                            <span className="p-1">{subject}</span>
                                            <span className="bg-zinc-300 p-1">{places[i][j]}</span>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}