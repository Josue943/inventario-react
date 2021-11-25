import { useDispatch } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';

import defaultImage from 'assets/placeholder.jpg';
import { addItem } from 'store/cartSlice';

const ProductCard = ({ id, name, price, image, item }) => {
  const dispatch = useDispatch();
  return (
    <div className='product-card main-shadow-box' key={id}>
      <div className='product-card-image'>
        <img alt={name} src={image || defaultImage} />
      </div>
      <div className='product-card-footer'>
        <p>{name}</p>
        <span>₡{price}</span>
      </div>
      <div className='product-card-cart'>
        <div className='button' onClick={() => dispatch(addItem(item))}>
          <ShoppingCart /> <span> Añadir </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
