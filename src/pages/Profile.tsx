import { useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import { useParams } from 'react-router';
import BackButton from '../components/BackButton';
import Post from '../components/Post/Post';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { IGetUserResponse } from '../graphQL/types';
import { GET_USER } from '../graphQL/users/query';

const Profile = () => {
    const { id } = useParams() as { id: string }

    const { data, loading } = useQuery<IGetUserResponse>(GET_USER, { variables: { userId: id } })
    const profile = data?.getUser


    if (loading) {
        return <div>Load</div>
    }

    return (
        <div className="flex flex-col">
            <div className="mb-5">
                <BackButton />
            </div>

            <ProfileInfo profile={profile!} />

            <div className="mt-5">
                <h2 className="text-xl font-bold">{profile?.username} Posts:</h2>
                <ul className="mt-4 flex flex-col w-full gap-5">
                    {profile!.posts.length > 0
                        ? profile?.posts.map(p => <Post item={p} key={p.id} />)
                        : <div className="text-center font-bold text-lg">No posts</div>}
                </ul>
            </div>
        </div >
    );
};

export default Profile;