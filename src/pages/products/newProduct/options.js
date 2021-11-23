import moment from 'moment';
import * as yup from 'yup';

export const optionsMain = [
  { name: 'barCode', label: 'Codigo de barras' },
  { name: 'name', label: 'Nombre' },
];

export const options = [
  { name: 'price', label: 'Precio Venta', type: 'number' },
  { name: 'discount', label: 'Descuento', type: 'number' },
  { name: 'brand', label: 'Marca' },
  {
    name: 'enabled',
    label: 'Estado del producto',
    select: true,
    options: [
      { label: 'habilitado', value: 1 },
      { label: 'desabilitado', value: 0 },
    ],
  },
  {
    name: 'warranty',
    label: 'Garantia',
    select: true,
    options: [
      { label: 'NA', value: '' },
      { label: 'Días', value: 'days' },
      { label: 'semanas', value: 'weeks' },
      { label: 'mes', value: 'months' },
      { label: 'año', value: 'years' },
    ],
  },
  {
    name: 'presentation',
    label: 'Presentación del producto',
    select: true,
    options: [
      { label: 'Selecciona una opción', value: '' },
      { label: 'kilogramo', value: 'kg' },
      { label: 'unidad', value: 'unit' },
      { label: 'libra', value: 'lb' },
      { label: 'gramo', value: 'g' },
      { label: 'caja', value: 'box' },
      { label: 'paquete', value: 'package' },
      { label: 'galón', value: 'gallon' },
      { label: 'botella', value: 'bottle' },
      { label: 'saco', value: 'coat' },
      { label: 'otro', value: 'other' },
    ],
  },
  { name: 'stock', label: 'Stock o existencias', type: 'number' },
  { name: 'minStock', label: 'Stock mínimo', type: 'number' },
];

export const defaultSelectOption = { label: 'Selecciona una opción', value: '' };

export const radioOptions = [
  { label: 'No vence', value: 0 },
  { label: 'Si vence', value: 1 },
];

export const schema = yup.object({
  barCode: yup.string().trim().required('El Codigo de barras es obligatorio'),
  name: yup.string().trim().required('El nombre es obligatorio'),
  stock: yup.number().typeError('El stock solo debe incluir numeros').min(0, 'El stock no puede ser menor a 0'),
  minStock: yup
    .number()
    .min(0, 'El stock minimo no puede ser menor a 0')
    .typeError('El stock minimo solo debe incluir numeros'),
  price: yup.number().min(0, 'El precio no puede ser menor a 0').typeError('El precio solo debe incluir numeros'),
  discount: yup
    .number()
    .min(0, 'El descuento no puede ser menor a 0')
    .typeError('El descuento solo debe incluir numeros'),
  presentation: yup.string().required('La presentacion es obligatoria'),
});

export const defaultValues = {
  barCode: '',
  name: '',
  minStock: 0,
  stock: 0,
  price: 0,
  discount: 0,
  brand: '',
  enabled: 1,
  presentation: '',
  warranty: '',
  expiration: new Date(),
  supplierId: '',
  categoryId: '',
  hasExpiration: 0,
};
