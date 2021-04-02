import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [completed, setCompleted] = useState("");

	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			setList(
				list.concat({
					label: inputValue,
					done: false
				})
			);
			setInputValue("");
		}
	};

	const deleteTodo = index => {
		setList(list.filter((item, i) => index != i));
	};

	const handleCompleteTodo = index => {
		let updatedList = [].concat(list);
		updatedList[index].completed = !updatedList[index].completed;
		let count = 0;
		for (let i = 0; i < updatedList.length; i++) {
			updatedList[i].completed && count++;
		}
		setCompleted(count);
		setList(updatedList);
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

				<li className="counter">
					{list.length > 0
						? `${list.length} task${
								list.length > 1 ? "s left" : " left"
						  }`
						: "All tasks completed, yay!"}

					<span
						className="clearall"
						role="button"
						onClick={() => setList([])}>
						clear list
					</span>
				</li>
			</ul>
		</div>
	);
}
