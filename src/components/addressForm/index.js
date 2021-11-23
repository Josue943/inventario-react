import { CustomInput, CustomSelect } from 'components/form';

import './styles.scss';

const AddressForm = () => (
  <>
    <h5>Información de residencia</h5>
    <div className='address-row'>
      {options.map(({ select, ...rest }) => {
        const props = { ...rest, key: rest.name };
        if (select) return <CustomSelect {...props} />;
        return <CustomInput {...props} />;
      })}
    </div>
  </>
);

export default AddressForm;

const options = [
  {
    name: 'province',
    select: true,
    label: 'Provincia',
    options: [
      { label: 'Seleccione una', value: '' },
      { label: 'Alajuela', value: 'alajuela' },
      { label: 'San Jose', value: 'san jose' },
      { label: 'Heredia', value: 'heredia' },
      { label: 'Guanacaste', value: 'guanacaste' },
      { label: 'Cartago', value: 'cartago' },
      { label: 'Puntarenas', value: 'puntarenas' },
      { label: 'Limon', value: 'limon' },
    ],
  },
  { name: 'canton', label: 'Canton' },
  { name: 'district', label: 'Distrito' },
];
