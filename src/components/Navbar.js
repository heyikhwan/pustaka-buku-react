import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ cart, removeItem }) {
  const [bagIsOpen, setBagIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-red-500 to-red-600 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center container mx-auto px-4 lg:px-0">
        <NavLink to="/" className="uppercase text-white font-semibold text-2xl">
          Pustaka Buku
        </NavLink>

        <div className="relative">
          <div
            onClick={() => setBagIsOpen(!bagIsOpen)}
            id="btnBag"
            className="relative z-50 flex items-center rounded-md bg-red-400 p-2 text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            {cart.length !== 0 && (
              <div className="h-1 w-1 ml-1 bg-yellow-300 rounded-full"></div>
            )}
          </div>

          <div
            onClick={() => setBagIsOpen(false)}
            className={`${
              bagIsOpen ? "fixed inset-0 h-full w-full z-10" : "hidden"
            }`}
          ></div>

          <div
            className={`${
              bagIsOpen ? "block" : "hidden"
            } absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20`}
            style={{ width: 20 + "rem" }}
          >
            <div className="py-2">
              {cart.length === 0 && (
                <div className="flex justify-center py-3">Tas Kosong</div>
              )}
              {cart.length > 0 &&
                cart.map((book) => (
                  <div key={book.id}>
                    <div className="px-2 flex items-center gap-3">
                      <img
                        src={`http://127.0.0.1:8000/storage/${book.galleries[0].image}`}
                        alt={book.title}
                        width="50"
                      />
                      <div>
                        <h5 className="font-semibold">{book.title}</h5>
                        <p className="text-sm">{book.author.name}</p>
                      </div>
                      <button
                        onClick={() => removeItem(book)}
                        className="ml-auto text-red-300 hover:text-red-600 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <hr className="my-3 last:block" />
                  </div>
                ))}
            </div>
            {cart.length > 0 && (
              <Link
                onClick={() => setBagIsOpen(false)}
                to="/borrow"
                className="block bg-gray-800 text-white text-center font-bold py-2"
              >
                Proses Peminjaman
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
