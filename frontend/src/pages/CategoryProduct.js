import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import VerticalCard from "../components/VerticalCard";
import summaryApi from "../common";
function CategoryProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);

  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCatergoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCatergoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCatergoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const fetchData = async () => {
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el} && `;
    });
    navigate(`/product-category?` + urlFormat.join(""));
  }, [selectCategory]);

  const [sortBy, setSortBy] = useState("");

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-3">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr] overflow-y-scroll scrollbar-none">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)]">
          <div className=" ">
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Sort by
            </h1>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  id="low"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label htmlFor="low">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  id="high"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label htmlFor="high">Price - High to low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className=" ">
            <h1 className="text-lg uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Category
            </h1>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3" key={categoryName?.name+"hllo"+index}>
                    <input
                      type="checkbox"
                      name={"category"}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
