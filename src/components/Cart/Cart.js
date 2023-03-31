import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartItems = <ul>{[].map(item => <li></li>)}</ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems};
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>25.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;