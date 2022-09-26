import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }:any) => {
    const { order, error, loading } = useSelector((state:any) => state.orderDetails);

  const dispatch = useDispatch();
  //const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

    return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
        <Fragment>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage">

                <div className="orderDetailsContainer">
                    <Typography component="h1"> Order #{order && order._id} </Typography>
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span></span>
                        </div>
                    <div>
                        <p>Phone:</p>
                        <span></span>
                    </div>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>
                        </span>
                    </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p>
                        
                        </p>  
                    </div>

                    <div>
                        <p>Amount:</p>
                        <span></span>
                    </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                            <p></p>
                    </div>
                </div>
            </div>

            <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
    );
};

export default OrderDetails;