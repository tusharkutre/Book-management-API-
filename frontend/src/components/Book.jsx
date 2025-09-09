import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getBooks, logout } from "../../apis/api";
import BookCard from "./BookCard";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./buttons/LogoutButton";
import LikedBooks from "./buttons/LikedBooks";

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

  // handle logout logic
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  // track liked book ids
  const [likedIds, setLikedIds] = useState(new Set());

  const handleToggleLike = (bookId, liked) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (liked) {
        next.add(bookId);
      } else {
        next.delete(bookId);
      }
      return next;
    });
  };

  return (
    <>
      <section className="min-h-screen w-full p-4">
        <div className="flex justify-between items-center mb-4 p-2">
          <h2 className="text-xl font-bold mb-4">Book App</h2>

          <div className="flex justify-center items-center gap-4">
            {message && (
              <div
                className={`w-fit  p-2 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <LogoutButton name="Logout" onClick={handleLogout} />
          </div>
        </div>

        <LogoutButton name="Create Book 📕" onClick={() => setIsModalOpen(true)} />

        <LikedBooks label="Liked Books" count={likedIds.size} />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              onDelete={removeBookFromState}
              onToggleLike={handleToggleLike}
              isInitiallyLiked={likedIds.has(book.id)}
            />
          ))}
        </div>
      </section>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Book;
