import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");

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

	return (
		<div className="d-flex flex-column align-items-center justtify-content-center h-100">
			<h1>todos</h1>
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
						{/* list of line items start*/}
						{item.label}

						<span
							className="ml-auto"
							onClick={() => deleteTodo(index)}>
							<FontAwesomeIcon className="icon" icon={faTimes} />
						</span>
					</li>
				))}
				{/* list counter in footer */}
				<li className="counter">
					{list.length > 0
						? `${list.length} item${
								list.length > 1 ? "s left" : " left"
						  }`
						: "All tasks completed"}
				</li>
			</ul>
		</div>
	);
}
