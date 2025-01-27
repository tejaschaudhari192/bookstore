import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Header } from './components/Header';
import { Loader } from './pages/Loader';
import { lazy, Suspense, useEffect } from 'react';
import { verifyToken } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './utils/store/appStore';
import { addUser, setAuthentication } from './utils/store/userSlice';
import { Homepage } from './pages/Homepage';


const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Payment = lazy(() => import('./pages/Payment'));
const Orders = lazy(() => import('./pages/Orders'));
const BookDetails = lazy(() => import('./pages/BookDetails'));
const Admin = lazy(() => import('./pages/Admin'));
const AddBook = lazy(() => import('./pages/AddBook'));
const EditBook = lazy(() => import('./pages/EditBook'));
const Error = lazy(() => import('./pages/Error'));

function App() {
    const token = useSelector((store: RootState) => store.user.token)

    const userType = useSelector((store: RootState) => store.user.type)
    const isAuthenticated = useSelector((store: RootState) => store.user.isAuthenticated)

    const dispatch = useDispatch();

    if (Cookies.get('user')) {
        const user: string = Cookies.get('user')!
        dispatch(addUser(JSON.parse(user)));
    }


    useEffect(() => {
        async function checkAuth() {
            if (token) {
                const success = await verifyToken(token);
                if (await success) {
                    dispatch(setAuthentication(true))
                } else {
                    Cookies.remove('token')
                    dispatch(setAuthentication(true))
                }
            }
        }
        checkAuth();
    }, [])


    return (
        <div className='h-screen w-screen overflow-x-hidden bg-[#F5F5F5]'>
            <Router>
                <Header />
                <Routes>

                    <Route path={'/login'} element={isAuthenticated ? <Navigate to={'/'} /> : <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>} />

                    <Route path={'/'} element={<Homepage />} />

                    {!isAuthenticated && <Route path='/login' element={<Login />} />}

                    {!isAuthenticated &&
                        <Route path='/register' element={<Suspense fallback={<Loader />}>
                            <Register />
                        </Suspense>} />
                    }

                    {userType == 'admin' &&
                        <>

                            <Route path='/admin' element={<Suspense fallback={<Loader />}>
                                <Admin />
                            </Suspense>} />
                            <Route path='/admin/add' element={<Suspense fallback={<Loader />}>
                                <AddBook />
                            </Suspense>} />
                            <Route path='/admin/edit/:id' element={<Suspense fallback={<Loader />}>
                                <EditBook />
                            </Suspense>} />
                        </>
                    }

                    {userType == 'user' &&
                        <>
                            <Route path='/payment/*' element={<Suspense fallback={<Loader />}>
                                <Payment />
                            </Suspense>} />
                            <Route path='/orders' element={<Suspense fallback={<Loader />}>
                                <Orders />
                            </Suspense>} />
                            <Route path='/book/:id' element={<Suspense fallback={<Loader />}>
                                <BookDetails />
                            </Suspense>} />

                            < Route path='/cart' element={<Suspense fallback={<Loader />}>
                                <Cart />
                            </Suspense>} />
                        </>
                    }
                    <Route path='/profile' element={<Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>} />
                    <Route path='/loader' element={<Loader />} />

                    <Route path='/:other' element={<Suspense fallback={<Loader />}>
                        <Error statusCode={404} message='page not found' />
                    </Suspense>} />

                </Routes>
            </Router>
        </div>
    )
}

export default App
