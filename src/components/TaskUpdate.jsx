import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
// ICONS
import { GoDotFill } from "react-icons/go";

export default function TaskUpdate() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    // * showcase data
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        description: ""
    });
    async function handleData() {
        const request = await fetch(`http://localhost:8001/api/v1/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json();
        const formateResponse = response.message;
        setData({
            title: formateResponse.title,
            description: formateResponse.description
        })
    }
    useEffect(() => {
        handleData();
    }, [])



    // ! update details
    function handleChange(event) {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    async function handleSubmit(event) {
        try {
            setMessage("");
            event.preventDefault();
            const request = await fetch(`http://localhost:8001/api/v1/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await request.json();
            // setMessage("task updated successfully");
            navigate("/");
        }
        catch (error) {
            console.error("Something went wrong !!!", error.message);
        }
    };


    return (
        <div className='task-update p-5'>
            <form className='flex flex-nowrap items-center justify-center gap-5' onSubmit={handleSubmit}>
                <input type="text" name='title' value={data.title} onChange={handleChange} placeholder='Enter title' className='border ps-3 py-2 focus:outline-none rounded' />
                <input type="text" name='description' value={data.description} onChange={handleChange} placeholder='Enter description' className='border ps-3 py-2 focus:outline-none rounded' />
                <button type='submit' className='bg-gray-400 rounded py-2 px-5 text-white font-semibold'>Update</button>
            </form>
            {
                message !== "" &&
                <div className="flex flex-nowrap items-center gap-2 text-green-500 justify-center w-full mt-7" >
                    <GoDotFill className='' />
                    <p className='text-sm font-medium'>{message}</p>
                </div>
            }
        </div>
    )
}
