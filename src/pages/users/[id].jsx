import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import UsersApi from '~/utils/httpClient/api/UsersApi';

import styles from './User.module.scss';
import PrivateLayout from '~/common/layouts/PrivateLayout';

const User = ({ user, error }) => {
    const router = useRouter();
    const [isSubmitting, setSubmitting] = useState(false);

    const userForm = {
        ...['name', 'username', 'email', 'phone', 'website'].reduce((mem, key) => ({ ...mem, [key]: user[key] }), {})
    };

    const methods = useForm({
        mode: 'onChange',
        defaultValues: userForm
    });

    const { handleSubmit, register } = methods;

    const onSubmit = async (data) => {
        setSubmitting(true);

        try {
            await UsersApi.saveUser(data);
            router.push('/users');
        } catch (e) {}

        setSubmitting(false);
    };

    return (
        <PrivateLayout>
            <h1>User Edit</h1>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {Object.keys(userForm).map((input) => {
                        return (
                            <div className="mb-3 row" key={input}>
                                <label className={`${styles['form-input-name']} col-sm-2 col-form-label`}>
                                    {input}
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name={input}
                                        className="form-control"
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="text-end">
                        <button disabled={isSubmitting} type="submit" className="btn-primary btn w-25 mt-3">
                            {isSubmitting && (
                                <span
                                    className="mx-2 spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )}
                            Save
                        </button>
                    </div>
                </form>
            </FormProvider>
        </PrivateLayout>
    );
};

export async function getServerSideProps(context) {
    const user = await UsersApi.getUser(context.params.id);

    return {
        props: {
            user
        }
    };
}

export default User;
