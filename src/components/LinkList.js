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

const LinkList = () => {
    const { data } = useQuery(FEED_QUERY);
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