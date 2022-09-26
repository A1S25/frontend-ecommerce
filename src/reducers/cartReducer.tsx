import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action:any) => {
    switch (action.type) {
        case ADD_TO_CART:

        case REMOVE_CART_ITEM:
            return {
                ...state,
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
        
};

