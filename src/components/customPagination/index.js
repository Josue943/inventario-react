import { Pagination } from '@mui/material';

const CustomPagination = ({ onChangePage, pages }) => {
  if (pages <= 1) return null;

  return (
    <div className='pagination-container'>
      <Pagination count={pages} color='primary' size='large' onChange={onChangePage} />
    </div>
  );
};

export default CustomPagination;
