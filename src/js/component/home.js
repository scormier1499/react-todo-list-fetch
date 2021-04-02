import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { object } from "prop-types";

const baseURL = "https://assets.breatheco.de/apis/fake/todos/user/sacormier";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [completed, setCompleted] = useState("");
	useEffect(() => {
		syncData();
	}, []);
	const syncData = () => {
		fetch(baseURL)
			.then(response => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then(data => {
				setList(data);
			})
			.catch(error => console.log(error));
	};

	const updateData = data => {
		console.log(data);
		fetch(baseURL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then(data => {
				syncData();
			})
			.catch(error => console.log(error));
	};

	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			updateData(
				list.concat({
					label: inputValue,
					done: false
				})
			);
			setInputValue("");
		}
	};

	const deleteTodo = index => {
		let newList = list.filter((item, i) => index != i);
		if (newList.length !== 0) {
			updateData(newList);
		} else {
			clearList();
		}
	};

	const clearList = () => {
		updateData([{ label: "sample to do", done: false }]);
	};

	const handleCompleteTodo = index => {
		let updatedList = [].concat(list);
		updatedList[index].completed = !updatedList[index].completed;
		let count = 0;
		for (let i = 0; i < updatedList.length; i++) {
			updatedList[i].completed && count++;
		}
		setCompleted(count);
		updateData(updatedList);
	};

	return (
		<div className="d-flex flex-column align-items-center justify-content-center h-100">
			<h1>
				todo
				<span className="todotitle-suffix">
					list<i className="fas fa-check"></i>
				</span>
			</h1>
			<ul className="list-unstyled d-flex flex-column p-o">
				<li>
					{/* field for add new todo */}
					<input
						type="text"
						placeholder="What needs to get done?"
						value={inputValue}
						onKeyPress={e => handleKeyPress(e)}
						onChange={e => setInputValue(e.target.value)}
					/>
				</li>
				{/* mapping for new line items*/}
				{list.map((item, index) => (
					<li
						key={index}
						label={item.label}
						className="d-flex listItem">
						{/* checkbox start*/}
						<span
							className={
								item.completed
									? "checkbox-round completed mr-3"
									: "checkbox-round mr-3"
							}
							onClick={() => handleCompleteTodo(index)}></span>
						{/* checkbox end*/}

						{/* list of line items start*/}
						{item.label}

						<span
							className="ml-auto"
							onClick={() => deleteTodo(index)}>
							<FontAwesomeIcon className="icon" icon={faTrash} />
						</span>
					</li>
				))}
				{/* list counter in footer */}

				<li className="counter d-flex justify-content-between">
					{list.length > 0
						? `${list.length} task${
								list.length > 1 ? "s left" : " left"
						  }`
						: "All tasks completed, yay!"}

					<span
						className="d-flex justify-content-end"
						role="button"
						onClick={clearList}>
						clear list
					</span>
				</li>
			</ul>
		</div>
	);
}
