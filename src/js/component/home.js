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

	// start syncdata
	useEffect(() => {
		syncData();
	}, []);
	// end syncdata

	// start data fetch
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
	// end data fetch

	// start PUT method
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
	// end PUT method

	// start press Enter handler
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
	// end press Enter handler

	// start clearlist
	const deleteTodo = index => {
		let newList = list.filter((item, i) => index != i);
		if (newList.length !== 0) {
			updateData(newList);
		} else {
			clearList();
		}
	};

	// extra constant because we can't have an empty array for this project
	const clearList = () => {
		updateData([{ label: "sample to do", done: false }]);
	};

	// end clearlist

	// start complete to do function
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
	// end complete to do function

	// start HTML return
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

				{/* start mapping for new line items*/}
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

						{/* start of list line items */}

						{item.label}

						{/* end of list line items */}

						{/* start of trash can delete function */}
						<span
							className="ml-auto"
							onClick={() => deleteTodo(index)}>
							<FontAwesomeIcon className="icon" icon={faTrash} />
						</span>
						{/* end of trash can delete function */}
					</li>
				))}

				{/* end mapping for new line items*/}

				{/* footer start */}
				{/* start of todo counter in footer */}

				<li className="counter d-flex justify-content-between">
					{list.length > 0
						? `${list.length} task${
								list.length > 1 ? "s left" : " left"
						  }`
						: "All tasks completed, yay!"}

					{/* end of todo counter in footer */}

					{/* start of clear list link */}

					<span
						className="clearall d-flex justify-content-end"
						role="button"
						onClick={clearList}>
						Clear list
					</span>

					{/* end of clear list link */}
				</li>

				{/* footer end */}
			</ul>
		</div>
	);
	// end HTML return
}
