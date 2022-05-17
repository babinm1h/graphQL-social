import { useQuery } from '@apollo/client';
import React from 'react';
import Post from '../components/Post/Post';
import PostForm from '../components/PostForm';
import { FETCH_POSTS } from '../graphQL/posts/query';
import { IFetchPostsResponse } from '../graphQL/types';


const Home = () => {
    const { loading, data } = useQuery<IFetchPostsResponse>(FETCH_POSTS)


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h1 className="font-bold text-2xl text-center">Recent posts</h1>
            <section className="pt-5">
                <div className="mb-10">
                    <PostForm />
                </div>
                <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {data?.getPosts.map(p => <Post key={p.id} item={p} />)}
                </ul>
            </section>
        </>
    );
};

export default Home;