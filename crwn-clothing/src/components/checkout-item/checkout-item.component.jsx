import "./checkout-item.styles.scss";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;

  const dispatch = useDispatch();

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(item));
  };

  const addItemHandler = () => dispatch(addItemToCart(item));
  const removeItemHandler = () => dispatch(removeItemFromCart(item));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </span>
    </div>
  );
};
export default CheckoutItem;
