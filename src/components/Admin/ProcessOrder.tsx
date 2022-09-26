import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
  } from "../../actions/orderAction";
  import { useSelector, useDispatch } from "react-redux";
  import Loader from "../layout/Loader/Loader";
  import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import { useParams } from "react-router-dom";

const ProcessOrder = ({ history, match }:any) => {
  const { order, error, loading } = useSelector((state:any) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state:any) => state.order);

  const updateOrderSubmitHandler = (e:any) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  //const alert = useAlert();
  const [status, setStatus] = useState("");

  const { id } = useParams();

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));

  }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                {loading ? ( <Loader /> ) : (
                    <div className="confirmOrderPage" >

                        <div>
                            <div className="confirmshippingArea">

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
                                        <p>
                                            
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="confirmCartItems">

                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div >
                            <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                                <h1>Process Order</h1>

                                <div>
                                    <AccountTreeIcon />
                                    <select >

                                        

                                        
                                    </select>
                                </div>

                                <Button id="createProductBtn" type="submit" >
                                    Process
                                </Button>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;