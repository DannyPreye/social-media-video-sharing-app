import { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'

interface IProps {
    handleLike: () => void
    handleDisLike: () => void
}

const LikeButton = ({ handleLike, handleDisLike }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(true)
    const { userProfile } = useAuthStore()

    return (
        <div className='gap-6 '>
            <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
                {alreadyLiked ? <div onClick={handleLike} className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'>
                    <MdFavorite className='text-lg md:text-2xl' />
                </div> : <div onClick={handleDisLike} className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'>
                    <MdFavorite className='text-lg md:text-2xl' />
                </div>}
                <p className='text-md font-semibold '>likes?.length || 0</p>
            </div>
        </div>
    )
}
export default LikeButton