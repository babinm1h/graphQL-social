import { useMutation } from '@apollo/client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { CREATE_COMMENT } from '../graphQL/comments/mutation';
import { FETCH_SINGLE_POST } from '../graphQL/posts/query';
import { ICreateCommentResponse, IFetchSinglePostResponse } from '../graphQL/types';
import { validate } from '../utils/validate';

interface IFormFields {
    body: string
}

const CommentForm = () => {
    const { id } = useParams() as { id: string }

    const [createComment, { error, loading }] = useMutation<ICreateCommentResponse>(CREATE_COMMENT, {
        update(proxy, result) {
            const data = proxy.readQuery<IFetchSinglePostResponse>({ query: FETCH_SINGLE_POST, variables: { postId: id } })
            if (data && result) {
                const updated = { ...data.getPost, comments: [...data.getPost.comments, result.data?.createComment], commentsCount: data.getPost.commentsCount + 1 }
                proxy.writeQuery({ query: FETCH_SINGLE_POST, data: { getPost: updated } })
            }
        }
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ body }) => {
        createComment({ variables: { postId: id, body } })
        reset()
    }

    return (
        <form action="" className="" onSubmit={handleSubmit(onSubmit)}>

            <input type="text" placeholder="New comment"{...register("body", validate(400, 1))}
                className="p-2 border border-gray-300 w-full rounded-lg focus:border-gray-400" />

            {errors.body && <div className="my-2 text-red-700">{errors.body.message}</div>}
            {error && <div className="my-2 text-red-700">{error.message}</div>}

            <button className="primaryBtn px-10 mt-2" disabled={loading}>
                Comment
            </button>
        </form>
    );
};

export default CommentForm;