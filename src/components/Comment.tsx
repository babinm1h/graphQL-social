import { useMutation } from '@apollo/client';
import { TrashIcon } from '@heroicons/react/outline';
import { FC, useContext } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { DELETE_COMMENT } from '../graphQL/comments/mutation';
import { IDeleteCommentResponse } from '../graphQL/types';
import { IComment } from '../types/models';
import { getPostDate } from '../utils/getDate';
import { AllRoutes } from './AppRoutes';
import Loader from './Loader/Loader';

interface ICommentProps {
    item: IComment
}

const Comment: FC<ICommentProps> = ({ item }) => {
    const { user } = useContext(AuthContext)
    const { id } = useParams() as { id: string }

    const [deleteComment, { loading }] = useMutation<IDeleteCommentResponse>(DELETE_COMMENT, {})

    const handleDelete = () => {
        deleteComment({ variables: { commentId: item.id, postId: id } })
    }

    if (loading) {
        return <div className="text-center">
            <Loader />
        </div>
    }

    return (
        <li className="shadow-xs">
            <div className="flex items-center gap-3 pt-5 px-5">
                <NavLink to={AllRoutes.profile + `/${item.user.id}`}>
                    <img src={item.user.avatar} alt="user" className="h-7 w-7 rounded-[50%]" />
                </NavLink>
                <NavLink to={AllRoutes.profile + `/${item.user.id}`} className="flex-auto font-bold hover:underline">
                    {item.user.username}
                </NavLink>
                <span className="text-xs text-gray-400 flex items-center gap-2">
                    {getPostDate(Number(item.createdAt))}
                    {user && user.id === item.user.id
                        && <button onClick={handleDelete} disabled={loading}>
                            <TrashIcon className="h-4 w-4 text-red-700" />
                        </button>}
                </span>
            </div>
            <p className="p-5 scrollbar-thin overflow-x-auto scrollbar-thumb-gray-400">
                {item.body}
            </p>
        </li>
    );
};

export default Comment;