import React, { FC, useContext, useEffect, useState } from 'react';
import { ChatIcon, HeartIcon, TrashIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartFilled } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { LIKE_POST, UNLIKE_POST } from '../../graphQL/likes/mutations';
import { DELETE_POST } from '../../graphQL/posts/mutation';
import { FETCH_POSTS } from '../../graphQL/posts/query';
import { IDeletePostResponse, IFetchPostsResponse, ILikePostResponse } from '../../graphQL/types';
import { AllRoutes } from '../AppRoutes';
import { IPost } from '../../types/models';
import Popup from '../Popup';


interface IPostActionsProps {
    item: IPost
}

const PostActions: FC<IPostActionsProps> = ({ item }) => {
    const location = useLocation()
    const nav = useNavigate()

    const [popup, setPopup] = useState(false)

    const { user } = useContext(AuthContext)
    const [isLiked, setIsLiked] = useState(false)

    const [deletePost, { loading: isDeleting }] = useMutation<IDeletePostResponse>(DELETE_POST, {
        update(proxy, result) {
            const data = proxy.readQuery<IFetchPostsResponse>({ query: FETCH_POSTS })
            const updatedPosts = data?.getPosts.filter(p => p.id !== result.data?.deletePost)
            proxy.writeQuery({
                query: FETCH_POSTS,
                data: {
                    getPosts: [...updatedPosts!]
                }
            })
        }
    })


    const [likePost, { loading: isLiking }] = useMutation<ILikePostResponse>(LIKE_POST)

    const [unlikePost, { loading: isUnliking }] = useMutation(UNLIKE_POST)


    const handleLike = () => {
        if (!user) return
        likePost({ variables: { postId: item.id } })
        setIsLiked(true)
    }

    const handleUnlike = () => {
        if (!user) return
        unlikePost({ variables: { postId: item.id } })
        setIsLiked(false)
    }

    const onOpen = () => {
        setPopup(true)
    }

    const onClose = () => {
        setPopup(false)
    }

    const handleDelete = () => {
        if (location.pathname !== AllRoutes.home) {
            nav(AllRoutes.home)
        }
        deletePost({ variables: { postId: item.id } })
        onClose()
    }

    useEffect(() => {
        if (user && item.likes.includes(user.id)) {
            setIsLiked(true)
        }
    }, [item.likes])

    return (
        <>
            <div className="px-5 pt-3 flex gap-5 border-t">
                {isLiked
                    ? <button className="flex items-center" onClick={handleUnlike}
                        disabled={isLiking || isUnliking}>
                        <HeartFilled className="h-6 w-6 text-red-700" />
                        <span className="ml-2">{item.likesCount}</span>
                    </button>
                    : <button className="flex items-center" onClick={handleLike}
                        disabled={isLiking || isUnliking}>
                        <HeartIcon className="h-6 w-6 text-red-700" />
                        <span className="ml-2">{item.likesCount}</span>
                    </button>}
                <NavLink to={AllRoutes.post + `/${item.id}`} className="flex items-center">
                    <ChatIcon className="h-6 w-6 text-cyan-600" />
                    <span className="ml-2">{item.commentsCount}</span>
                </NavLink>
                {item.user.id === user?.id && <button className="border border-transparent active:border-red-300 ml-auto transition-all cursor-pointer p-1 rounded-[50%]"
                    onClick={onOpen} disabled={isDeleting}>
                    <TrashIcon className="text-red-700 h-6 w-6" />
                </button>}
            </div>
            {popup && <Popup onClose={onClose} title="Are you sure?">
                <p className="mb-2">Do you want to delete this post?</p>
                <div className="flex flex-col">
                    <button className="h-[30px] my-4 redBtn" onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="h-[30px] text-lg border border-gray-300 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </Popup>}
        </>
    );
};

export default PostActions;