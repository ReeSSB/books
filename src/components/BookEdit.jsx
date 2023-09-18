import { useState, useContext } from "react";
import BooksContext from "../context/books";

function BookEdit({ book, onSubmit }) {
	const [title, setTitle] = useState(book.title);

	const { editBookById } = useContext(BooksContext);

	//Handles change of title using useState
	const handleChange = (event) => {
		setTitle(event.target.value);
	};

	//Handles form submission to edit book card and close the form
	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit();
		editBookById(book.id, title);
	};

	return (
		<form onSubmit={handleSubmit} className="book-edit">
			<label>Title</label>
			<input className="input" value={title} onChange={handleChange} />
			<button className="button is-primary">save</button>
		</form>
	);
}
export default BookEdit;
