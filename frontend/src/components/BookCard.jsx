import { deleteBook } from "../../apis/api";

const BookCard = ({ book, onDelete }) => {
  
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
        <ul>
          <div className="w-fit flex bg-slate-200 rounded-xl">
            <li className="mb-2 p-2">
              <span className="font-semibold">{book.name}</span> - ₹{book.price}
            </li>

            <button 
              onClick={handleDeleteBook} 
              className="bg-blue-400">
              delete book
            </button>

          </div>
        </ul>
      </section>
    </>
  );
};

export default BookCard;
