import { Footer, Navbar } from 'components/home';

import './styles.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='page-content'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
