import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './AdminPage.module.scss';
import StylesMovie from '../../components/StylesMovie'
import Button from '../../components/Button';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
import Paginate from '../../components/Paginate';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faFilm, faFolderClosed, faGauge, faGenderless, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);

function AdminPage() {
  // use navigate
  const navigate = useNavigate()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  // check admin
  const tokenDecode = jwtDecode(inforUsers.accestoken)
  if (!tokenDecode.admin) {
    navigate('/')
  }

  const handleAddFilm = (e) => {
    e.preventDefault()
    alert('')
  }

  return (
    <div className={cx('admin')}>
      <div className='row-m-0'>
        <div className=' l-2 t-2 m-2'>
          <div className={cx('side-bar')}>
            <Link className={cx('wrap-logo')} to='/'>
              <img alt='logo' className={cx('logo')} src='/logo.png' />
            </Link>

            <h2 className={cx('title')}>Quản lý thành phần website</h2>

            <div className={cx('wrap-category')}>
              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faGauge} />
                <span className={cx('name-category')}>Dashboard</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faInfoCircle} />
                <span className={cx('name-category')}>Thông tin website</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faFolderClosed} />
                <span className={cx('name-category')}>Danh mục phim</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faGenderless} />
                <span className={cx('name-category')}>Thể loại phim</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faEarthAmerica} />
                <span className={cx('name-category')}>Quốc gia phim</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                <span className={cx('name-category')}>Phim</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faFilm} />
                <span className={cx('name-category')}>Link phim</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faUsers} />
                <span className={cx('name-category')}>User truy cập</span>
              </div>

              <div className={cx('category')}>
                <FontAwesomeIcon className={cx('icon-category')} icon={faUsers} />
                <span className={cx('name-category')}>Thống kê tất cả</span>
              </div>
            </div>
          </div>

        </div>

        <div className=' l-10 t-10 m-10'>
          <div className={cx('body')}>
            <div className={cx('wrap-add-film')}>
              <h2 className={cx('topic')}>Thêm phim</h2>
              <form onSubmit={handleAddFilm} className={cx('form')}>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-name'>Tên phim</label>
                  <input className={cx('input-text')} id='movie-name' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-id'>Id phim</label>
                  <input className={cx('input-text')} id='movie-id' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-description'>Mô tả</label>
                  <input className={cx('input-text')} id='movie-description' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='odd-movie-length'>Chiều dài phim lẻ</label>
                  <input className={cx('input-text')} id='odd-movie-length' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='series-movie-length'>Chiều dài phim bộ</label>
                  <input className={cx('input-text')} id='series-movie-length' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-year'>Năm phát hành</label>
                  <input className={cx('input-text')} id='movie-year' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-theme'>Hình ảnh</label>
                  <input className={cx('input-text')} id='movie-theme' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-part'>Phần mấy</label>
                  <input className={cx('input-text')} id='movie-part' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='is-movie-film'>Là movie</label>
                  <input className={cx('input-text')} id='is-movie-film' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-fiom'>Tập mấy</label>
                  <input className={cx('input-text')} id='movie-fiom' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-fiom'>Tập mấy</label>
                  <input className={cx('input-text')} id='movie-fiom' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='video-link'>Link video</label>
                  <input className={cx('input-text')} id='video-link' placeholder='...' />
                </div>
                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='video-status'>Trạng thái</label>

                  <div className={cx('wrap-input-radio')}>
                    <input type='radio' id='completed-status' name='movie-status' value={1} />
                    <label htmlFor='completed-status'>Đã hoàn thành</label>
                  </div>

                  <div className={cx('wrap-input-radio')}>
                    <input type='radio' id='unfinished-state' name='movie-status' value={0} />
                    <label htmlFor='unfinished-state'>Chưa hoàn thành</label>
                  </div>
                </div>

                <div className={cx('wrap-infor')}>
                  <label className={cx('label-name')} htmlFor='movie-source'>Nguồn phim</label>
                  <input className={cx('input-text')} id='movie-source' placeholder='...' />
                </div>

                <button className={cx('btn-submit')} type='submit'>Thêm phim</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage;
