import moment from 'moment';

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

export const defaultState = {
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
  expiration: moment(),
  supplierId: '',
  categoryId: '',
  hasExpiration: 0,
};

export const defaultSelectOption = { label: 'Selecciona una opción', value: '' };

export const radioOptions = [
  { label: 'No vence', value: 0 },
  { label: 'Si vence', value: 1 },
];
