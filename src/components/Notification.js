import { useSubscription, gql } from '@apollo/client';
import React from 'react';

const VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        url
        description
      }
      user {
        name
        email
      }
    }
  }
`;

const Notification = () => {
    const { data } = useSubscription(VOTES_SUBSCRIPTION);
    return (
        <div>
            {data && data.newVote && (
                <>
                    <h1>new vote added</h1>
                    <p>vote id {data.newVote.id}</p>
                    <h2>Link</h2>
                    <p>link url: {data.newVote.link.url}</p>
                    <p>link description: {data.newVote.link.description}</p>
                    <h2>User</h2>
                    <p>user name: {data.newVote.user.name}</p>
                    <p>user email: {data.newVote.user.email}</p>
                </>
            )}

            {/* {data && <p>${JSON.stringify(data)}</p>} */}
        </div>
    );
};

export default Notification;