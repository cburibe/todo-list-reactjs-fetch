import React, { useState } from "react";
import { Task } from "./Task";

export function TaskList() {
	const [inputTask, setInputTask] = useState("");
	const [toDoList, setToDoList] = useState([]);

	const [taskDoneList, setTaskDoneList] = useState([]);

	function addNewTask(task) {
		if (inputTask.trim() !== "") {
			setToDoList([
				...toDoList,
				{ id: Date.now(), text: task, done: false },
			]);
		}
	}
	function pressEnter(e) {
		if (inputTask.trim() !== "") {
			if (e.key === "Enter") {
				addNewTask(inputTask);
				setInputTask("");
			}
		}
	}

	function deleteTask(idTask, idTaskDone) {
		if (idTask !== null) {
			const newtoDoList = toDoList.filter((task) => task.id !== idTask);
			setToDoList(newtoDoList);
		} else if (idTaskDone !== null) {
			const newDoneList = taskDoneList.filter(
				(task) => task.id !== idTaskDone
			);
			setTaskDoneList(newDoneList);
		}
	}

	//Ready Taks
	function addTaskDone(idTaskDone) {
		if (taskDoneList !== []) {
			toDoList.filter((task) => {
				if (task.id === idTaskDone) {
					task.done = true;
					setTaskDoneList([...taskDoneList, task]);
					let indexTaskDone = toDoList.indexOf(task);
					toDoList.splice(indexTaskDone, 1);
					setToDoList(toDoList);
				}
			});
		}
	}
	function dontDone(idTask, done) {
		if (done === true) {
			taskDoneList.filter((task) => {
				if (task.id === idTask) {
					task.done = false;
					setToDoList([...toDoList, task]);
					let indexTask = taskDoneList.indexOf(task);
					taskDoneList.splice(indexTask, 1);
					setTaskDoneList(taskDoneList);
				}
			});
		}
	}

	return (
		<div className="container text-center mt-5 mb-5 pt-3 pb-5 d-flex justify-content-center rounded myListContainer">
			<div className="p-0 m-0 myContainer">
				<div className="row d-flex justify-content-center">
					<h1 className="col-9 col-sm-10 col-md-10 col-lg-12 col-xl-12 mb-3 mt-2">
						TODO LIST
					</h1>
				</div>

				<div className="row mb-4 d-flex justify-content-center">
					<input
						className="col-9 col-sm-10 col-md-10 col-lg-12 col-xl-12 border-0 rounded-pill text-center"
						type="text"
						onChange={(e) => setInputTask(e.target.value)}
						value={inputTask}
						onKeyPress={(e) => pressEnter(e)}
						placeholder="No tasks, add a task"
						autoFocus
					/>
				</div>

				<div className="row d-flex justify-content-center align-items-start">
					<div className="d-flex flex-column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
						<h4 className="col-8 col-sm-9 col-md-9 col-lg-12 col-xl-12 taskTitle">
							To do tasks
						</h4>
						{toDoList.map((task) => {
							return (
								<Task
									key={task.id}
									id={task.id}
									taskText={task.text}
									done={task.done}
									deleteTask={deleteTask}
									addTaskDone={addTaskDone}
									taskDoneList={taskDoneList}
									dontDone={dontDone}
								/>
							);
						})}

						<div className="d-flex justify-content-start">
							<div className="taskNum">
								{toDoList.length} tasks left
							</div>
						</div>
					</div>

					<div className="d-flex flex-column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
						<h4 className="col-8 col-sm-9 col-md-9 col-lg-12 col-xl-12 taskTitle">
							Done tasks
						</h4>
						{taskDoneList.map((task) => {
							return (
								<Task
									key={task.id}
									id={task.id}
									taskText={task.text}
									done={task.done}
									deleteTask={deleteTask}
									addTaskDone={addTaskDone}
									taskDoneList={taskDoneList}
									dontDone={dontDone}
								/>
							);
						})}

						<div className="d-flex justify-content-end">
							<div className="taskNum">
								{taskDoneList.length} tasks done
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
