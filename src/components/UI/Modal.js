import { Fragment } from 'react';
import reactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
    console.log('close');
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {   
    return (
        <Fragment>
            {reactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
            <Backdrop />
            <ModalOverlay>{props.children}</ModalOverlay>
        </Fragment>
    );
};

export default Modal;