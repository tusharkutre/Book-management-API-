import { useState, useEffect } from "react";
import { getBooks } from "../../apis/api";
import BookCard from "./BookCard";
import Modal from "../modal/Modal";

const Book = () => {
  const [books, setBooks] = useState([]); //getting data into array
  const [isModalOpen, setIsModalOpen] = useState(false);

  //fetching books data from the db
  const fetchBooksData = async () => {
    try {
      //get api call to the db
      const data = await getBooks();
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to remove a book from the state
  const removeBookFromState = (bookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };

  // run the side-effect when component mounts
  useEffect(() => {
    fetchBooksData();
  }, []);

  return (
    <>
      <section>
        <h2 className="text-xl font-bold mb-4">Books List</h2>
        <div>

          <button className="bg-slate-200 cursor-pointer p-2 rounded-xl" onClick={() => setIsModalOpen(true)}>
            create +
          </button>

          {books.map((book) => (
            <BookCard 
              book={book} 
              key={book.id} 
              onDelete={removeBookFromState}
            />
          ))}
        </div>
      </section>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Book;