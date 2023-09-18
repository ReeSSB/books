import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
	//Manage book state
	const [books, setBooks] = useState([]);

	//Get all books
	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:3001/books");

		setBooks(response.data);
	};

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

	const valueToShare = { books, fetchBooks, createBook, editBookById, deleteBookById };

	return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>;
}

export { Provider };
export default BooksContext;

//how to import both
// import BooksContext, {Provider} from './sdsadas'
