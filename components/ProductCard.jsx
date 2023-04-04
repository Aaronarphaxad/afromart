import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/client";

export const ProductCardComponent = ({
  product: { image, name, slug, price, available },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="card-container">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="card-image"
            alt={name}
          />
          <div className="card-info">
            <p className="card-name">{name}</p>
            <p className="card-price">${price}</p>
            <p className="available">
              {available ? "In stock" : "Not in stock"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
