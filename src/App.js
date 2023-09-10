import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
	//Manage book state
	const [books, setBooks] = useState([]);

	//Generate ID
	const idGen = Math.round(Math.random() * 9999);

	//Create Books
	const createBook = (title) => {
		/*
		BAD CODE
		HOT reload error will occur, state will not be updated.
		books.push({id:123, title:title});
		setBooks(books);
		*/

		/*
		GOOD CODE
		Below function copies existing(books) array into new array(updatedBooks)
		References point at different arrays/objects! React will process the rerender.
		*/

		const updatedBooks = [...books, { id: idGen, title: title }];
		setBooks(updatedBooks);
	};

	//Edit Books
	const editBookById = (id, newTitle) => {
		const updatedBooks = books.map((book) => {
			if (book.id === id) {
				return { ...book, title: newTitle };
			}
			return book;
		});
		setBooks(updatedBooks);
	};

	//Delete Books
	const deleteBookById = (id) => {
		const updatedBooks = books.filter((book) => {
			return book.id !== id;
		});

		setBooks(updatedBooks);
	};

	return (
		<div className="app">
			<h1>Reading List</h1>
			<BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
			<BookCreate onCreate={createBook} />
		</div>
	);
}
export default App;
