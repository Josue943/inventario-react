import { ShoppingCart, Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import defaultImage from 'assets/placeholder.jpg';
import { addItem } from 'store/cartSlice';
import ModalContainer from 'components/modalContainer';
import useToggle from 'hooks/useToggle';

const ProductCard = ({ id, name, price, image, item }) => {
  const { open, toggle } = useToggle();
  const dispatch = useDispatch();

  const imageSrc = image || defaultImage;
  return (
    <>
      <div className='product-card main-shadow-box' key={id}>
        <div className='product-card-image'>
          <img alt={name} src={imageSrc} />
        </div>

        <div className='product-card-footer'>
          <p>{name}</p>
          <span>₡{price}</span>
          <div className='product-card-details' onClick={toggle}>
            <div className='product-card-button'>
              <Search />
              <span>Ver Detalles</span>
            </div>
          </div>
        </div>
        <div className='product-card-cart'>
          <div className='product-card-button' onClick={() => dispatch(addItem(item))}>
            <ShoppingCart /> <span> Añadir </span>
          </div>
        </div>
      </div>

      <ModalContainer open={open} onClose={toggle} className='product-card-home-modal'>
        <div className='product-card-modal'>
          <div className='product-card-modal-img'>
            <img alt={name} src={imageSrc} />
          </div>
          <div className='product-card-modal-info'>
            <p>{name}</p>
            <span>₡{price}</span>
            <div className='product-card-button' onClick={() => dispatch(addItem(item))}>
              <ShoppingCart /> <span> Añadir </span>
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default ProductCard;
