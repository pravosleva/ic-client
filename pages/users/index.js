import UsersApi from '../../api/UsersApi';
import Table from '../../components/Table/Table';
import { useRouter } from 'next/router';

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

const Users = ({ users, error }) => {
    const router = useRouter();

    const editUser = (item) => {
        router.push(`/users/${item.id}`);
    }

    return (
        <Table itemsPerPage={5} data={users} cols={cols} actionHandler={editUser} />
    )
}

export async function getServerSideProps() {
    const users = await UsersApi.getUsers();

    return {
        props: {
            users
        }
    };
}

export default Users;