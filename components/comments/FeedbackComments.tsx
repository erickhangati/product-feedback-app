import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import Button from '../ui/button/Button';
import ReplyForm from './ReplyForm';
import Login from '../login/Login';

import { ProductRequest } from '../../data/data-types/types';
import styles from './FeedbackComments.module.scss';

interface Props {
  request: ProductRequest;
}

const FeedbackComments: React.FC<Props> = ({ request }) => {
  const lastLiRef = useRef<HTMLLIElement>(null);
  const [divHeight, setDivHeight] = useState(0);
  const calculatedHeight = `calc(100% - ${divHeight}px)`;
  const [isReplying, setIsReplying] = useState<string | null>(null);
  const [isLogging, setIsLogging] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const lastLiElement = lastLiRef.current;
    if (lastLiElement) {
      const lastLiHeight = lastLiElement.offsetHeight;
      setDivHeight(lastLiHeight);
    }
  }, []);

  const replyButtonHandler = (id: string) => {
    if (!session) setIsLogging(() => true);
    if (isReplying && isReplying === id) setIsReplying(() => null);
    else setIsReplying(() => id);
  };

  return (
    <>
      {!session && isLogging && <Login />}
      <div className={styles['feedback-comments']}>
        <div className={styles.comments}>
          <h3>
            {request.comments?.length} Comment
            {request.comments ? (request.comments?.length > 1 ? 's' : '') : ''}
          </h3>

          {/* COMMENTS */}
          <ul className={styles['comments-list']}>
            {request.comments?.map((item) => {
              return (
                <li
                  key={Math.random()}
                  className={`${styles['comments-list__item']}${
                    item.replies?.length === 0
                      ? ` ${styles['comments-list__item-no-replies']}`
                      : ''
                  }`}
                >
                  {item.replies && item.replies.length > 0 && (
                    <div
                      style={{ height: calculatedHeight }}
                      className={styles['comment-line']}
                    ></div>
                  )}
                  <Image
                    src={item.user.image}
                    alt={item.user.name}
                    width={40}
                    height={40}
                  />
                  <div className={styles['comment-header']}>
                    <div className={styles['comment-header__names']}>
                      <h4>{item.user.name}</h4>
                      <span>@{item.user.username}</span>
                    </div>
                    <Button
                      className={`${styles['comment-reply']}${
                        isReplying && isReplying === item._id
                          ? ` ${styles['comment-reply--cancel']}`
                          : ''
                      }`}
                      onClick={replyButtonHandler.bind(null, item._id)}
                    >
                      {isReplying && isReplying === item._id
                        ? 'Cancel Reply'
                        : 'Reply'}
                    </Button>
                  </div>
                  <p className={styles['comment-text']}>{item.content}</p>

                  {/* REPLY COMMENT FORM */}
                  {isReplying && isReplying === item._id && (
                    <ReplyForm
                      className={styles['reply-form']}
                      replyingTo={item.user._id}
                      commentId={item._id}
                      setIsReplying={setIsReplying}
                    />
                  )}

                  {/* COMMENT REPLIES */}
                  <ul className={styles.replies}>
                    {item.replies?.map((reply, index) => {
                      return (
                        <li
                          key={Math.random()}
                          className={styles['replies__item']}
                          ref={
                            index + 1 === item.replies?.length
                              ? lastLiRef
                              : null
                          }
                        >
                          <Image
                            src={reply.user.image}
                            alt={reply.user.name}
                            width={40}
                            height={40}
                          />

                          <div className={styles['comment-header']}>
                            <div className={styles['comment-header__names']}>
                              <h4>{reply.user.name}</h4>
                              <span>@{reply.user.username}</span>
                            </div>

                            <Button
                              className={`${styles['comment-reply']}${
                                isReplying && isReplying === reply._id
                                  ? ` ${styles['comment-reply--cancel']}`
                                  : ''
                              }`}
                              onClick={replyButtonHandler.bind(null, reply._id)}
                            >
                              {isReplying && isReplying === reply._id
                                ? 'Cancel Reply'
                                : 'Reply'}
                            </Button>
                          </div>

                          <p className={styles['comment-text']}>
                            <span>@{reply.replyingTo.username}</span>{' '}
                            {reply.content}
                          </p>

                          {/* REPLY COMMENT FORM */}
                          {isReplying && isReplying === reply._id && (
                            <ReplyForm
                              className={styles['reply-form']}
                              replyingTo={reply.user._id}
                              commentId={item._id}
                              setIsReplying={setIsReplying}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FeedbackComments;
