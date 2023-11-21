
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MenuUser.module.scss'
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { faArrowRightArrowLeft, faArrowRightFromBracket, faArrowsRotate, faBell, faCircleXmark, faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../reducer/userSlice';


let cx = classNames.bind(styles);

function MenuUser() {
    const [showMenu, setShowMenu] = useState(true)
    const [showNotification, setShowNotification] = useState(true)

    // use dispatch
    const dispatch = useDispatch()

    // use navigate
    const naviagte = useNavigate()

    // selector
    const inforUser = useSelector((state) => {
        return state.user.value
    })

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleShowNotification = () => {
        setShowNotification(!showNotification)
    }

    // handle log out
    const handleLogOut = async (e) => {
        e.preventDefault()

        dispatch(logout())
        naviagte('/')
    }

    return (
        <>
            {
                showMenu
                    ?
                    (<li onClick={handleShowMenu}>
                        <Link>
                            <FontAwesomeIcon icon={faUserLarge} />
                        </Link>
                    </li>)
                    : (<>
                        <li style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={handleShowMenu}>
                            <Link>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </li>

                        <div className={cx('menu-user')}>
                            <div className={cx('user')}>
                                {
                                    inforUser.avatar === null ?
                                        <img alt='avata' src='https://i.ytimg.com/vi/idAvatar/mqdefault.jpg' />
                                        :
                                        <img alt='avata' src={inforUser.avatar} />

                                }
                                {inforUser && <span>{inforUser.name === null ? 'Name user' : inforUser.name}</span>}
                            </div>

                            <div className={cx('feature')}>
                                <Link>
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                    <span>Đồng bộ</span>
                                </Link>
                                <Link to='/user/infor'>
                                    <FontAwesomeIcon icon={faUserLarge} />
                                    <span>Thông tin</span>
                                </Link>
                                <Link to='/user/change-password'>
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                    <span>Thay đổi mật khẩu</span>
                                </Link>
                                <Link href='/' onClick={handleLogOut}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    <span>Đăng xuất</span>
                                </Link>
                            </div>

                        </div>
                    </>)
            }
            {
                showNotification
                    ? (<li onClick={handleShowNotification}>
                        <Link>
                            <FontAwesomeIcon icon={faBell} />
                        </Link>
                    </li>)
                    : (<li style={{ 'backgroundColor': 'rgb(156, 55, 55)' }} onClick={handleShowNotification}>
                        <Link>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Link>
                    </li>)
            }
        </>
    )
}

export default MenuUser