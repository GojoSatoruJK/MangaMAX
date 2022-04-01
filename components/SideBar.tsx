import { memo, useCallback, useRef } from 'react';
import { useOnClickOutside } from 'shared/useOnClickOutside';
import { FaCompass } from 'react-icons/fa';
import LeftSideBar from 'components/LeftSideBar';
import { IoListSharp } from 'react-icons/io5';

const SideBar = ({ className, id }: any) => {
    const ref = useRef(null);

    const openNav = useCallback(() => {
        document.getElementById(id)!.style.left = "0";
    }, [])
    const closeNav = useCallback(() => {
        document.getElementById(id)!.style.left = "-250px";
    }, [])

    useOnClickOutside(ref, closeNav);

    return (
        <div
            ref={ref}
            className={'z-20 ml-0 md:ml-auto pr-3 ' + className}
            title='Source'
        >
            <LeftSideBar
                id={id}
                closeNav={closeNav}
            />
            <span
                className='hover:text-white transition duration-300 cursor-pointer text-[30px]'
                onClick={openNav}
            >
                <FaCompass className='hidden md:block' />
                <IoListSharp className='block md:hidden' />
            </span>
        </div >

    );
};

export default memo(SideBar);