import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import CommentForm from '../components/CommentForm';
import Post from '../components/Post/Post';
import { FETCH_SINGLE_POST } from '../graphQL/posts/query';
import { IFetchSinglePostResponse } from '../graphQL/types';
import Comment from "../components/Comment"
import BackButton from '../components/BackButton';

const SinglePost = () => {
    const { id } = useParams() as { id: string }
    const { data, loading } = useQuery<IFetchSinglePostResponse>(FETCH_SINGLE_POST, { variables: { postId: id } })

    const post = data?.getPost;

    if (loading) {
        return <div className="">load</div>
    }


    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <BackButton />
            </div>
            <Post item={post!} />

            <div className="mt-7">
                <CommentForm />
            </div>

            <div className="mt-7">
                <h3 className="text-lg mb-5">Post Comments ({post?.commentsCount})</h3>
                <ul className="flex flex-col w-full gap-5">
                    {post && post.comments.length > 0
                        ? post?.comments.map(c => <Comment item={c} key={c.id} />)
                        : <div className="font-bold text-2xl text-center">Post have no comments</div>}
                </ul>
            </div>
        </div>
    );
};

export default SinglePost;