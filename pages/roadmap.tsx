import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import NavRoadmap from '../components/nav/NavRoadmap';
import RoadmapList from '../components/roadmap/RoadmapList';
import { ProductRequest } from '../data/data-types/types';
import { AppContext } from '../context/AppContext';

interface Props {
  productRequests: ProductRequest[];
}

const RoadmapPage: React.FC<Props> = ({ productRequests }) => {
  const { appData, setAppData, suggestions, setSuggestions } =
    useContext(AppContext);

  useEffect(() => {
    if (productRequests && !suggestions && !appData) {
      setAppData((prev) => ({
        ...prev,
        productRequests: productRequests,
      }));

      setSuggestions(() =>
        productRequests.filter((request) => request.status === 'suggestion')
      );
    }
  }, [productRequests, suggestions, appData]);

  if (!appData?.productRequests) return <h2>Loading...</h2>;

  return (
    <>
      <Head>
        <title>Feedbacks Roadmap | Planned, In Progess, Live</title>
        <meta name='description' content='Suggestions feedbacks.' />
      </Head>
      <NavRoadmap />
      <RoadmapList productRequests={appData.productRequests} />
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
      productRequests: results,
    },
    revalidate: 5,
  };
};

export default RoadmapPage;
