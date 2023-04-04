import React from "react";
import {
  Product,
  Footer,
  HeroBanner,
  Navbar,
  FooterBanner,
  ProductCard,
} from "../components";
import { client } from "../lib/client";
import { ProductCardComponent } from "@/components/ProductCard";
import Link from "next/link";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {/* {console.log(products)} */}
      <div className="products-heading">
        <h2>Best Selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <ProductCardComponent key={product._id} product={product} />
        ))}
      </div>
      <div>
        <Link href="/shop">
          <button type="button" className="btn">
            Shop by category
          </button>
        </Link>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
