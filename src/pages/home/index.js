import SearchBox from 'components/searchBox';

import './styles.scss';
import { Navbar } from 'components/home';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='home-container '>
        <SearchBox />
      </div>
    </>
  );
};

export default Home;
