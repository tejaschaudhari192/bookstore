import Cookies from 'js-cookie'


export const getUserName = () => {
    if (Cookies.get('user')) return JSON.parse(Cookies.get('user')).name;
    else return null
}