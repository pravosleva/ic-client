import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import PostApi from '../../utils/httpClient/api/PostsApi';
import Table from '../../common/components/Table/Table';
import PostEditForm from '../../common/components/Posts/PostEditForm';
import PrivateLayout from '../../common/layouts/PrivateLayout';

const cols = [
    {
        id: 'id',
        title: '#'
    },
    {
        id: 'title',
        title: 'Title'
    }
];

const Posts = ({ posts, errors }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    const openEditModal = (item) => {
        setModalOpen(true);
        setCurrentPost(item);
    };

    const onCloseModal = () => {
        setModalOpen(false);
        setCurrentPost(null);
    };

    return (
        <PrivateLayout>
            {errors && <div>Error in fetch</div>}
            {posts && <Table itemsPerPage={15} data={posts} cols={cols} actionHandler={openEditModal} />}
            {currentPost && (
                <Modal open={modalOpen} onClose={onCloseModal} center classNames={{ modal: 'w-75' }}>
                    <h2>Edit post {currentPost.id}</h2>
                    <div className="row pt-3">
                        <div className="col-12">
                            <PostEditForm post={currentPost} onSubmitCallback={onCloseModal} />
                        </div>
                    </div>
                </Modal>
            )}
        </PrivateLayout>
    );
};

export async function getServerSideProps() {
    let posts = null;
    let errors = null;

    try {
        posts = await PostApi.getPosts();
    } catch (e) {
        errors = {
            statusCode: 404
        };
    }

    return {
        props: {
            posts,
            errors
        }
    };
}

export default Posts;
