import React, { useEffect, useState } from 'react';
import { ProductRequest } from '../data/data-types/types';
import { GetStaticProps } from 'next';

interface Props {
  results: ProductRequest[];
}

const test: React.FC<Props> = ({ results }) => {
  const [feedbacks, setFeedbacks] = useState<ProductRequest[] | null>(null);

  useEffect(() => {
    if (results) {
      setFeedbacks(() => results);
    }
  }, [results]);

  if (!feedbacks) return <h2>Loading...</h2>;

  console.log(feedbacks);

  return (
    <ul>
      {feedbacks.map((feedback) => (
        <li key={feedback._id}>{feedback.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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
  };
};

export default test;
