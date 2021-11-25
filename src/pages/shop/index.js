import { useSelector } from 'react-redux';

import './styles.scss';
import ShopItem from './shopItem';
import Layout from 'components/layout';

const Shop = () => {
  const products = useSelector(state => state.cart.products);
  const total = products.reduce((previous, current) => previous + current.price * current.quantity, 0);
  return (
    <Layout>
      <div className='shop-page'>
        <div className='shop-header'>
          {blocks.map(item => (
            <div className='shop-block' key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        {products.map(product => (
          <ShopItem key={product.id} {...product} />
        ))}
        <div className='shop-footer'>Total ₡{total}</div>
      </div>
    </Layout>
  );
};

export default Shop;

const blocks = ['Producto', 'descripcion', 'cantidad', 'precio', ''];
