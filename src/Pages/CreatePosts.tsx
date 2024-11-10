import { useState } from "react";
// import { uploadToBlockchain } from "../ContractStuff/Methods";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

export type post = {
    title: string,
    description: string
}

const CreatePosts = () => {
    
    const { account,signAndSubmitTransaction } = useWallet()
    const [details,setDetails] = useState<post>({
        title: "",
        description: ""
    })
    const navigate = useNavigate();
    // const [resData, setResData] = useState();


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
                    // setResData(data)
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


    return ( <div className="flex relative justify-center py-5 w-full min-h-screen">
        <div className="flex flex-col w-4/12 h-[400px] p-10 bg-none border border-white gap-y-6 rounded-lg">
                <div className="text-3xl text-white font-bold font-sans">
                    Create a Post
                </div>
                <div className="flex flex-col gap-y-5">
                    <label className="flex gap-y-1 text-2xl text-white font-serif font-bold flex-col">
                        Title
                        <input onChange={changeHandler} name="title" type="text" id="title" className="rounded-md p-1 text-black text-lg" placeholder="How to create a Dapp?"/>
                    </label>
                    <label className="flex gap-y-1 text-2xl text-white font-serif font-bold flex-col">
                        Description
                        <input onChange={changeHandler} name="description" type="text" id="description" className="rounded-md text-black p-1 text-lg" placeholder="Make a contract in move...?"/>
                    </label> 
                </div>
                <button onClick={submitHandeler} className="px-3 py-1 text-xl bg-black text-white rounded-lg font-bold hover:opacity-70 active:opacity-100">
                    Submit
                </button>
            </div>
            <button onClick={clickHandeler} className="absolute right-[20%] bg-[#D9D9D9] px-3 py-1 text-2xl font-bold font-serif rounded-lg">All Posts</button>
    </div> );
}
 
export default CreatePosts;