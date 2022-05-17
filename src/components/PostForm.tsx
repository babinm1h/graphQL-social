import { useMutation } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_POST } from '../graphQL/posts/mutation';
import { FETCH_POSTS } from '../graphQL/posts/query';
import { IFetchPostsResponse } from '../graphQL/types';
import { validate } from '../utils/validate';


interface IFormFields {
    body: string
}

const PostForm = () => {
    const [createPost, { error, loading }] = useMutation(CREATE_POST, {
        update(proxy, result) {
            const data = proxy.readQuery<IFetchPostsResponse>({ query: FETCH_POSTS })
            if (data) {
                proxy.writeQuery({
                    query: FETCH_POSTS,
                    data: {
                        getPosts: [result.data.createPost, ...data.getPosts,]
                    }
                })
            }
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ body }) => {
        createPost({ variables: { body } })
        reset()
    }

    return (
        <form action="" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" id="body"
                placeholder="New post..."{...register("body", validate(400, 1))}
                className="border border-gray-300 rounded-md w-full p-2 focus:border-gray-400" />

            {error && <div className="text-red-700 my-2">{error.message}</div>}
            {errors.body && <div className="text-red-700 my-1">{errors.body.message}</div>}

            <button className="primaryBtn px-10 mt-4 self-start" type="submit" disabled={loading}>
                Create
            </button>
        </form>
    );
};

export default PostForm;