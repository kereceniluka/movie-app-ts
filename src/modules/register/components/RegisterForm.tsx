import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

// assets
import logo from '@assets/images/logo.svg';

// services
import { firebaseAuth } from '@core/services/firebase';

// core
import FormInput from '@core/components/forms/FormInput';
import FormLabel from '@core/components/forms/FormLabel';
import InputWrapper from '@core/components/forms/InputWrapper';
import Button from '@core/components/forms/Button';
import FormWrapper from '@core/components/forms/FormWrapper';

type FormData = {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const schema = yup.object().shape({
    username: yup.string().min(6).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm: FC = () => {

    const history = useHistory();

    const methods = useForm<FormData>({ resolver: yupResolver(schema) });

    const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(firebaseAuth);

    const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
        try {
            await createUserWithEmailAndPassword(email, password);
            history.replace('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <img className="mb-6" src={logo} alt="logo" />
            <FormWrapper methods={methods} onSubmit={onSubmit}>
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="username" label="Username" />
                    <FormInput type="text" name="username" />
                </InputWrapper>
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="email" label="Email address" />
                    <FormInput type="email" name="email" />
                </InputWrapper>
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="password" label="Set password" />
                    <FormInput type="password" name="password" />
                </InputWrapper>
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="passwordConfirmation" label="Confirm password" />
                    <FormInput type="password" name="passwordConfirmation" />
                </InputWrapper>
                <Button type="submit" label="Sign Up" />
            </FormWrapper>
        </div>
    );
}

export default RegisterForm;
