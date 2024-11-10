import { useState } from "react";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

export type post = {
    title: string,
    description: string
}

const CreatePosts = () => {
    const { account, signAndSubmitTransaction } = useWallet()
    const [details, setDetails] = useState<post>({
        title: "",
        description: ""
    })
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string, value: string } = e.target;
        setDetails((prev: post) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clickHandeler = () => {
        navigate('/getPosts')
    }

    const submitHandeler = () => {
        if(details.title.trim() === "" || details.title.trim() === ""){
            alert('please add all the details');
            return;
        }
        else{
            console.log(details);
            uploadToBlockchain(details.title, details.description).then(
                (data) => {
                    console.log(data)
                }
            )
        }
    }

    const uploadToBlockchain = async (title:string, description:string) => {
        if(!account){
            alert("Please connect Your wallet first");
        }
        const moduleAddress = "0xd43ab96be69d13f3e4e8519ba38cb17f413e2fa71d838a7708da68e74668793e"
        const globalStore = "0xa82603d9dd3843d9e460c7cdfb787b5d73f82fdd5c2c667914c6dc10f4f92e69"
        const moduleName = "reddit"
        const payload: InputTransactionData = {
          data: {
            function: `${moduleAddress}::${moduleName}::create_post`,
            functionArguments: [globalStore, title, description],
          },
        };
        const response = await signAndSubmitTransaction(payload);
        console.log(response);
        if(response){
            navigate('/getPosts')
        }
    };

    return (
        <div className="bg-gray-900 flex items-center w-screen justify-center px-4 py-12">
            <div className="w-10/12 flex justify-center items-center flex-col relative">
                {/* Main Form Card */}
                <div className="bg-gray-800 w-6/12 max-w-[800px] rounded-xl shadow-2xl overflow-hidden border border-gray-700 p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create a Post</h1>
                        <p className="text-gray-400">Share your thoughts with the community</p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                onChange={changeHandler}
                                name="title"
                                type="text"
                                id="title"
                                placeholder="How to create a Dapp?"
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <input
                                onChange={changeHandler}
                                name="description"
                                type="text"
                                id="description"
                                placeholder="Make a contract in move...?"
                                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={submitHandeler}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <span>Submit Post</span>
                            <svg 
                                className="w-5 h-5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* View All Posts Button */}
                <button
                    onClick={clickHandeler}
                    className="absolute right-0 top-0 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 border border-gray-700 shadow-lg"
                >
                    <span>View All Posts</span>
                </button>
            </div>
        </div>
    );
}
 
export default CreatePosts;