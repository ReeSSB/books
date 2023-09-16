import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
	//Manage book state
	const [books, setBooks] = useState([]);

	//Get all books
	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:3001/books");

		setBooks(response.data);
	};

	/*
	DONT DO THIS, IT WILL CREATE A BUG(A INFINITE LOOP).
	fetchBooks();
	*/

	//Use of useEffect
	useEffect(() => {
		fetchBooks();
	}, []);

	//Create Books
	const createBook = async (title) => {
		//Posting data in db.json
		const response = await axios.post("http://localhost:3001/books", {
			title, //title is state a variable.
		});

		//dding books, using state method.
		const updatedBooks = [...books, response.data];
		setBooks(updatedBooks);
	};

	//Edit Books
	const editBookById = async (id, newTitle) => {
		//Update the record in db.json
		const response = await axios.put(`http://localhost:3001/books/${id}`, {
			title: newTitle,
		});

		//Update the state
		const updatedBooks = books.map((book) => {
			if (book.id === id) {
				return { ...book, ...response.data };
			}
			return book;
		});
		setBooks(updatedBooks);
	};

	//Delete Books
	const deleteBookById = async (id) => {
		const response = await axios.delete(`http://localhost:3001/books/${id}`);

		//Update the state by delete record through filter method.
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
