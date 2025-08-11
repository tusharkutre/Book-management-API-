const BASE_URL = "http://localhost:3000";
const HEADERS = { "Content-Type": "application/json" };

// frontend api calls to the backend

// GET all books
export const getBooks = async () => {
	const response = await fetch(`${BASE_URL}/books`, {
		method: "GET",
		headers: HEADERS,
	});
	if (!response.ok) throw new Error("Failed to fetch books");
	return await response.json();
};

// GET a book by id
export const getBookById = async (id) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "GET",
		headers: HEADERS,
	});
	if (!response.ok) throw new Error("Failed to fetch book");
	return await response.json();
};

// create a new book
export const postBook = async (data) => {
	const response = await fetch(`${BASE_URL}/books`, {
		method: "POST",
		headers: HEADERS,
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error("Failed to add book");
	return await response.json();
};

// PUT (update/edit) a book by id
export const putBook = async (id, data) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "PUT",
		headers: HEADERS,
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error("Failed to update book");
	return await response.json();
};

// DELETE a book by id
export const deleteBook = async (id) => {
	const response = await fetch(`${BASE_URL}/books/${id}`, {
		method: "DELETE",
		headers: HEADERS,
	});
	if (!response.ok) throw new Error("Failed to delete book");
	return await response.json();
};