import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview, } from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";

const ProductDetails = ({ match }:any) => {

  const dispatch = useDispatch();
  //const alert = useAlert();

  const { product, loading, error } = useSelector( (state:any) => state.productDetails );
  const { success, error: reviewError } = useSelector( (state:any) => state.newReview );
  const options = { size: "large", readOnly: true, precision: 0.5, };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating );
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

    return(
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={` -- ECOMMERCE`} />
            <div className="ProductDetails">
                <div>
                    <Carousel>
                    
                    </Carousel>
                </div>
                <div>    
                    <div className="detailsBlock-1">
                        <h2></h2>
                        <p>Product # </p>
                    </div>

                    <div className="detailsBlock-2">
                      <Rating {...options} />
                      <span className="detailsBlock-2-span">
                        {" "} ( Reviews)
                      </span>
                    </div>

                    <div className="detailsBlock-3">

                      <h1></h1>

                      <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                          <button onClick={decreaseQuantity}>-</button>
                          <input readOnly type="number" value={quantity} />
                          <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button  onClick={addToCartHandler}>
                          Add to Cart
                        </button>
                      </div>

                      <p>
                        Status: <b>
                                  
                                </b>
                      </p>
                    </div>

                    <div className="detailsBlock-4">
                      Description : <p></p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                      Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            

          
        </Fragment>
        )}
        </Fragment>
    );
};

export default ProductDetails;