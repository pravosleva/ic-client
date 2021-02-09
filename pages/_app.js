import Head from 'next/head';
import { Fragment } from 'react';
import { AppProvider } from '../contexts/AppContext';
import '../styles/styles.scss';
import Route from '../components/route/route';

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
            <AppProvider>
                <Route>
                    <Component {...pageProps} />
                </Route>
            </AppProvider>
        </Fragment>
    );
}
