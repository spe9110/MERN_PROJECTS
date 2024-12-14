import { MdOutlineClose } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div 
        className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' 
        onClick={onClose}
        >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full bg-white rounded-xl p-4 flex flex-col relative'
      >
        <MdOutlineClose 
            className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
            onClick={onClose}
            />
            <h2 className='w-fit px-4 py-1 bg-red-300 rounded-lg'>
                {book.publishYear}
            </h2>
            <h4 className='my-2 text-gray-500'>{book._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-red-300 text-2xl'/>
                <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{book.author}</h2>
            </div>
            <p className='mt-4'>Are you want to show?</p>
            <p className='my-3'>
            Un pacemaker (ou stimulateur cardiaque) est un petit dispositif médical implanté sous la peau, généralement près de la clavicule, et relié au cœur par des fils électriques (électrodes). Il a pour rôle de réguler le rythme cardiaque lorsqu'il est trop lent, irrégulier ou qu'il présente des anomalies.
            </p>
      </div>
    </div>
  )
}

export default BookModal;
