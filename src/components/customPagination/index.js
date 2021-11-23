import { Pagination } from '@mui/material';

const CustomPagination = ({ currentPage, onChangePage, pages }) => {
  if (pages <= 1) return null;

  return (
    <div className='pagination-container'>
      <Pagination count={pages} color='primary' size='large' onChange={onChangePage} page={currentPage} />
    </div>
  );
};

export default CustomPagination;
