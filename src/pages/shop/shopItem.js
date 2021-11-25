import { ArrowBackIos, ArrowForwardIos, DeleteForever } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import defaultImage from 'assets/placeholder.jpg';
import { updateItem } from 'store/cartSlice';

const ShopItem = ({ id, name, image, price, quantity }) => {
  const dispatch = useDispatch();

  return (
    <div className='shop-item'>
      <div className='shop-item-img'>
        <img src={image || defaultImage} alt={name} />
      </div>

      <div className='shop-item-name'>
        <h6>{name}</h6>
      </div>

      <div className='shop-item-quantity'>
        <ArrowBackIos onClick={() => dispatch(updateItem({ productId: id, quantity: quantity - 1 }))} />
        <span>{quantity}</span>
        <ArrowForwardIos onClick={() => dispatch(updateItem({ productId: id, quantity: quantity + 1 }))} />
      </div>
      <div className='shop-item-price'>₡{quantity * price}</div>
      <div className='shop-item-remove'>
        <DeleteForever color='error' onClick={() => dispatch(updateItem({ productId: id, quantity: 0 }))} />
      </div>
    </div>
  );
};

export default ShopItem;
