import UsersApi from '../../utils/httpClient/api/UsersApi';
import Table from '../../common/components/Table/Table';
import { useRouter } from 'next/router';
import PrivateLayout from '../../common/layouts/PrivateLayout';

const cols = [
    {
        id: 'id',
        title: '#'
    },
    {
        id: 'name',
        title: 'Name'
    },
    {
        id: 'username',
        title: 'Username'
    },
    {
        id: 'email',
        title: 'Email'
    }
];

const Users = ({ users, errors }) => {
    const router = useRouter();

    const editUser = (item) => {
        router.push(`/users/${item.id}`);
    };

    return (
        <PrivateLayout>
            {errors && <div>Error in fetch</div>}
            <Table itemsPerPage={5} data={users} cols={cols} actionHandler={editUser} />
        </PrivateLayout>
    );
};

export async function getServerSideProps() {
    let users = null;
    let errors = null;

    try {
        users = await UsersApi.getUsers();
    } catch (e) {
        errors = {
            statusCode: 404
        };
    }

    return {
        props: {
            users,
            errors
        }
    };
}

export default Users;
