import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import Suggestions from '../components/suggestions/Suggestions';
import { ProductRequest } from '../data/data-types/types';
import { AppContext } from '../context/AppContext';

interface Props {
  results: ProductRequest[];
}

const HomePage: React.FC<Props> = ({ results }) => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    if (results && !appCtx.suggestions && !appCtx.appData) {
      appCtx.setAppData((prev) => ({ ...prev, productRequests: results }));
      appCtx.setSuggestions(() =>
        results.filter((request) => request.status === 'suggestion')
      );
    }
  }, [results, appCtx.suggestions, appCtx.appData]);

  return (
    <>
      <Head>
        <title>Feedbacks | Suggetions</title>
        <meta name='description' content='Suggestions feedbacks.' />
      </Head>
      <Suggestions />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.DOMAIN}/api/product-requests`);
  const { results } = await response.json();

  if (!results) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      results,
    },
    revalidate: 5,
  };
};

export default HomePage;
