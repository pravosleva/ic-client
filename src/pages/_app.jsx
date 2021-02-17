import Head from 'next/head';
import { Fragment } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/styles.scss';

export default function App({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <title>App</title>
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </Fragment>
    );
}
