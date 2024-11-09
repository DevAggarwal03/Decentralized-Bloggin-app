import { useNavigate } from 'react-router-dom';
import image from '../assets/ByteBoard-removebg-preview.png'
import WalletButton from './WalletButton';


const Navbar = () => {
    const navigate = useNavigate()
    const clickHandeler = () => {
        navigate('/')
    }


    return ( <div className='flex justify-center relative w-full items-center'>
        <div onClick={clickHandeler} className='cursor-pointer flex justify-center items-center w-10/12 mt-5 py-3 bg-gray-800 rounded-lg'>
            <img src={image} className='w-[130px] h-[90px]' alt='ByteBoard'/>
            <div className='text-white fuzzy-bubbles-regular gap-y-1 flex flex-col'>
                <div className='text-3xl'>ByteBoard</div>
                <div className='text-xl'>Feel Free</div>
            </div>
        </div>
        <div className='absolute px-3 py-1 text-xl right-[10%] rounded-lg'>
            <WalletButton/>
        </div>
    </div> );
}
 
export default Navbar;