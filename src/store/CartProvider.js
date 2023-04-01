import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + (action.item.price*action.item.amount);
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItems;

        if(existingCartItem) {
            console.log('h'+action.item.amount);
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItem] = updatedItem;
            console.log('g'+updatedItems[existingCartItem].amount);
        } else {
            updatedItems = state.items.concat(action.item);
        }
        console.log('tirth'+ updatedItems);
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    } 

    if(action.type === 'REMOVE') {
        
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const newTotalAmount = state.totalAmount - (action.item.price*existingCartItem.amount);
        let updatedItems;
        if(existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1};
            updatedItems[existingCartItem] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})    
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItems: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;