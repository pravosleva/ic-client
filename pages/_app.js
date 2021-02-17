import Head from 'next/head';
import { Fragment } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/styles.scss';
// import Route from '../components/Route/Route';

export default function App({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <title>App</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                    crossOrigin="anonymous"
                />
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </Fragment>
    );
}
