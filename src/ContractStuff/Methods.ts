import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
const { account,signAndSubmitTransaction } = useWallet()

export const uploadToBlockchain = async (title:string, description:string) => {
    
    if(!account){
        alert("Please connect Your wallet first");
    }
    const moduleAddress = "0xfe7c2f5d4eac6747b2c3ecce0a3044ee1ddd12fc47b893f9f359690f288307c1"
    const moduleName = "reddit"
    const payload: InputTransactionData = {
      data: {
        function: `${moduleAddress}::${moduleName}::create_post`,
        functionArguments: [title, description],
      },
    };
    const response = await signAndSubmitTransaction(payload);
    console.log(response);
};

export const getPosts = async() => {
    if(!account){
        alert("Please connect YOur wallet first");
    }

    const moduleAddress = "0xfe7c2f5d4eac6747b2c3ecce0a3044ee1ddd12fc47b893f9f359690f288307c1";
    const moduleName = "reddit";
    const payload: InputTransactionData = {
        data: {
            function: `${moduleAddress}::${moduleName}::get_all_posts`,
            functionArguments: []
        }
    }
    const response = await signAndSubmitTransaction(payload);
    console.log(response)
}

