import { useMutation } from '@apollo/client';
import { TrashIcon } from '@heroicons/react/outline';
import { FC, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../context/auth';
import { DELETE_COMMENT } from '../graphQL/comments/mutation';
import { IDeleteCommentResponse } from '../graphQL/types';
import { IComment } from '../types/models';
import { getPostDate } from '../utils/getDate';

interface ICommentProps {
    item: IComment
}

const Comment: FC<ICommentProps> = ({ item }) => {
    const { user } = useContext(AuthContext)
    const { id } = useParams() as { id: string }

    const [deleteComment, { loading }] = useMutation<IDeleteCommentResponse>(DELETE_COMMENT, {
        
    })


    const handleDelete = () => {
        deleteComment({ variables: { commentId: item.id, postId: id } })
    }

    return (
        <li className="shadow-xs p-5">
            <div className="flex items-center gap-3">
                <img src={item.user.avatar} alt="user" className="h-7 w-7 rounded-[50%]" />
                <p className="flex-auto">{item.user.username}</p>
                <span className="text-xs text-gray-400 flex items-center gap-2">
                    {getPostDate(Number(item.createdAt))}
                    {user && user.id === item.user.id
                        && <button onClick={handleDelete}>
                            <TrashIcon className="h-4 w-4 text-red-700" />
                        </button>}
                </span>
            </div>
            <p className="mt-2">
                {item.body}
            </p>
        </li>
    );
};

export default Comment;