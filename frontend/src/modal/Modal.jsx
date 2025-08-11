import { useState } from "react";
import { postBook } from "../../apis/api";

const Modal = ({ onClose }) => {
  const [bookName, setBookName] = useState("");
  const [bookPrice, setBookPrice] = useState("");

  // create a new book
const handleCreateBook = async (bookName, bookPrice) => {
  try {
    await postBook({ name: bookName, price: bookPrice }); // save the book in the db
    // clear the form after creating the book
    setBookName("");
    setBookPrice("");
    // close the modal
    onClose();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white space-y-5 p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Create Book</h2>
          <form className="flex flex-col gap-2">
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              type="number"
              placeholder="Book Price"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
            />
            <button
              onClick={() => handleCreateBook(bookName, bookPrice)}
              className="bg-blue-500 text-white p-2 rounded-md"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
