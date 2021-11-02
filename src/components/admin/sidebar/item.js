import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';

import useToggle from 'hooks/useToggle';
import { useHistory } from 'react-router-dom';

const Item = ({ name, Icon, options = [] }) => {
  const { open, toggle } = useToggle();
  const history = useHistory();

  return (
    <div className='sidebar-item pointer'>
      <div className='sidebar-item-content' onClick={toggle}>
        <Icon />
        <span>{name}</span>
        <ArrowDownIcon className={`arrow-down-icon ${open ? 'arrow-down-rotate' : ''} `} />
      </div>
      {open &&
        options.map(({ Icon, name, to }) => (
          <div className='sidebar-item-option' onClick={() => history.push(to)} key={name}>
            <Icon />
            <span>{name}</span>
          </div>
        ))}
    </div>
  );
};

export default Item;
