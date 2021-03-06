import React, { useState, useEffect } from "react";
import Product from "../Product/Products";
import "./Home.css";
import { useStateValue } from "../../StateProvider";

import { db, auth } from "../../firebase";

function Home() {
  const [
    { basket, user, listofproducts, categoryselected, searchtitle },
    dispatch,
  ] = useStateValue();

  const onDataChange = (items) => {
    let products = [];

    items.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      products.push({
        id: id,
        title: data.title,
        price: data.price,
        rating: data.rating,
        image: data.image,
        categoryid: data.idcategory.id,
      });
    });

    // dispatch the item into the data layer
    dispatch({
      type: "List_PRODUCT",
      item: products,
    });
  };
  const listofproductfilter =
    categoryselected == 0
      ? listofproducts.filter((item) =>
          item.title.toLowerCase().includes(searchtitle.trim().toLowerCase())
        )
      : listofproducts.filter(
          (item) =>
            item.categoryid === categoryselected &&
            item.title.toLowerCase().includes(searchtitle.trim().toLowerCase())
        );
  useEffect(() => {
    const unsubscribe = db
      .collection("Products")
      .orderBy("title", "asc")
      .onSnapshot(onDataChange);

    return () => unsubscribe();
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="homeimage"
        />

        <div className="home__row">
          {listofproductfilter?.map((item1, index) => {
            return (
              <Product
                key={item1.id}
                title={item1.title}
                price={item1.price}
                rating={item1.rating}
                image={item1.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
