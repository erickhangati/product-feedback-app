import React from 'react';
import NavRoadmap from '../components/nav/NavRoadmap';
import RoadmapList from '../components/roadmap/RoadmapList';
import { ProductRequest } from '../data/data-types/types';

interface Props {
  productRequests: ProductRequest[];
}

const RoadmapPage: React.FC<Props> = ({ productRequests }) => {
  return (
    <>
      <NavRoadmap />
      <RoadmapList productRequests={productRequests} />
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/product-requests');
  const { results } = await response.json();

  return {
    props: {
      productRequests: results,
    },
  };
};

export default RoadmapPage;
