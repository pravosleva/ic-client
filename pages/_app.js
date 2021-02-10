import Head from 'next/head';
import { Fragment } from 'react';
import { AppProvider } from '../contexts/AppContext';
import '../styles/styles.scss';

export default function App({ Component, pageProps }) {
    return (
        <Fragment>
            <Head>
                <title>App</title>
            </Head>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </Fragment>
    );
}
