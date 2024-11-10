import { useNavigate } from 'react-router-dom';
import image from '../assets/ByteBoard 1.png'

const Home = () => {
    const navigate = useNavigate()
    const toCreatePost = () => {
        navigate('/createPost')
    }
    const toGetPosts = () => {
        navigate('/getPosts')
    }
    return ( <div className="w-full bg-[#212121] min-h-screen flex flex-col gap-y-5 items-center">
        <div className='flex w-full justify-center items-center rounded-lg py-10'>
            <img src={image} alt="ByteBoard rounded-xl"/>
        </div>
        <div className='flex gap-x-4'>
            <div onClick={toCreatePost} className='bg-[#D9D9D9] cursor-pointer px-3 py-1 text-2xl font-bold font-serif rounded-lg'>Create Post</div>
            <div onClick={toGetPosts} className='bg-[#D9D9D9] cursor-pointer px-3 py-1 text-2xl font-bold font-serif rounded-lg'>All Posts</div>
        </div>
    </div> );
}
 
export default Home;