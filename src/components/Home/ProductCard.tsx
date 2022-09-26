import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Interface } from "readline";
import { typeOptions } from "@testing-library/user-event/dist/type/typeImplementation";

const options = {
   edit: false,
   color: "rgba(20,20,20,0.1)",
   activecolor: "tomato",
   size: window.innerWidth < 600 ? 20 : 25,
   value: 2.5,
   isHalf: true,
};

interface ProductCardProps {
    product: any
};

const ProductCard: React.FunctionComponent<ProductCardProps> = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return(
        <Link  className="productCard" to={product._id}>
        <img src={product.images.url} alt={product.name} />
        <p>{product.name}</p>
        <div>
        <ReactStars {...options} /> <span> (256 Reviews) </span>
        </div>
        <span>{`₹${product.price}`}</span>
        </Link>
    );    
};

export default ProductCard;