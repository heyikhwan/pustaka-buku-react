import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import BorrowBook from "./pages/BorrowBook";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import BorrowSucces from "./pages/BorrowSucces";

function App() {
  const [cart, setCart] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const addItem = (book) => {
    const exist = cart.find((x) => x.id === book.id);
    if (exist) {
      setDisabled(true);
    } else {
      setDisabled(true);
      setCart([...cart, { ...book }]);
    }
  };

  const removeItem = (book) => {
    const exist = cart.find((x) => x.id === book.id);
    if (exist) {
      setDisabled(false);
      setCart(cart.filter((x) => x.id !== book.id));
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('books');
    if (data) {
      setCart(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
      localStorage.setItem("books", JSON.stringify(cart));
  });

  return (
    <Router>
      <Navbar cart={cart} removeItem={removeItem} />
      <div className="content container mx-auto py-20">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/book/:slug">
            <BookDetail
              addItem={addItem}
              cart={cart}
              setDisabled={setDisabled}
              disabled={disabled}
              setCart={setCart}
            />
          </Route>
          <Route path="/borrow">
            <BorrowBook cart={cart} setCart={setCart} removeItem={removeItem} />
          </Route>
          <Route path="/success">
            <BorrowSucces />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
