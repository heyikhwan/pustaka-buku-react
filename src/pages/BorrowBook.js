import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function BorrowBook({ cart, setCart, removeItem }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const borrow_details = [];
    cart.map((book) => borrow_details.push(book.id));

    const borrows = { name, email, phone, address, borrow_details };

    setIsLoading(true);

    fetch("http://127.0.0.1:8000/api/borrows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(borrows),
    }).then(() => {
      setIsLoading(false);
      setCart([]);
      history.push("/success");
    });
  };

  return (
    <div className="flex gap-10">
      <div className="bg-white rounded p-4 w-full">
        <h3 className="text-2xl font-semibold border-b pb-2 border-gray-500">
          Data Peminjam
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              required
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-red-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              className="form-input mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-red-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="phone">Nomor Telepon</label>
            <input
              required
              type="tel"
              className="form-input mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-red-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="address">Alamat Lengkap</label>
            <textarea
              required
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
              rows="3"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {isLoading && (
            <button
              className="focus:outline-none text-black text-lg py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex items-center justify-center mt-5 w-full disabled:opacity-70"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Peminjaman sedang di proses
            </button>
          )}

          {!isLoading && (
            <button className="focus:outline-none text-white text-lg py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg flex items-center justify-center mt-5 w-full disabled:opacity-70" disabled={ cart.length <= 0 ? 'disabled' : undefined}>
              Pinjam Sekarang
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded p-4 w-5/12 h-full">
        <h3 className="font-semibold text-xl mb-3 border-b pb-2 border-gray-500">
          List Buku
        </h3>
        {isLoading && (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        )}
        {cart && (
          <table className="table-auto w-full">
            <tbody className="text-md flex flex-col gap-3">
              {cart &&
                cart.map((book) => (
                  <tr
                    key={book.id}
                    className="flex justify-between items-center hover:bg-gray-100"
                  >
                    <td>
                      <img
                        src={`http://127.0.0.1:8000/storage/${book.galleries[0].image}`}
                        alt="{book.title}"
                        width="50"
                      />
                    </td>
                    <th>
                      {book.title}
                      <span className="text-gray-400 block text-sm font-normal">
                        {book.author.name}
                      </span>
                    </th>
                    <td>
                      <button
                        onClick={() => removeItem(book)}
                        className="ml-auto text-red-300 hover:text-red-600"
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
