import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faFileCirclePlus, faFileExcel, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import styles from './MovieInformationPage.module.scss';
import Button from '../../components/Button';
import Comment from '../../components/Comment'
import FilmReview from './MovieInformationPageItems/FilmReview';
import LoginSection from '../../components/LoginSection/LoginSection';

let cx = classNames.bind(styles);

// min episode
let minEpisode = 1

export const MyContext = createContext()

function MovieInformationPage() {
  const [data, setData] = useState()
  const [followed, setFollowed] = useState([])
  const [test, setTest] = useState(true)

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  const functest = () => {
    setTest(!test)
  }

  const [query, setQuery] = useState(
    () => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('filmId')
    }
  )

  // msg-toast
  const MsgToast = ({ content, color }) => (
    <div className={cx('msg-toast')}>
      <div style={{ 'borderBottomColor': color }} className={cx('notification')}>
        <div style={{ 'color': color }}>Thông báo</div>
        <span style={{ 'color': color }}>X</span>
      </div>
      <div className={cx('descript')}>{content}</div>
    </div>
  )

  // film-review
  const MsgFilmReview = () => (
    <div className={cx('film-review')}>
      <div className={cx('first')}>
        <div className={cx('words')}>Đánh giá phim</div>
      </div>
      <FilmReview displayMsg={displayMsg} />
    </div>
  )

  // create displayMsg
  const displayMsg = (action) => {
    switch (action) {
      case 'addFollow':
        toast(<MsgToast content='Thêm theo dõi thành công' color='#c8c8ff' />);
        break;
      case 'addEvaluate':
        toast(<MsgToast content='Thêm đánh giá thành công' color='#c8c8ff' />);
        break;
      case 'removeFollow':
        toast(<MsgToast content='Xóa theo dõi thành công' color='#e85757' />);
        break;
      case 'updateEvaluate':
        toast(<MsgToast content='Cập nhật đánh giá thành công' color='#e85757' />);
        break;
      case 'toastLogin':
        toast(< MsgToast content='Bạn chưa đăng nhập' color='#5a5454' />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
        break;
      case 'filmReview':
        toast(< MsgFilmReview />, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          closeOnClick: false,
          className: cx('foo-bar'),
          closeButton: true
        });
        break;
      default:
        alert('dont pass action')
    }
  }

  // handle add follow
  const handleAddFollow = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:4000/users/add-follow`, {
        filmId: query,
        userId: inforUsers.id === null ? 0 : inforUsers.id
      })
      if (response.data === 'Sucess') {
        displayMsg('addFollow')
        setFollowed([response.data])
      }
    } catch (err) {
      console.log(err);
    }
  }

  // handle add follow
  const handleRemoteFollow = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:4000/users/remote-follow`, {
        data: {
          filmId: query,
          userId: inforUsers.id === null ? 0 : inforUsers.id

        }
      })

      if (response.data === 'Delete Sucess') {
        displayMsg('removeFollow')
        setFollowed([])
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getData = async function () {
      try {
        const response1 = axios.get(`http://127.0.0.1:4000/films/infor-film?filmId=${query}`);

        const response2 = axios.get(`http://127.0.0.1:4000/users/followed-only-film`, {
          params: {
            filmId: query,
            userId: inforUsers.id === null ? 0 : inforUsers.id
          }
        });

        Promise.all([response1, response2]).then(([response1, response2]) => {
          setData(response1.data)
          setFollowed(response2.data)
        })


      } catch (error) {
        console.error(error);
      }
    }
    getData()

  }, [query])

  return (
    <MyContext.Provider value={functest} >
      <div className={cx('movie-information')}>

        {/* login section */}
        {inforUsers && <LoginSection />}

        {/* infor-movie */}
        <div className={cx('wrap-infor-movie')}>
          {data && (<h2>{data.inforFilm[0].name}</h2>)}
          <div className={cx('infor-movie')}>
            <div className={cx('img')}>
              {data && <img alt='xin chao' src={data.inforFilm[0].image} />}
            </div>
            <div className={cx('wrap-row')}>
              <div className={cx('row')}>
                <div className={cx('column-1')}>Thể loại</div>
                <div className={cx('column-2')}>
                  {data && data.genres.map((genre, index) => (
                    <button key={index}>{genre.genre}</button>
                  ))}
                </div>
              </div>
              <div className={cx('row')}>
                <div className={cx('column-1')}>Trạng thái</div>
                <div className={cx('column-2')}>
                  {data && <span>{data.inforFilm[0].status === 0 ? 'Đang tiến hành' : 'Đã hoàn thành'}</span>}
                </div>
              </div>
              <div className={cx('row')}>
                <div className={cx('column-1')}>Điểm</div>
                <div className={cx('column-2')}>
                  {data && <span>{`${(data.mediumPoint.length === 1) ? data.mediumPoint[0].avg : 0}
                ||
                ${data.mediumPoint.length === 1 ? data.mediumPoint[0].count : 0} đánh giá`}</span>}
                </div>
              </div>
              <div className={cx('row')}>
                <div className={cx('column-1')}>Phát hành
                </div>
                <div className={cx('column-2')}>
                  {data && <span>{data.inforFilm[0].year}</span>}
                </div>
              </div>
              <div className={cx('row')}>
                <div className={cx('column-1')}>Thời lượng
                </div>
                <div className={cx('column-2')}>
                  {data && <span>{data.inforFilm[0].oddFilmLength === null
                    ? data.inforFilm[0].seriesFilmLength
                    : (data.inforFilm[0].oddFilmLength + ' phút')
                  }</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* status-play */}
        <div className={cx('status-play')}>
          <div className={cx('before')}>
            {data && <Link
              to={`/watch-movie?id=${data.inforFilm[0].id}&episode=${data.episodeFilm[data.episodeFilm.length - 1].episode}`}
              style={{ 'background': '#25867d' }}
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
              }}
              className={cx('play')}
            >
              <FontAwesomeIcon icon={faCirclePlay} />
            </Link>}
            {inforUsers ?
              (followed.length === 0 ?
                (<div style={{ 'background': '#369e69' }} className={cx('play')} onClick={handleAddFollow}>
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                </div>)
                :
                (<div style={{ 'background': '#7d4848' }} className={cx('play')} onClick={handleRemoteFollow}>
                  <FontAwesomeIcon icon={faFileExcel} />
                </div>))
              :
              (<div style={{ 'background': '#369e69' }} className={cx('play')} onClick={() => {
                displayMsg('toastLogin')
              }}>
                <FontAwesomeIcon icon={faFileCirclePlus} />
              </div>)
            }
            {/* ToastContainer */}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              // autoClose={true}
              draggable
              pauseOnHover
              theme="dark"
              closeButton={false}
            />
          </div>
          <div className={cx('after')}
            style={{ 'background': '#369e69' }}
            onClick={() => { displayMsg('filmReview') }}
          >
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>

        {/* part-of-movie */}
        {data && data.relatedFilm.length !== 0 &&
          <div className={cx('part-of-movie')}>
            <h2>Phim liên kết</h2>
            <div className={cx('wrap-btn')}>
              {data.relatedFilm.map((item, index) => (
                <div key={index}>
                  {item.currentMovie && <Link key={item.currentFilmLink}
                    to={`/movie-information?filmId=${item.currentFilmLink}`}
                    onClick={() => {
                      setQuery(item.relatedFilmLink)
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto",
                      });
                    }}
                    className={cx('current-film')}
                  >
                    Movie {item.currentMovie}
                  </Link>}
                  {item.currentPart && <Link key={item.currentFilmLink}
                    to={`/movie-information?filmId=${item.currentFilmLink}`}
                    onClick={() => {
                      setQuery(item.relatedFilmLink)
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto",
                      });
                    }}
                    className={cx('current-film')}
                  >
                    Phần {item.currentPart}
                  </Link>}
                  {item.relatedMovie && <Link key={item.relatedFilmLink}
                    to={`/movie-information?filmId=${item.relatedFilmLink}`}
                    onClick={() => {
                      setQuery(item.relatedFilmLink)
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto",
                      });
                    }}
                  >
                    Movie {item.relatedMovie}
                  </Link>}
                  {item.relatedPart && <Link key={item.relatedFilmLink}
                    to={`/movie-information?filmId=${item.relatedFilmLink}`}
                    onClick={() => {
                      setQuery(item.relatedFilmLink)
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "auto",
                      });
                    }}
                  >
                    Phần {item.relatedPart}
                  </Link>}
                </div>
              ))}
            </div>
          </div>
        }

        {/* wrap-content */}
        <div className={cx('wrap-content')}>
          <div className={cx('column-1')}>
            <span>Danh sách tập</span>
            <div>
              {data && data.episodeFilm.map((item, index) => {
                item.episode === 10000 && (minEpisode = 10000)

                return (<Link
                  key={index}
                  to={`/watch-movie?id=${data.inforFilm[0].id}&episode=${item.episode}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                  }}
                >
                  {item.episode !== 10000 ? item.episode : 'Full'}
                </Link>)
              })}
            </div>
          </div>
          <div className={cx('column-2')}>
            <span>Nội dung</span>
            {data && <div>{data.inforFilm[0].description}</div>}
          </div>
        </div>

        {/* comment-section */}
        <Comment
          url={`http://127.0.0.1:4000/films/comment-film?filmId=${query}`}
          url2={`http://127.0.0.1:4000/films/rep-comment?filmId=${query}`}
          filmId={query}
          userId={inforUsers.id}
          episode={minEpisode}
        />

        {/* read stories */}
        <div className={cx('read-stories')}>
          <Link to='/'>
            <Button content='Đọc truyện chữ' border={false} />
          </Link>
        </div>
      </div >
    </MyContext.Provider>
  );
}

export default MovieInformationPage;
