import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

// assets
import logo from '@assets/images/logo.svg';

// core
import FormWrapper from '@core/components/forms/FormWrapper';
import FormInput from '@core/components/forms/FormInput';
import FormLabel from '@core/components/forms/FormLabel';
import InputWrapper from '@core/components/forms/InputWrapper';
import Button from '@core/components/forms/Button';

// services
import { firebaseAuth } from '@core/services/firebase';

type FormData = {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(20).required(),
});

const LoginForm: FC = () => {

    const history = useHistory();

    const methods = useForm<FormData>({ resolver: yupResolver(schema) });

    const [ signInWithEmailAndPassword, user, loading, error ] = useSignInWithEmailAndPassword(firebaseAuth);

    const onSubmit: SubmitHandler<any> = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(email, password);
            history.replace('/');
        } catch (error) {
            console.error(error);
        }
    }

    console.log(user);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <img className="mb-6" src={logo} alt="logo" />
            <FormWrapper methods={methods} onSubmit={onSubmit}>
                {error && <p className="text-red-600 font-bold">{error?.message}</p>}
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="email" label="Email address" />
                    <FormInput type="email" name="email" />
                </InputWrapper>
                <InputWrapper flexDirection="flex-col">
                    <FormLabel htmlFor="password" label="Password" />
                    <FormInput type="password" name="password" />
                </InputWrapper>
                <Button type="submit" label="Log In" />
            </FormWrapper>
        </div>
    );
}

export default LoginForm;
