import { useEffect, useState } from 'react'
import image from '../assets/ByteBoard.png'

const PostCard = ({length, index, accAddresses, titles, descriptions, postedDates}:any) => {

    const [date, setDate] = useState<any>()
    const toDate = () => {
        // Given Unix timestamp

        // Convert timestamp to milliseconds and create a Date object
        const date = new Date(postedDates[index] * 1000);

        // Convert to IST (UTC + 5:30)
        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const istDate = new Date(date.getTime() + istOffset);

        // Format and display the date and time
        setDate(istDate.toISOString().replace('T', ' ').slice(0, 19));
        console.log(istDate.toISOString().replace('T', ' ').slice(0, 19));

    }
    useEffect(() => {
        toDate();
    }, [postedDates[length-index-1]])


    return ( <div className="text-white flex flex-col gap-y-3 bg-none border border-white rounded-lg max-w-[800px] p-3">
        <div className="flex items-center gap-x-2">
            <img src={image} className='w-[30px] h-[30px] rounded-full'/>
            <div className="text-sm opacity-75">{accAddresses[length-index-1]}</div>
        </div>
        <div className='flex justify-between pl-[30px]'>
            <div className='flex gap-y-2 flex-col'>
                <div className="text-xl font-bold">{titles[length-index-1]}</div>
                <div className='max-w-[500px]'>{descriptions[length-index-1]}</div>
            </div>
            <div className='place-self-end'>{date}</div>
        </div>
    </div> );
}
 
export default PostCard;