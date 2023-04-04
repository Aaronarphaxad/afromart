import { ProductCard } from "@/components";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ProductCardComponent } from "@/components/ProductCard";
import { useStateContext } from "@/context/StateContext";
import { client, urlFor } from "@/lib/client";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, price, details, available } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd } = useStateContext();

  return (
    <div className="">
      <div className="product-detail-container">
        <div className="">
          <img
            src={urlFor(image && image[index])}
            alt={name}
            className="product-detail-image"
          />
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                alt="image"
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <p>Available: {available ? "Yes" : "No"}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              {" "}
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              {" "}
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products
              ?.filter((item) => item?.category === product?.category)
              .map((item, i) => (
                <>
                  <ErrorBoundary>
                    <ProductCardComponent key={item._id} product={item} />
                  </ErrorBoundary>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;