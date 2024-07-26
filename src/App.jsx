import React from 'react';
import "./App.css"
import Task from "./components/Task";

// RRD
import { Routes, Route } from "react-router-dom";
import TaskUpdate from './components/TaskUpdate';


export default function App() {
  return (
    <main className='app_main min-h-screen  w-full bg-gray-100 py-20'>
      <Routes>
        <Route path='/' element={<Task />} />
        <Route path='/update/:id' element={<TaskUpdate />} />
      </Routes>
    </main>
  )
}



