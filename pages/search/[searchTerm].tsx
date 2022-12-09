import { useState } from 'react'
import Image from "next/image"
import { GoVerified } from "react-icons/go"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"

import useAuthStore from "../../store/authStore"
import VideoCard from "../../components/VideoCard"
import NoResults from "../../components/NoResults"
import { IUser, Video } from "../../types"
import { BASE_URL } from "../../utils"

interface IProps {
    vidoes: Video[]
}

const SearchTerm = ({ vidoes }: IProps) => {
    const [isAccounts, setIsAccounts] = useState(false)
    const router = useRouter()
    const { searchTerm }: any = router.query
    const account = isAccounts ? 'border-b-2 border-gray-400 pb-1' : 'border-none'
    const isVideos = !isAccounts ? 'border-b-2 border-gray-400 pb-1' : 'border-none'
    const { allUsers } = useAuthStore()

    const searchedAccouts = allUsers.filter((user: IUser) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="w-full">
            <div >
                <div className="flex gap-10 mt-10 mb-10 border-b-2 border-gray-200 bg-white w-full">
                    <p onClick={() => setIsAccounts(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}>Accounts</p>
                    <p onClick={() => setIsAccounts(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}>Videos</p>
                </div>
            </div>
            {
                isAccounts ? (<div className='md:mt-16'>
                    {searchedAccouts.length > 0 ? (
                        searchedAccouts.map((user: IUser, idx: number) => (
                            <Link key={idx} href={`/profile/${user._id}`}>
                                <div className='flex items-start gap-3 cursor-pointer font-semibold border-b-2 border-gray-200'>
                                    <div className=' '>
                                        <Image src={user.image} alt={user.username} height={50} width={50} className='rounded-full' />
                                    </div>
                                    <div className='hidden  xl:block'>
                                        <p className='flex items-center gap-1 text-md font-bold text-primary lowercase'>{user?.username?.replace(" ", "")}
                                            <GoVerified className='text-blue-400' />
                                        </p>
                                        <p className='capitalize text-gray-400 text-xs'>
                                            {user.username}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No account results for ${searchTerm}`} />}
                </div>) : (<div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {vidoes?.length > 0 ? vidoes.map((video) => (
                        <VideoCard post={video} key={video._id} />
                    )) : <NoResults text={`No video results for ${searchTerm}`} />}
                </div>)
            }
        </div>
    )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: { vidoes: res.data }
    }
}
export default SearchTerm