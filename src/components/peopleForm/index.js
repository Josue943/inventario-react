import { CustomInput, CustomSelect } from 'components/form';

const PeopleDetails = () => (
  <>
    <h5>Informacion Personal</h5>
    <div className='dual-input-form'>
      {personalOptions.map(({ select, ...rest }) => {
        const props = { ...rest, key: rest.name };
        if (select) return <CustomSelect {...props} />;
        return <CustomInput {...props} />;
      })}
    </div>
  </>
);

export default PeopleDetails;

const personalOptions = [
  { name: 'documentId', label: 'Numero de documento' },
  {
    name: 'documentType',
    label: 'Tipo de documento',
    select: true,
    options: [
      { label: 'Selecciona una opción', value: '' },
      { label: 'DIMEX', value: 'dimex' },
      { label: 'TIN', value: 'tin' },
      { label: 'Cédula Física/Jurídica', value: 'cedula' },
      { label: 'Licencia', value: 'licencia' },
      { label: 'Pasaporte', value: 'pasaporte' },
      { label: 'otro', value: 'other' },
    ],
  },
  { name: 'name', label: 'Nombre' },
  { name: 'surnames', label: 'Apellidos' },
  { name: 'phone', label: 'Telefono' },
  { name: 'email', label: 'Correo Electronico' },
];
