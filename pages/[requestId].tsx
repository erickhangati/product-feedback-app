import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Feedback from '../components/feedback/Feedback';
import FeedbackComments from '../components/comments/FeedbackComments';
import CommentsForm from '../components/comments/CommentsForm';

import { AppContext } from '../context/AppContext';
import { ProductRequest } from '../data/data-types/types';

interface Props {
  request: ProductRequest;
}

interface MyContext {
  params: {
    requestId: string;
  };
}

const RequestDetails: React.FC<Props> = ({ request }) => {
  const { data: session, status } = useSession();
  const { feedback, setFeedback } = useContext(AppContext);

  useEffect(() => {
    if (request) {
      setFeedback(() => request);
    }
  }, [request]);

  if (!feedback) return <h2>Loading...</h2>;

  return (
    <>
      <Head>
        <title>{`Feedback | ${feedback.title}`}</title>
        <meta name='description' content={`Feedback - ${feedback.title}`} />
      </Head>
      <Feedback request={feedback} />
      {feedback.comments.length > 0 && <FeedbackComments request={feedback} />}
      <CommentsForm requestId={feedback._id} userEmail={session?.user.email} />
    </>
  );
};

const getData = async () => {
  const response = await fetch(`${process.env.DOMAIN}/api/product-requests`);
  const { results } = await response.json();
  return results;
};

// export const getStaticPaths = async () => {
//   const productRequests = await getData();
//   const paths = productRequests.map((item: ProductRequest) => ({
//     params: { requestId: item._id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async (context: MyContext) => {
//   const { requestId } = context.params;
//   const productRequests = await getData();
//   const request = productRequests.find(
//     (item: ProductRequest) => item._id.toString() === requestId
//   );

//   if (!request) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       request,
//     },
//     revalidate: 2,
//   };
// };

export const getServerSideProps = async (context: MyContext) => {
  const { requestId } = context.params;
  const productRequests = await getData();
  const request = productRequests.find(
    (item: ProductRequest) => item._id.toString() === requestId
  );

  if (!request) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      request,
    },
  };
};

export default RequestDetails;
