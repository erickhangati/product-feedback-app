import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import Suggestions from '../components/suggestions/Suggestions';
import { ProductRequest } from '../data/data-types/types';
import { AppContext } from '../context/AppContext';

interface Props {
  results: ProductRequest[];
}

const HomePage: React.FC<Props> = ({ results }) => {
  // const appCtx = useContext(AppContext);

  // useEffect(() => {
  //   appCtx.setAppData((prev) => ({ ...prev, productRequests: results }));
  //   appCtx.setSuggestions(() =>
  //     results.filter((request) => request.status === 'suggestion')
  //   );
  // }, []);

  // return (
  //   <>
  //     <Head>
  //       <title>Home | Feedbacks</title>
  //       <meta name='description' content='Suggestions feedbacks.' />
  //     </Head>
  //     <Suggestions />
  //   </>
  // );

  return <h2>Home Page</h2>;
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
//       results,
//     },
//   };
// };

export default HomePage;
