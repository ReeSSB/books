import { useEffect, useContext } from "react";
import BooksContext from "./context/books";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
	/*
	DONT DO THIS, IT WILL CREATE A BUG(A INFINITE LOOP).
	fetchBooks();
	*/

	const { fetchBooks } = useContext(BooksContext);
	//Use of useEffect
	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<div className="app">
			<h1>Reading List</h1>
			<BookList />
			<BookCreate />
		</div>
	);
}
export default App;
