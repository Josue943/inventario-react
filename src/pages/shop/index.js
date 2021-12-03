import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import './styles.scss';
import ShopItem from './shopItem';
import Layout from 'components/layout';
import { clearCart } from 'store/cartSlice';
import { createSale } from 'api/sales';
import { setAlert } from 'store/alertSlice';
import { useDispatch } from 'react-redux';

const Shop = () => {
  const { products, user } = useSelector(({ cart, auth }) => ({
    products: cart.products,
    user: auth.user,
  }));

  const dispatch = useDispatch();
  const history = useHistory();

  const total = products.reduce((previous, current) => previous + current.price * current.quantity, 0);

  const onToken = async token => {
    const response = await createSale({
      products: products.map(({ id, quantity, price }) => ({ productId: id, quantity, unitPrice: price })),
      clientId: user.personId,
      paymentMethod: 'cash',
    });

    if (!response.ok) {
      dispatch(setAlert({ alert: { message: 'Error de servidor, intenta mas tarde', severity: 'error' } }));
      return;
    }

    dispatch(clearCart());
    history.push('/profile/shopping');
  };

  const onClick = e => {
    if (!user) {
      history.push('/login');
      e.stopPropagation();
    }
  };

  return (
    <Layout>
      {!products.length ? (
        <div className='shop-empty'>
          <h6>Sin productos</h6>
        </div>
      ) : (
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
          <div className='shop-button'>
            <StripeCheckout
              locale='es'
              label='Comprar ahora'
              name='Acuario Paisajismo'
              description={`Total a pagar ₡${total}`}
              stripeKey={process.env.REACT_APP_STRIPE_KEY}
              token={onToken}
              amount={total * 100}
              panelLabel='Pagar'
              currency='CRC'
              email='Adrian'
            >
              <button className='shop-fake-button' onClick={onClick}>
                Comprar ahora
              </button>
            </StripeCheckout>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Shop;

const blocks = ['Producto', 'descripcion', 'cantidad', 'precio', ''];
