import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Populer's Airpodes"}
      />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Styliesh Watches"}
      />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"camera"} heading={"Cameras"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
      <VerticalCardProduct category={"mouse"} heading={"Mouses"} />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Refrigerators"}
      />
      <VerticalCardProduct category={"processor"} heading={"Processors"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
}

export default Home;
