import { CgProfile } from 'react-icons/cg'
import logo from '../assets/logo.png'
import { IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CartItemType } from '../model'
import { RootState } from '../utils/store/appStore'
import { RiBookShelfLine } from 'react-icons/ri'
import { useState } from 'react'
import { removeUser } from '../utils/store/userSlice'
import { MdLogout } from 'react-icons/md'


export const Header = ({setIsAuthenticated}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((store: RootState) => store.cart.items)
    const totalQuantity = cartItems?.reduce((total: number, item: CartItemType) => total + item.quantity, 0) ?? 0;
    console.log(totalQuantity);
    const userType = useSelector((store: RootState) => store.user.type)
    console.log(userType);
    
    const [popOver,setPopOver] = useState(false);

    let headerBg = ''

    if (userType != null) {
        headerBg = "bg-[#fff]"
    }

    return (
        <div className={`w-full p-4 fixed h-fit ${!userType ? '' : "bg-white"} flex justify-between text-xl`}
        onMouseLeave={() => setPopOver(!popOver)}
        >
            <div className='flex gap-2 ml-4 cursor-pointer' onClick={() => navigate('/')}>
                <img className='w-8 h-8 scale-[2]'
                    src={logo}
                    alt="" />
                <span className='brand font-bold'>Books Wallah</span>
            </div>
            <div className='flex gap-5'>
                {userType &&
                    (<div className='m-auto transition-all duration-200'>
                        <div className='flex gap-1 items-center'
                                onMouseOver={() => setPopOver(!popOver)}
                                >
                            <CgProfile size={30}
                                className='cursor-pointer'
                            />
                            <span className='text-sm'>Profile</span>
                        </div>
                        {popOver &&
                        <div className='absolute'>
                            <div className='flex items-center flex-col gap-2 text-[16px]'>
                                <div className='popover-btn' onClick={()=>navigate('/profile')}>
                                    Profile
                                </div>
                                <div className='popover-btn flex gap-2 items-center' onClick={()=>{navigate('/');setIsAuthenticated(false);dispatch(removeUser())}}>
                                    Logout 
                                    <MdLogout size={15} className='mt-1'/>
                                </div>
                            </div>
                        </div>
                        }
                    </div>)

                }
                {userType && (
                    userType == 'user' ? <div className='m-auto cursor-pointer relative'
                        onClick={() => navigate('/cart')}>
                        <div className='flex gap-1 items-center'>

                            <IoCart size={30} />
                            <span className='text-sm'>Cart</span>

                        </div>
                        <div className='absolute bottom-0 bg-[#465859] text-white rounded-full text-sm w-5 flex justify-center items-center'>
                            {cartItems.length > 0 && totalQuantity}
                        </div>
                    </div> : <div className='m-auto cursor-pointer relative'
                        onClick={() => navigate('/admin')}>
                        <div className='flex gap-1 items-center'>

                            <RiBookShelfLine size={30} />
                            <span className='text-sm'>Menu</span>


                        </div>
                    </div>
                )
                }

            </div>
        </div >
    )
}
