import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ICONS
import { RxCheckCircled } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";


export default function Task() {
    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState(null);

    // showcase data
    async function fetchTask() {
        try {
            const request = await fetch("http://localhost:8001/api/v1/task/");
            const response = await request.json();
            // console.log(response.message);
            setTasks(response.message);
        }
        catch (error) {
            console.error("Something went wrong !!!", error.message);
        }
    }
    useEffect(() => {
        fetchTask();
    }, [message])


    // insert data
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    async function handleSubmit(event) {
        try {
            setMessage("");
            event.preventDefault();
            const request = await fetch("http://localhost:8001/api/v1/task/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const response = await request.json();
            setMessage("task added successfully");

            setFormData({
                title: "",
                description: ""
            })
        }
        catch (error) {
            console.error("Something went wrong !!!", error.message);
        }
    };





    // Update status
    async function updateStatus(event) {
        try {
            setMessage("");
            if (event.target.checked) {
                const request = await fetch(`http://localhost:8001/api/v1/task/${event.target.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: true
                    })
                })
                const response = await request.json();
                console.log(response);
                setMessage("status updated successfully")
            }
        }
        catch (error) {
            console.error("Something went wrong !!!", error.message);
        }
    }


    // Delete Task
    async function deleteRecord(id) {
        try {
            setMessage("");
            const request = await fetch(`http://localhost:8001/api/v1/task/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await request.json();
            setMessage("record deleted successfully")
        }
        catch (error) {
            console.error("Something went wrong !!!", error.message);
        }
    }



    return (
        <>
            <div className="task bg-white border rounded-xl max-w-6xl h-auto mx-auto p-10">
                <div className="input mb-20">
                    <form className='flex flex-nowrap items-center justify-end gap-3' onSubmit={handleSubmit}>
                        <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder='Enter task' className='border ps-3 py-2 focus:outline-none rounded' />
                        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Enter description' className='border ps-3 py-2 focus:outline-none rounded' />
                        <button type='submit' className='bg-gray-400 rounded py-2 px-5 text-white font-semibold'>ADD</button>
                    </form>
                    {
                        message !== "" &&
                        <div className="flex flex-nowrap items-center gap-2 text-green-500 justify-end w-full mt-7" >
                            <GoDotFill className='' />
                            <p className='text-sm font-medium'>{message}</p>
                        </div>
                    }

                </div>


                {
                    tasks !== null
                    &&
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900">#</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">title</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">description</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">status</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">completed</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">Delete</th>
                                    <th className="whitespace-nowrap text-lg px-4 py-2 font-medium text-gray-900 capitalize">Edit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    tasks?.map((task, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">{index + 1}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">{task?.title || null}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">{task?.description || null}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                                                {
                                                    task?.status &&
                                                    <RxCheckCircled className='text-2xl text-center w-full text-green-500' />
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                                                {
                                                    !task?.status &&
                                                    <input type="checkbox" onClick={updateStatus} id={task?._id || ""} />
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                                                <button type='button' onClick={() => deleteRecord(task?._id || "")}>
                                                    <RiDeleteBin2Line className='text-red-500 text-2xl' />
                                                </button>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                                                <Link to={`/update/${task?._id || ""}`}>
                                                    <TbEdit className='text-2xl text-gray-600' />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>

        </>
    )
}
