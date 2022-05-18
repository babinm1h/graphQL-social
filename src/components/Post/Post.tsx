import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IPost } from '../../types/models';
import { getPostDate } from '../../utils/getDate';
import { AllRoutes } from '../AppRoutes';
import PostActions from './PostActions';

interface IPostProps {
    item: IPost
}



const Post: FC<IPostProps> = ({ item }) => {

    return (
        <li className="shadow-xs py-3 list-none bg-white h-full">
            <div className="flex flex-col">
                <div className="flex gap-4 px-5">
                    <NavLink to={AllRoutes.profile + `/${item.user.id}`}>
                        <img src={item.user.avatar} alt="user"
                            className="h-10 w-10 rounded-[50%] border object-cover" />
                    </NavLink>
                    <div className="flex-auto">
                        <NavLink to={AllRoutes.profile + `/${item.user.id}`} className="font-bold hover:underline">
                            {item.user.username}
                        </NavLink>
                        <p className="">{item.user.email}</p>
                    </div>
                    <span className="text-gray-400">
                        {getPostDate(Number(item.createdAt))}
                    </span>
                </div>

                <div className="p-5 max-w-full overflow-x-auto scrollbar-thumb-slate-400 scrollbar-track-white scrollbar-thin">
                    {item.body}
                </div>

                <PostActions item={item} />
            </div>
        </li>
    );
};

export default Post;