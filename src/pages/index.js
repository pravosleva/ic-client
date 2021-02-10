import { useState } from 'react';
import styles from '../styles/pages/index.module.scss';
import Block from '../components/Block/Block';
import { useForm, FormProvider } from 'react-hook-form';
import AuthApi from '../api/AuthApi';
import GuestLayout from '../layouts/GuestLayout';
import { useRouter } from 'next/router';
import { useApp } from '../contexts/AppContext';

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isError, setError] = useState(false);
    const router = useRouter();

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { handleSubmit, register, formState } = methods;
    const { isDirty, isValid } = formState;
    const { setUser } = useApp();

    const onSubmit = async ({ username, password }) => {
        setSubmitting(true);

        try {
            const token = await AuthApi.login(username, password);
            setSubmitting(false);

            localStorage.setItem('token', token);
            setUser(true);
            router.push('/posts');
        } catch (e) {
            setError(true)
            setSubmitting(false);
        }
    };

    return (
        <GuestLayout>
            <div className="col p-0 text-center d-flex justify-content-center align-items-center display-none">
                <img src="logo.svg" className="w-50" alt="Logo" />
            </div>
            <div
                className={`${styles['login-form-wrap']} col p-0 d-flex justify-content-center align-items-center flex-column w-100`}
            >
                <Block className="w-75">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Username"
                                    ref={register({
                                        required: true
                                    })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="************"
                                    ref={register({
                                        required: true
                                    })}
                                />
                                {isError && <div className="invalid-feedback d-block">
                                    Please enter valid credentials
                                </div>}
                            </div>


                            <button
                                disabled={!isDirty || !isValid || isSubmitting}
                                type="submit"
                                className="btn-primary btn w-100 mt-3"
                            >
                                {isSubmitting && (
                                    <span
                                        className="mx-2 spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )}
                                Login
                            </button>
                        </form>
                    </FormProvider>
                </Block>
            </div>
        </GuestLayout>
    );
};

export default Login;
