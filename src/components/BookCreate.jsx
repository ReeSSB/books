import { useState } from "react";

function BookCreate({ onCreate }) {
	//useState for title creation
	const [title, setTitle] = useState("");

	//set title of value to title
	const handleChange = (event) => {
		setTitle(event.target.value);
	};

	//passes title as value using event from child to parent and set title to empty to new title
	const handleSubmit = (event) => {
		event.preventDefault();
		onCreate(title);
		setTitle("");
	};

	return (
		<div className="book-create">
			<h3>Add a book</h3>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input className="input" value={title} onChange={handleChange} />
				<button className="button">Create</button>
			</form>
		</div>
	);
}
export default BookCreate;
