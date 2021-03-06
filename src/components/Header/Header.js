import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import CategorySelect from "./CategorySelect";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";

function Header() {
  const [categoryid, setcategoryid] = useState(0);
  const [searchitem, setSearchitem] = useState("");
  const [{ basket, user, listofproducts }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
  const handleCategoryid = (item) => {
    setcategoryid(item);
  };
  const handleSearch = (titlesearch) => {
    setSearchitem(titlesearch.target.value);
  };
  const search = () => {
    console.log(categoryid);
    // let newlistofproduct = listofproducts.filter(
    //   (item) => item.categoryid == categoryid
    // );
    dispatch({
      type: "categoryselected",
      item: categoryid,
    });
    dispatch({
      type: "searchtitle",
      item: searchitem,
    });
  };
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="./e-book.png" />
      </Link>

      <div className="header__search">
        <CategorySelect handleCategoryid={handleCategoryid} />
        <input
          className="header__searchInput"
          type="text"
          onChange={handleSearch}
        />
        <SearchIcon className="header__searchIcon" onClick={search} />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
