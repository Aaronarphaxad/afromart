import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import Link from "next/link";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    console.log("CART DATA: ", cartItems);

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500 || response.statusCode === 400) {
      toast.error("An error occured");
      return;
    }

    const data = await response.json();

    toast.loading("redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">You have</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
          <span className="heading">in your bag</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn2"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              return <CartProduct key={item._id} item={item} />;
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn2" onClick={handleCheckout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartProduct = ({ item }) => {
  const { toggleCartItemQuantity, onRemove } = useStateContext();
  return (
    <div className="product" key={item._id}>
      <img
        src={urlFor(item?.image[0])}
        className="cart-product-image"
        alt={item.name}
      />
      <div className="item-desc">
        <div className="flex top">
          <h5 className="">{item.name}</h5>
          <h4>${item.price}</h4>
        </div>
        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => toggleCartItemQuantity(item._id, "dec")}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{item.quantity}</span>
              <span
                className="plus"
                onClick={() => toggleCartItemQuantity(item._id, "inc")}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <button
            type="button"
            className="remove-item"
            onClick={() => onRemove(item._id)}
          >
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
