import { FC } from 'react';
import { FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';

interface IFormWrapper {
    methods: UseFormReturn<any>;
    onSubmit: SubmitHandler<any>;
}

const FormWrapper: FC<IFormWrapper> = ({ methods, onSubmit, children }) => {
    return (
        <FormProvider {...methods}>
            <form className="md:w-4/6 lg:w-3/6 xl:w-2/6 bg-gray-100 px-12 py-5 rounded-lg shadow-md" onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
}

export default FormWrapper;
