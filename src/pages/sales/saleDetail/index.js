import Moment from 'react-moment';
import { forwardRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './styles.scss';
import SaleTable from '../saleTable';
import Logo from 'assets/logo.jpg';
import { getSale } from 'api/sales';

const SaleDetail = forwardRef(({ data, invoice = false }, ref) => {
  const [sale, setSale] = useState(data || null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (data) return;
      const response = await getSale(id);
      if (response.ok) setSale(response.data);
    })();
  }, []);

  if (!sale) return null;

  const subtotal = sale?.products.reduce(
    (total, { saleDetails: { quantity, unitPrice } }) => total + quantity * unitPrice,
    0
  );
  return (
    <div className={`sale-detail-page ${invoice ? 'sale-invoice' : ''}`} ref={ref}>
      <img src={Logo} alt='logo' className='invoice-logo' />
      <h3>Detalles de la venta </h3>
      <h6>Datos</h6>
      <div className='sale-detail-page-form'>
        <div className='sale-detail-page-form-detail'>
          <p>Tipo de venta</p>
          <p>{sale.paymentMethod === 'cash' ? 'Contado' : 'Credito'}</p>
        </div>
        <div className='sale-detail-page-form-detail'>
          <p>Fecha</p>
          <p>
            <Moment format='DD-MM-YYYY h:mm:ss a'>{sale.date}</Moment>
          </p>
        </div>
        <div className='sale-detail-page-form-detail'>
          <p>Nro. de factura</p>
          <p>{sale.id}</p>
        </div>
        <div className='sale-detail-page-form-detail'>
          <p>Cliente</p>
          <p>{!sale.client ? 'Publico General' : `${sale.client.name} ${sale.client.surnames}`}</p>
        </div>
      </div>

      <h6>Detalles de la venta</h6>
      <SaleTable
        products={sale.products.map(({ id, name, saleDetails: { quantity, unitPrice } }) => ({
          id,
          name,
          quantity,
          price: unitPrice,
        }))}
        subtotal={subtotal}
        discount={sale.discount}
        total={sale.total}
        detail={true}
      />
    </div>
  );
});

export default SaleDetail;
