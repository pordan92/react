import Card from "./Card";
import classes from "./Modal.module.css"

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalContent = (props) => {
    return <div className={classes.content}>
        <Card>{props.children}</Card>
    </div>
}

const Modal = props => {

    return (
        <div>
            <Backdrop onClose={props.onClose} />
            <ModalContent >{props.children}</ModalContent>
        </div>
    )
        ;
}

export default Modal;