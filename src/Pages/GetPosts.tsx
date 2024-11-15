import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network } from "aptos";
import { Aptos, AptosConfig, InputViewFunctionData } from "@aptos-labs/ts-sdk";
import PostCard from "../Components/PostCard";
import { useNavigate } from "react-router-dom";

const GetPosts = () => {
    const navigate = useNavigate();
    const { account, connected } = useWallet()
    const [, setResponseData] = useState<any>();
    const [accAddresses, setAccAddresses] = useState<any>(); 
    const [titles, setTitles] = useState<any>();
    const [descriptions, setDescriptions] = useState<any>();
    const [postedDate, setPostedDate] = useState<any>();
    const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
        getPosts().then(data => {console.log(data)});
    }, [account])

    const clickHandeler = () => {
        navigate('/createPost')
    }


    const getPosts = async() => {
        if(!account){
            // alert("Please connect YOur wallet first");
            console.log('no wallet detected')
            return;
        }
    
        
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(aptosConfig);

        const moduleAddress = "0xd43ab96be69d13f3e4e8519ba38cb17f413e2fa71d838a7708da68e74668793e";
        const globalStore = "0xa82603d9dd3843d9e460c7cdfb787b5d73f82fdd5c2c667914c6dc10f4f92e69";
        const moduleName = "reddit";
        const payload: InputViewFunctionData = {
            function: `${moduleAddress}::${moduleName}::get_all_posts`,
            functionArguments : [globalStore, globalStore]
        };
        
        const response = await aptos.view({ payload });
        setResponseData(response)
        setAccAddresses(response[0])
        setTitles(response[1])
        setDescriptions(response[2])
        setPostedDate(response[3])
        setLoading(false)

        return response;
    }

    return ( 
    <div className="w-full flex justify-center py-7">
        <div className="flex relative flex-col w-10/12 gap-y-4">
        <div className="text-3xl text-center font-sans min-h-[50px] font-bold text-white">
            All posts
        </div>
        {
            connected ? (
                <div className="flex flex-col justify-center min-h-[50vh] items-center gap-y-3">
                {
                    loading ? (<div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>) :
                    (
                        <div className="flex flex-col gap-y-3">
                        {
                            accAddresses?.map((data:any, index:any) => {
                                    console.log(data)
                                return(
                                        <PostCard length={accAddresses.length} key={index} index={index} accAddresses={accAddresses} titles={titles} descriptions={descriptions} postedDates={postedDate}/>
                                )
                            })
                        }
                        </div>
                    )
                }
            </div>
            ) : (
                <div className="w-full min-h-[50vh] justify-center items-center flex">
                    <div className="text-3xl text-white font-bold">Wallet Not connected</div>
                </div>
            )
            
        }
        <button
                    onClick={clickHandeler}
                    className="absolute right-0 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 border border-gray-700 shadow-lg"
                >
                    <span>Create Posts</span>
                </button>
        </div>
    </div>
     );
}
 
export default GetPosts;