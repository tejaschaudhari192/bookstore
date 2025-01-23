import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Header } from './components/Header';
import { Homepage } from './pages/Homepage';
import { BookDetails } from './pages/BookDetails';
// import Cart from './pages/Cart';
// import { Profile } from './pages/Profile';
import { Loader } from './pages/Loader';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { AddBook } from './pages/AddBook';
// import { API } from './services/api';
import { EditBook } from './pages/EditBook';
import { Payment } from './pages/Payment';
import { verifyToken } from './services/api';
// import axios from 'axios';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './components/CheckoutForm';
// import CompletePage from './pages/CompletePage';
import { Error } from './pages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './utils/store/appStore';
import { addUser } from './utils/store/userSlice';


const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(Cookies.get('token'));
    const userType = useSelector((store: RootState) => store.user.type)
    const [user, setUser] = useState(false)
    const dispatch = useDispatch();

    if (Cookies.get('user')) {
        dispatch(addUser(JSON.parse(Cookies.get('user'))));
    }

    // const navigate = useNavigate();

    const saveToken = (userToken: string) => {
        Cookies.set('token', userToken)
        setIsAuthenticated(true);
        setToken(userToken);
    };

    const saveUser = (user) => {
        const stringeduser = JSON.stringify(user)
        Cookies.set('user', stringeduser)
        console.log(JSON.parse(Cookies.get('user')));
    }

    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false);
        setToken(null);
    }

    useEffect(() => {
        async function checkAuth() {
            if (token) {
                const success = await verifyToken(token);
                if (await success) {
                    setIsAuthenticated(true);
                    // setUser(jwtDecode(token));
                    // navigate('/')
                } else {
                    logout();
                    // navigate('/login');
                }
            }
        }
        checkAuth();
    }, [])


    return (
        <div className='h-screen w-screen overflow-x-hidden bg-[#F5F5F5]'>
            <Router>
                <Header setIsAuthenticated={setIsAuthenticated}/>
                <Routes>

                    <Route path={'/login'} element={isAuthenticated ? <Navigate to={'/'} /> : <Login setToken={saveToken} setUser={saveUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
                    <Route path={'/'} element={<Homepage />} />

                    {!isAuthenticated && <Route path='/login' element={<Login setToken={saveToken} setUser={saveUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />}

                    {!isAuthenticated &&
                        <Route path='/register' element={<Register />} />
                    }

                    {userType == 'admin' &&
                        <>

                            <Route path='/admin' element={<Admin />} />
                            <Route path='/admin/add' element={<AddBook />} />
                            <Route path='/admin/edit/:id' element={<EditBook />} />
                        </>
                    }

                    {userType == 'user' &&
                        <>
                            <Route path='/payment/*' element={<Payment />} />
                            <Route path='/book/:id' element={<BookDetails />} />

                            < Route path='/cart' element={<Suspense fallback={<Loader />}>
                                <Cart />
                            </Suspense>} />
                        </>
                    }
                    <Route path='/profile' element={<Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>} />
                    <Route path='/loader' element={<Loader />} />

                    <Route path='/:other' element={<Error statusCode={404} message='page not found' />} />

                </Routes>
            </Router>
        </div>
    )
}

export default App
