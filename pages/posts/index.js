import PostsApi from '../../api/PostApi';

const Posts = ({ posts, error }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(({ id, title }) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export async function getServerSideProps() {
    const ITEMS_PER_PAGE = 10;

    const posts = await PostsApi.getPosts();

    return {
        props: {
            posts
        }
    };
}

export default Posts;
