import { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network } from "aptos";
import { Aptos, AptosConfig, InputViewFunctionData } from "@aptos-labs/ts-sdk";
import PostCard from "../Components/PostCard";
import { Navigate, useNavigate } from "react-router-dom";

const GetPosts = () => {
    const navigate = useNavigate();
    const { account, connected } = useWallet()
    const [responseData, setResponseData] = useState<any>();
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

        const moduleAddress = "0xfe7c2f5d4eac6747b2c3ecce0a3044ee1ddd12fc47b893f9f359690f288307c1";
        const moduleName = "reddit";
        const payload: InputViewFunctionData = {
            function: `${moduleAddress}::${moduleName}::get_all_posts`,
            functionArguments : [account?.address]
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
    <div className="w-full flex justify-center min-h-screen py-7">
        <div className="flex relative flex-col w-10/12 gap-y-4">
        <div className="text-3xl text-center font-sans min-h-[50px] font-bold text-white">
            All posts
        </div>
        {
            connected ? (
                <div className="flex flex-col justify-center items-center gap-y-3">
                {
                    loading ? (<div className="text-3xl text-white font-bold">Loading...</div>) :
                    (
                        <div className="flex flex-col gap-y-3">
                        {
                            accAddresses?.map((data:any, index:any) => {
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
                <div className="w-full justify-center items-center flex">
                <div className="text-3xl text-white font-bold">Wallet Not connected</div>
                </div>
            )
            
        }
        <button onClick={clickHandeler} className="absolute right-0 bg-[#D9D9D9] px-3 py-1 text-2xl font-bold font-serif rounded-lg">Create post</button>
        </div>
    </div>
     );
}
 
export default GetPosts;