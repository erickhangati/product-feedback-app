import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Login from '../components/login/Login';

const users = () => {
  const [isLogging, setIsLogging] = useState(true);
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  const handleReply = () => {
    setIsLogging(() => true);
  };
  return (
    <>
      {!isLogging && <span onClick={handleReply}>Reply</span>}
      {session && status !== 'loading' && isLogging && (
        <form>
          <textarea name='reply' id='reply' rows={5}></textarea>
          <button>Reply</button>
        </form>
      )}
      {!session && status !== 'loading' && isLogging && <Login />}
    </>
  );
};

export default users;
