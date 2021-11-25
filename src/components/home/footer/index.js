import { Facebook, Instagram } from '@mui/icons-material';
import './styles.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>
        <h6>Acuario Paisajismo Plantado</h6>
        <p>
          La mejor asesoria y los mejores productos para el cuidado y mantenimiento de tu acuario. Nos especializamos en
          el arte del pasajismo acuatico
        </p>
      </div>
      <div className='footer-middle'>
        <h6 className='text-center'> Siguenos en las redes</h6>
        <div className='footer-socials'>
          <Facebook className='svg-margin' />
          <Instagram />
        </div>
        <div className='footer-info'>
          <p>Dirección: San Diego, La unión, Cartago, 200 metros oeste del mini súper Montufar alameda HI</p>
          <p>Contacto: 7213 1613</p>
        </div>
      </div>
      <div className='footer-rigth'>
        <h6>Acerca de nosotros</h6>
        <p className='footer-margin'>
          Misión: Darle al cliente una asesoría personalizada referente al cuido real de los peces y plantas.
        </p>
        <p>
          Visión: Ser calificados como el mejor negocio del país en el arte del paisajismo acuático, con la mayor
          variedad de peces y servicio de calidad.
        </p>
      </div>
    </div>
  );
};

export default Footer;
