import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard({ books }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
      {books.map((book) => (
        <Link to={`/book/${book.slug}`} key={book.id}>
          <div
            className="bg-white rounded shadow-sm p-2 text-center cursor-pointer hover:text-red-500 transform hover:-translate-y-3 transition-all ease-in-out duration-100"
          >
            <div className="flex justify-center">
              <img
                src={`http://127.0.0.1:8000/storage/${book.galleries[0].image}`}
                alt={book.title}
                width="180"
                className="text-center"
              />
            </div>
            <h3 className="mt-5 text-md lg:text-lg font-semibold">
              {book.title}
            </h3>
            <p className="mt-2 text-sm lg:text-base">{book.author.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
