import { FormProvider } from 'react-hook-form';

const CustomForm = ({ children, methods, onSubmit }) => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
  </FormProvider>
);

export default CustomForm;
