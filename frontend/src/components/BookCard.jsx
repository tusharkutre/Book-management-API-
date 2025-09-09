import { deleteBook } from "../../apis/api";
import LogoutButton from "./buttons/LogoutButton";
import LikeButton from "./buttons/LikeButton";

const BookCard = ({ book, onDelete, onToggleLike, isInitiallyLiked = false }) => {
  //delete book from the db
  const handleDeleteBook = async () => {
    try {
      await deleteBook(book.id);
      // Update the state to remove the book from the UI
      onDelete(book.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="group relative mb-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-800">
                {book.name}
              </h3>
            </div>
            <div className="shrink-0 gap-2 flex">
            <LikeButton
              initialLiked={isInitiallyLiked}
              onToggle={(liked) => onToggleLike && onToggleLike(book.id, liked)}
            />
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
                ₹{book.price}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">

            <LogoutButton name="Delete book 🗑️" onClick={handleDeleteBook}/>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-slate-200" />
        </div>
      </section>
    </>
  );
};

export default BookCard;