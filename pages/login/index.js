import { useState } from 'react';
import styles from './index.module.scss';
import Block from '../../components/Block/Block';
import { useForm, FormProvider } from 'react-hook-form';
import AuthApi from '../../api/AuthApi';

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isError, setError] = useState(false);

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { handleSubmit, register, formState } = methods;
    const { isDirty, isValid } = formState;

    const onSubmit = async ({ username, password }) => {
        setSubmitting(true);

        try {
            await AuthApi.login(username, password);
            setSubmitting(false);
        } catch (e) {
            setSubmitting(false);
        }
    };

    return (
        <>
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
                            </div>

                            {isError && <span>123</span>}

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
        </>
    );
};

export default Login;
