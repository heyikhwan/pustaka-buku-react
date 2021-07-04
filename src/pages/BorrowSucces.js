import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../success";
import '../success.css'

export default function BorrowSucces() {

    const history = useHistory();
    const [count, setCount] = useState(5);

    useEffect(() => {
      count > 0 && setTimeout(() => {
        setCount(count - 1)
      }, 1000);
    }, [count])

    count === 0 && history.push('/');

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="svg-container">
        <svg
          className="ft-green-tick"
          xmlns="http://www.w3.org/2000/svg"
          height="100"
          width="100"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22" />
          <path
            className="tick"
            fill="none"
            stroke="#FFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M14 27l5.917 4.917L34 17"
          />
        </svg>
      </div>
        <p className="text-2xl mt-10">Peminjaman Berhasil, tunggu sebentar... {`(${count})`}</p>
    </div>
  );
}
