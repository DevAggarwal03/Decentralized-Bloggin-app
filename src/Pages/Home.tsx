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
    return ( <div className="w-full bg-gray-900 min-h-screen flex flex-col gap-y-5 items-center">
        <div className='flex w-full justify-center items-center rounded-lg py-10'>
            <img src={image} alt="ByteBoard rounded-xl"/>
        </div>
        <div className='flex gap-x-4'>
                <button
                    onClick={toCreatePost}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 border border-gray-700 shadow-lg"
                >
                    <span>Create Posts</span>
                </button>
                <button
                    onClick={toGetPosts}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 border border-gray-700 shadow-lg"
                >
                    <span>All Posts</span>
                </button>
        </div>
    </div> );
}
 
export default Home;