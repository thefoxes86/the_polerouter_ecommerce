import Head from 'next/head';
import { AppProvider } from './context/AppContext';
import Header from './Header';
import Footer from './Footer';
import client from './ApolloClient';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import { Helmet } from 'react-helmet';
import TransitionPages from '../components/TransitionPages';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Layout = (props) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <div>
          <Helmet>
            <Head>
              <title>The Polerouter Book</title>
            </Head>
          </Helmet>
          <Header />
          {props.children}
          <Footer />
        </div>
      </ApolloProvider>
    </AppProvider>
  );
};

export default Layout;
