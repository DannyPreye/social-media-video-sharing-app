import { useState, useEffect } from "react"
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import axios from "axios"

import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const ProfileDetails = ({ data }: IProps) => {

    const { user, userLikedVideos, userVideos } = data
    const [showUserVideos, setShowUserVideos] = useState(true)
    const [videosList, setVideosList] = useState<Video[]>([])

    const videos = showUserVideos ? 'border-b-2 border-gray-400 pb-1' : 'border-none'
    const liked = !showUserVideos ? 'border-b-2 border-gray-400 pb-1' : 'border-none'

    useEffect(() => {
        showUserVideos ? setVideosList(userVideos) : setVideosList(userLikedVideos)
    }, [showUserVideos, userLikedVideos, userVideos])


    return (
        <div className="w-full ">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className='w-16 h-16 md:w-32 md:h-32 '>
                    <Image src={user?.image} alt={user?.username} height={120} width={120} className='rounded-full' layout='responsive' />
                </div>
                <div className=' flex flex-col  justify-center'>
                    <p className='flex md:text-2xl tracking-wider justify-center items-center gap-1 text-md font-bold text-primary lowercase'>{user?.username?.replace(" ", "")}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400 text-xs'>
                        {user?.username}
                    </p>
                </div>
            </div>

            <div >
                <div className="flex gap-10 mt-10 mb-10 border-b-2 border-gray-200 bg-white w-full">
                    <p onClick={() => setShowUserVideos(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>Videos</p>
                    <p onClick={() => setShowUserVideos(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>Liked</p>
                </div>
            </div>

            <div className="flex gap-6 flex-wrap md:justify-start">
                {videosList.length > 0 ? (
                    videosList.map((post: Video, index: number) => (
                        <VideoCard post={post} key={index} />
                    ))
                ) : <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos yet`} />}
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default ProfileDetails