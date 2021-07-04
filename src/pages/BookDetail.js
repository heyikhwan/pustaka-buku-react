import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import ImageCarousel from "../components/ImageCarousel";
import { useEffect } from "react";

export default function BookDetail({ addItem, disabled, setDisabled, cart }) {
  const { slug } = useParams();

  const { data, isLoading, error } = useFetch(
    `http://127.0.0.1:8000/api/books?slug=${slug}`
  );

  useEffect(() => {
    return () => {
      if (data && cart) {
        const exist = cart.find(x => x.slug === slug );
        exist ? setDisabled(true) : setDisabled(false);
      }
    }
  })

  return (
    <div>
      {error && <div className="flex items-center justify-center">{error}</div>}
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
      {data && (
        <div className="lg:grid grid-cols-2 gap-5 items-center">
          <ImageCarousel images={data.galleries} title={data.title} />
          <div className="bg-white rounded px-5 py-3">
            <h3 className="text-4xl font-semibold">{data.title}</h3>
            <p className="mt-5 text-lg">{data.description}</p>
            <h5 className="font-semibold my-5 text-xl underline text-center">
              Informasi Lainnya
            </h5>
            <table className="table-auto w-full">
              <tbody className="text-lg flex flex-col gap-3">
                <tr className="flex justify-between border-b border-gray-300 pb-2">
                  <th>Penulis</th>
                  <td>{data.author.name}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-300 pb-2">
                  <th>Penerbit</th>
                  <td>{data.publisher}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-300 pb-2">
                  <th>Tahun Terbit</th>
                  <td>{data.publication_year}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-300 pb-2">
                  <th>Jumlah Halaman</th>
                  <td>{data.number_of_page}</td>
                </tr>
                <tr className="flex justify-between border-b border-gray-300 pb-2">
                  <th>ISBN</th>
                  <td>{data.isbn}</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => addItem(data)}
              className="focus:outline-none text-white text-lg py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg flex items-center justify-center mt-8 w-full disabled:opacity-50"
              disabled={disabled}
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              Pinjam Buku
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
