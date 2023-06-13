import React, { useContext } from 'react';
import Link from 'next/link';

import Upvotes from '../ui/upvotes/Upvotes';
import Badge from '../ui/badge/Badge';
import Comments from '../comments/Comments';

import { AppContext } from '../../context/AppContext';
import { ProductRequest } from '../../data/data-types/types';
import styles from './SuggestionItem.module.scss';

interface Props {
  suggestion: ProductRequest;
  className?: string;
}

const SuggestionItem: React.FC<Props> = ({ suggestion, className }) => {
  const { suggestions, setSuggestions, setFeedback } = useContext(AppContext);

  const upvoteHandler = async () => {
    const newVotes = suggestion.upvotes ? suggestion.upvotes + 1 : 1;

    // UPDATING SUGGESTIONS
    const suggestionIndex = suggestions.findIndex(
      (feedback) => feedback._id === suggestion._id
    );

    const newSuggestion = {
      ...suggestion,
      upvotes: newVotes,
    };

    const suggestionsCopy = [...suggestions];
    suggestionsCopy.splice(suggestionIndex, 1, newSuggestion);
    setSuggestions(() => suggestionsCopy);

    // UPDATING FEEDBACK
    setFeedback(() => newSuggestion);

    // UPDATING UPVOTES ON DATABASE
    const response = await fetch('/api/upvotes', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: suggestion._id, upvotes: newVotes }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div
      className={`${styles['suggestion-item']}${
        className ? ` ${className}` : ''
      }`}
    >
      <Upvotes votes={suggestion.upvotes} upvoteHandler={upvoteHandler} />

      <div className={styles['suggestion-description']}>
        <Link href={`/${suggestion._id}`}>
          <h3>{suggestion.title}</h3>
        </Link>
        <p>{suggestion.description}</p>
        <Badge>{suggestion.category}</Badge>
      </div>
      <Comments numberOfComments={suggestion.comments?.length} />
    </div>
  );
};

export default SuggestionItem;
