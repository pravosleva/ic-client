import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import PostApi from '../../../utils/httpClient/api/PostsApi';

const PostEditForm = ({ post, onSubmitCallback }) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setSubmitting(true);

        try {
            await PostApi.savePost(data);
        } catch (e) {}

        setSubmitting(false);
        onSubmitCallback();
    };

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            title: post.title || '',
            body: post.body || ''
        }
    });

    const { handleSubmit, register, formState } = methods;
    const { isValid } = formState;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                </div>
                <div className="mb-2 row">
                    <label className="col-sm-2 col-form-label">Text</label>
                    <div className="col-sm-10">
                        <textarea
                            name="title"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                </div>
                <div className="text-end">
                    <button disabled={!isValid || isSubmitting} type="submit" className="btn-primary btn w-25 mt-3">
                        {isSubmitting && (
                            <span className="mx-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        )}
                        Save
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default PostEditForm;
