import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBooks } from "../../apis/api";
import BookCard from "./BookCard";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [books, setBooks] = useState([]); //getting data into array
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessage] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  //fetching books data from the db
  const fetchBooksData = async () => {
    try {
      //get api call to the db
      const data = await getBooks();
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Redirect to login if unauthorized
      navigate("/login", { replace: true });
    }
  };

  // Function to remove a book from the state also updates the ui
  const removeBookFromState = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // run the side-effect when component mounts
  useEffect(() => {
    fetchBooksData();
  }, []);

  // pick success message from navigation state (e.g., after login)
  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center mb-4 p-2">
          <h2 className="text-xl font-bold mb-4">Book App</h2>

          <div className="flex justify-center items-center gap-4">
            {message && (
              <div
                className={`w-fit  p-2 rounded-md ${
                  message.type === "success"
                    ? "bg-slate-100 border border-slate-400 text-slate-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="bg-slate-200 cursor-pointer ring-1 ring-slate-400 px-2 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>

        </div>
        <div>
          <button
            className="bg-slate-200 cursor-pointer p-2 rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            create book
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
