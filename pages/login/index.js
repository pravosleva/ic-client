import { useState } from 'react';
import styles from './index.module.scss';
import Block from '../../components/Block/Block';
import { useForm, FormProvider } from 'react-hook-form';
import AuthApi from '../../api/AuthApi';
import GuestLayout from '../../layouts/GuestLayout';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../contexts/AuthContext';

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const resetError = () => {
        setError(null);
    };
    const router = useRouter();

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const { isAuthLoading } = useAuthContext();

    const { handleSubmit, register, formState } = methods;
    const { isDirty, isValid } = formState;

    const onSubmit = async ({ username, password }) => {
        resetError();
        setSubmitting(true);

        await AuthApi.login(username, password)
            .then((_token) => {
                setSubmitting(false);

                router.push('/posts', '/posts', { shallow: true });
            })
            .catch((err) => {
                if (typeof err === 'string') setError(errSrt);
                setSubmitting(false);
            });
    };

    if (isAuthLoading) {
        return <div>Checking auth...</div>;
    }
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
                                {error && <div className="invalid-feedback d-block">{error}</div>}
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
