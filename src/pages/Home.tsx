import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import Post from '../components/Post/Post';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS } from '../graphQL/posts/query';
import { IFetchPostsResponse } from '../graphQL/types';


const Home = () => {
    const { loading, data } = useQuery<IFetchPostsResponse>(FETCH_POSTS)
    const { user } = useContext(AuthContext)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h1 className="font-bold text-2xl text-center">Recent posts</h1>
            <section className="pt-5">
                <div className="mb-10">
                    {user && <PostForm />}
                </div>
                <ul className="flex flex-col gap-5">
                    {data?.getPosts.map(p => <Post key={p.id} item={p} />)}
                </ul>
            </section>
        </>
    );
};

export default Home;