// layout
import LayoutDefault from './layout/LayoutDefault/LayoutDefault';
// page
import HomePage from './page/HomePage'
import MovieInformationPage from './page/MovieInformationPage'
import HistoryPage from './page/HistoryPage'
import WatchMoviePage from './page/WatchMoviePage'
import FollowedPage from './page/FollowedPage'
import FilterMoviePage from './page/FilterMoviePage'
import LogInPage from './page/LogInPage'
import ForgotPasswordPage from './page/ForgotPasswordPage'
import RegisterPage from './page/RegisterPage'
import UserInforPage from './page/UserInforPage'
import TestPage from './page/TestPage'
import ChangePasswordPage from './page/ChangePasswordPage'
import SearchFilmPage from './page/SearchFilmPage';
import AdminPage from './page/AdminPage';
import NotFoundPage from './page/NotFoundPage';

const routes = [
    { path: '/', element: <LayoutDefault><HomePage /></LayoutDefault> },
    { path: '/movie-information', element: <LayoutDefault><MovieInformationPage /></LayoutDefault> },
    { path: '/history', element: <LayoutDefault><HistoryPage /></LayoutDefault> },
    { path: '/watch-movie', element: <LayoutDefault><WatchMoviePage /></LayoutDefault> },
    { path: '/followed', element: <LayoutDefault><FollowedPage /></LayoutDefault> },
    { path: '/filter-movie', element: <LayoutDefault><FilterMoviePage /></LayoutDefault> },
    { path: '/log-in', element: <LayoutDefault><LogInPage /></LayoutDefault> },
    { path: '/forgot-password', element: <LayoutDefault><ForgotPasswordPage /></LayoutDefault> },
    { path: '/register', element: <LayoutDefault><RegisterPage /></LayoutDefault> },
    { path: '/user/infor', element: <LayoutDefault><UserInforPage /></LayoutDefault> },
    { path: '/user/change-password', element: <LayoutDefault><ChangePasswordPage /></LayoutDefault> },
    { path: '/search-film', element: <LayoutDefault><SearchFilmPage /></LayoutDefault> },
    { path: '/admin', element: <AdminPage /> },
    { path: '/test', element: <LayoutDefault><TestPage /></LayoutDefault> },
    { path: '*', element: <NotFoundPage /> },
]

export default routes