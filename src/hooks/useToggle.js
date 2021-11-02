import { useCallback, useState } from 'react';

const useToggle = () => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggle = useCallback(() => setOpen(prev => !prev), [open]);

  return { open, toggle };
};

export default useToggle;
