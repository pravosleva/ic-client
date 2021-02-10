import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import PostApi from '../../api/PostsApi';
import Table from '../../components/Table/Table';
import PostEditForm from '../../components/Posts/PostEditForm';

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

const Posts = ({ posts, error }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    const openEditModal = (item) => {
        setModalOpen(true);
        setCurrentPost(item);
    }

    const onCloseModal = () => {
        setModalOpen(false);
        setCurrentPost(null);
    }

    return (
        <>
            <Table itemsPerPage={15} data={posts} cols={cols} actionHandler={openEditModal} />
            {currentPost &&
                <Modal open={modalOpen} onClose={onCloseModal} center classNames={{ modal: 'w-50' }}>
                    <h2>Edit post {currentPost.id}</h2>
                    <div className="row pt-3">
                        <div className="col-12">
                            <PostEditForm post={currentPost} onSubmitCallback={onCloseModal} />
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export async function getServerSideProps() {
    const posts = await PostApi.getPosts();

    return {
        props: {
            posts
        }
    };
}

export default Posts;
