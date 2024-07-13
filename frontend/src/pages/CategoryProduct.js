import React, { useState } from "react";
import { useParams } from "react-router-dom";
function CategoryProduct() {
  const params = useParams();
  return <div>{params?.categoryName}</div>;
}

export default CategoryProduct;
