import { Link } from 'react-router';


const Notification = ({ n }) => {

    console.log(n)
    return (
        <div className='px-6 w-full py-3 bg-base-200 rounded-lg space-y-1'>
            <p className=' text-base-content capitalize font-medium'>{n.message}.</p>
            <p className='text-xs text-base-content/50'>Tile: {new Date(n.Time).toLocaleString()}</p>
        </div>

    );
};

export default Notification;