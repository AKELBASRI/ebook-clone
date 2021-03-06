import React, { useState, useEffect } from "react";

import "./CategorySelect.css";

import { db, auth } from "../../firebase";

function CategorySelect(props) {
  const [category, setCategory] = useState([]);

  const onDataChange = (items) => {
    let categories = [];

    items.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      categories.push({
        id: id,
        name: data.name,
      });
    });

    setCategory(categories);
  };
  const selectedcateogry = (item) => {
    props.handleCategoryid(item);
  };
  useEffect(() => {
    const unsubscribe = db
      .collection("Category")
      .orderBy("name", "asc")
      .onSnapshot(onDataChange);

    return () => unsubscribe();
  }, []);
  return (
    <div>
      <select
        className="custom-select"
        onChange={(e) => selectedcateogry(e.target.value)}
        // value={selectedcategory}
      >
        <option value="0">All</option>
        {category.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CategorySelect;
