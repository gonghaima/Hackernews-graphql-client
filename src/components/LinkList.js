import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Link from './Link';

const FEED_QUERY = gql`
    query{
        feed{
            id
            description
            url
        }
    }
`;

const FEED_SUBSCRIPTION = gql`
    subscription {
        newLink {
            id
            description
            url
            postedBy {
                name
                email
            }
            votes {
                link {
                    url
                    description
                }
            }
        }
    }
`;

const LinkList = () => {
    const { subscribeToMore, data } = useQuery(FEED_QUERY);
    subscribeToMore({
        document: FEED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            // this updateQuery triggered twice somehow, check if the new data has been included before merge in again.
            if (prev.feed.map(fd => fd.id).includes(subscriptionData.data.newLink.id)) return prev;
            return Object.assign({}, prev, {
                feed: [subscriptionData.data.newLink, ...prev.feed]
            });
        }
    });
    return (
        <div>
            {data && (
                <>
                    {data.feed.map((link) => (
                        <Link key={link.id} link={link} />
                    ))}
                </>
            )}
        </div>
    );
};

export default LinkList;