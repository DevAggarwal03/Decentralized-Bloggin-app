import { useNavigate } from 'react-router-dom';
import image from '../assets/ByteBoard-removebg-preview.png'
import WalletButton from './WalletButton';

const Navbar = () => {
    const navigate = useNavigate()
    const clickHandeler = () => {
        navigate('/')
    }

    return (
        <div className="w-full bg-gray-900 px-4 py-2 shadow-lg">
            <div className="w-10/12 mx-auto flex items-center justify-between bg-gray-800 rounded-xl px-6 py-3 cursor-pointer hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-blue-900/20">
                {/* Logo and Brand Section */}
                <div 
                    onClick={clickHandeler} 
                    className="flex items-center space-x-4"
                >
                    <img 
                        src={image} 
                        className="w-[130px] h-[90px] object-contain" 
                        alt="ByteBoard"
                    />
                    <div className="flex flex-col fuzzy-bubbles-regular">
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            ByteBoard
                        </span>
                        <span className="text-xl text-gray-300 tracking-wide">
                            Feel Free
                        </span>
                    </div>
                </div>

                {/* Wallet Button Section */}
                <div className="relative flex items-center">
                    <div className="bg-gray-800 rounded-lg p-1 shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
                        <WalletButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;