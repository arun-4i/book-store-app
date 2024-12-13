import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [current, setCurrent] = useState("books");
  const navigate = useNavigate();

  const handleSwitchPage = () => {
    if (current === "books") {
      setCurrent("movies");
      navigate("/movies");
    } else {
      setCurrent("books");
      navigate("/books");
    }
  };

  return (
    <nav className="bg-slate-400">
      <div className="flex justify-between">
        <span className="text-2xl font-semibold p-2">
          {current === "books" ? "Books" : "Movies"}
        </span>
        <Button onClick={handleSwitchPage} variant="ghost" className="m-2">
          {current === "books" ? "Switch to Movies" : "Switch to Books"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
