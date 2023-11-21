import { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCircleXmark, faClockRotateLeft, faList, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss'
import FilmFilter from '../../../components/FilmFilter';
import MenuUser from '../../../components/MenuUser';
import Search from './HeaderItems/Search';
import { useDispatch } from 'react-redux';

let cx = classNames.bind(styles);

function Header() {

    const [showSearch, setShowSearch] = useState(false)

    // use navigate
    const navigate = useNavigate()

    // use dispatch
    const dispatch = useDispatch()

    // use selector
    const inforUser = useSelector((state) => {
        return state.user.value
    })

    const [showFilmFilter, setShowFilmFilter] = useState(false)

    const handleShowFilmFilter = () => {
        setShowFilmFilter(true)
    }

    const handleUnShowFilmFilter = () => {
        setShowFilmFilter(false)
    }

    return (
        <header className={cx('header')}>
            <Link to='/' onClick={handleUnShowFilmFilter}>
                <img alt='logo' className={cx('logo')} src='/logo.png' />
            </Link>

            {/* search */}
            {<Search show={showSearch} />}

            <ul className={cx('navigate-list')}>
                {showSearch === false ?
                    (<li className='hide-on-ps-pl' onClick={() => {
                        setShowSearch(true)
                    }}>

                        <Link>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </li>)
                    :
                    (<li className='hide-on-ps-pl' style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={() => {
                        setShowSearch(false)
                    }}>
                        <Link>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Link>
                    </li>)
                }
                {showFilmFilter === false ?
                    (<li onClick={handleShowFilmFilter}>
                        <Link>
                            <FontAwesomeIcon icon={faList} />
                        </Link>
                    </li>)
                    :
                    (<li style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={handleUnShowFilmFilter}>
                        <Link>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Link>
                    </li>)}
                <li onClick={handleUnShowFilmFilter}>
                    <Link to='/history'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </Link>
                </li>
                <li onClick={handleUnShowFilmFilter}>
                    <Link to='/followed'>
                        <FontAwesomeIcon icon={faBookmark} />
                    </Link>
                </li>
                {!inforUser ?
                    (
                        <li onClick={handleUnShowFilmFilter}>
                            <Link to='/log-in'>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </Link>
                        </li>
                    )
                    :
                    (
                        <MenuUser />
                    )
                }
            </ul>

            {/* film filter */}
            {showFilmFilter && <FilmFilter handleShowFilmFilter={handleShowFilmFilter} handleUnShowFilmFilter={handleUnShowFilmFilter} />}
        </header >
    )
}

export default Header