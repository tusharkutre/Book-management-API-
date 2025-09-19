const BASE_URL = "http://localhost:3000";
const HEADERS = { "Content-Type": "application/json" };
const FETCH_OPTIONS = {
  credentials: 'include', // Include cookies in all requests
  headers: HEADERS
};

// frontend api calls to the backend(so that they can communicate with each other)

// GET all books
export const getBooks = async () => {
	const response = await fetch(`${BASE_URL}/books`, {
		method: "GET",
		...FETCH_OPTIONS,
	});
	if (!response.ok) throw new Error("Failed to fetch books");
	return await response.json();
};

// GET a book by id
export const getBookById = async (id) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "GET",
		...FETCH_OPTIONS,
	});
	if (!response.ok) throw new Error("Failed to fetch book");
	return await response.json();
};

// create a new book
export const postBook = async (data) => {
	const response = await fetch(`${BASE_URL}/books`, {
		method: "POST",
		...FETCH_OPTIONS,
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error("Failed to add book");
	return await response.json();
};

// PUT (update/edit) a book by id
export const putBook = async (id, data) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "PUT",
		...FETCH_OPTIONS,
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error("Failed to update book");
	return await response.json();
};

// DELETE a book by id
export const deleteBook = async (id) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "DELETE",
		...FETCH_OPTIONS,
	});
	if (!response.ok) throw new Error("Failed to delete book");
	return await response.json();
};

// LOGOUT user (clears cookie on server)
export const logout = async () => {
	const response = await fetch(`${BASE_URL}/logout`, {
		method: "GET",
		...FETCH_OPTIONS,
	});
	if (!response.ok) throw new Error("Failed to logout");
	return await response.json();
};