import React from 'react';
import NavRoadmap from '../components/nav/NavRoadmap';
import RoadmapList from '../components/roadmap/RoadmapList';
import { ProductRequest } from '../data/data-types/types';

interface Props {
  productRequests: ProductRequest[];
}

const RoadmapPage: React.FC<Props> = ({ productRequests }) => {
  // return (
  //   <>
  //     <NavRoadmap />
  //     <RoadmapList productRequests={productRequests} />
  //   </>
  // );

  return <h2>Roadmap</h2>;
};

// export const getStaticProps = async () => {
//   const response = await fetch(`${process.env.DOMAIN}/api/product-requests`);
//   const { results } = await response.json();

//   if (!results) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       productRequests: results,
//     },
//   };
// };

export default RoadmapPage;
