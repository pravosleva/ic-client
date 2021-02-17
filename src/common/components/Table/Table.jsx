import { useState } from 'react';
import { useRouter } from 'next/router';

function paginate (array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const Table = ({ cols, data, itemsPerPage, actionHandler }) => {
    const router = useRouter();
    const currentRoute = router.route;

    const pagesCount = Math.ceil(data.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(+router.query.page || 1);
    const paginatedData = paginate(data, itemsPerPage, currentPage);

    const rows = cols.filter(col => col.type !== 'action');

    const nextPage = (e) => {
        e.preventDefault();

        if (currentPage === pagesCount) {
            return;
        }

        setCurrentPage(currentPage + 1);
        router.push({ pathname: currentRoute, query: { page: currentPage + 1 } })
    }

    const prevPage = (e) => {
        e.preventDefault();

        if (currentPage === 1) {
            return;
        }

        setCurrentPage(currentPage - 1);
        router.push({ pathname: currentRoute, query: { page: currentPage - 1 } })
    }

    const goToPage = (e, page) => {
        e.preventDefault();
        setCurrentPage(page);
        router.push({ pathname: currentRoute, query: { page } })
    }

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    {cols.map(({ id, title }) => (
                        <th key={id} scope="col">{title}</th>
                    ))}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, key) => (
                        <tr key={key}>
                            {rows.map(({ id }) => (
                                <td key={id} scope="col">{paginatedData[key][id]}</td>
                            ))}
                            <td>
                                <button className="btn btn-primary" onClick={() => actionHandler(item)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${ currentPage === 1 && ' disabled'}`}>
                        <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                    </li>

                    {[...Array(pagesCount).keys()].map((_, index) => {
                        const currentIndex = index + 1;
                        const isActive = currentIndex === currentPage;

                        return (
                            <li key={index} className={`page-item d-none d-md-inline-block ${ isActive && ' active'}`}>
                                {isActive ?
                                    <span className="page-link">{currentIndex}</span> :
                                    <a className="page-link" href="#" onClick={(e) => goToPage(e, currentIndex)}>
                                        {currentIndex}
                                    </a>
                                }
                            </li>
                        )
                    })}

                    <li className={`page-item ${ currentPage === pagesCount && ' disabled'}`}>
                        <a className="page-link" href="#" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Table;
