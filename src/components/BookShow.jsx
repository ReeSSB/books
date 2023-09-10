import { useState } from "react";
import BookEdit from "./BookEdit";

function BookShow({ book, onDelete, onEdit }) {
	const [showEdit, setShowEdit] = useState(false);

	//Shows form to edit using click event
	const handleEditClick = () => {
		setShowEdit(!showEdit);
	};

	//closes the form card and pass new title as updated title to book state
	const handleSubmit = (id, newTitle) => {
		setShowEdit(false);
		onEdit(id, newTitle);
	};

	//It render book title using variable name content and show the form to edit and call bookedit function component, if showEdit is true.
	let content = <h3>{book.title}</h3>;
	if (showEdit) {
		content = <BookEdit onSubmit={handleSubmit} book={book} />;
	}

	//Delete books by using id.
	const handleDeleteClick = () => {
		onDelete(book.id);
	};

	return (
		<div className="book-show">
			<img alt="books" src={`https://picsum.photos/seed/${book.title}/300/200`} />
			<div>{content}</div>
			<div className="actions">
				<button className="edit" onClick={handleEditClick}>
					Edit
				</button>
				<button className="delete" onClick={handleDeleteClick}>
					Delete
				</button>
			</div>
		</div>
	);
}
export default BookShow;
