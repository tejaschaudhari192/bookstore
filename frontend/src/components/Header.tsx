import { CgProfile } from 'react-icons/cg'
import logo from '../assets/logo.png'
import { IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CartItemType } from '../model'
import { RootState } from '../utils/store/appStore'
import { RiBookShelfLine } from 'react-icons/ri'
import { useState } from 'react'
import { removeUser, setAuthentication } from '../utils/store/userSlice'
import { MdLogout } from 'react-icons/md'
import { LuChevronsUpDown } from 'react-icons/lu'
import { FaTruck } from 'react-icons/fa'


export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = window.location.href;

    const cartItems = useSelector((store: RootState) => store.cart.items)
    const totalQuantity = cartItems?.reduce((total: number, item: CartItemType) => total + item.quantity, 0) ?? 0;
    console.log(totalQuantity);
    const userType = useSelector((store: RootState) => store.user.type)

    const paths = url.split('/');
    const lastPath = paths[paths.length - 1]

    const [popOver, setPopOver] = useState(false);

    let headerBg = ''

    if (userType != null) {
        headerBg = "bg-[#fff]"
    }

    return (
        <div className={`w-full  p-2 fixed h-fit ${userType && "bg-white"} flex justify-between text-xl`}        >
            <div className='flex gap-2 ml-4 mt-2 cursor-pointer' onClick={() => navigate('/')}>
                <img className='w-8 h-8 scale-[2]'
                    src={logo}
                    alt="" />
                <span className='brand font-bold'>Books Wallah</span>
            </div>
            <div className='flex gap-5'>
                {userType &&
                    (<div className='m-auto'>
                        <div className={`flex gap-1 items-center cursor-pointer rounded-lg px-3 p-2 ${popOver && 'bg-slate-200'}`}
                            onClick={() => setPopOver(!popOver)}
                        >
                            <span className={`text-sm`}>{userType}</span>
                            <LuChevronsUpDown className='mt-1' />
                        </div>
                        <div className={`absolute transition-all duration-150 mt-2 mr-4 z-10 ${!popOver ? 'opacity-0' : 'opacity-100'}`}>
                            <div
                                onClick={() => setPopOver(!popOver)}
                                className='flex bg-white shadow-md flex-col text-[16px]'>
                                <div className='popover-btn' onClick={() => navigate('/profile')}>
                                    Profile
                                    <CgProfile size={20}
                                        className='cursor-pointer'
                                    />
                                </div>
                                <div className='popover-btn' onClick={() => { navigate('/'); dispatch(setAuthentication(false)); dispatch(removeUser()) }}>
                                    Logout
                                    <MdLogout size={15} className='mt-1' />
                                </div>
                                {userType == 'user' && <div className='popover-btn' onClick={() => { navigate('/orders') }}>
                                    Orders
                                    <FaTruck
                                        size={15} className='mt-1' />
                                </div>}
                            </div>
                        </div>
                    </div>)

                }
                {userType && (
                    userType == 'user' ? <div className='m-auto cursor-pointer relative'
                        onClick={() => navigate('/cart')}>
                        <div className={`flex gap-1 items-center rounded-lg p-2 px-3 transition-all duration-200 ${lastPath == 'cart' && 'bg-slate-200'}`}>
                            <IoCart size={25} />
                            <span className='text-sm'>Cart</span>
                        </div>
                        {cartItems.length > 0 && <div className='absolute bottom-0 bg-[#465859] text-white rounded-full text-xs py-[2px] w-5 flex justify-center items-center'>
                            {cartItems.length > 0 && totalQuantity}
                        </div>}
                    </div> : <div className='m-auto cursor-pointer relative'
                        onClick={() => navigate('/admin')}>
                        <div className={`flex gap-1 items-center rounded-lg p-2 px-3 transition-all duration-200 ${lastPath == 'admin' && 'bg-slate-200'}`}>
                            <RiBookShelfLine size={25} />
                            <span className='text-sm'>Menu</span>


                        </div>
                    </div>
                )
                }

            </div>
        </div >
    )
}
