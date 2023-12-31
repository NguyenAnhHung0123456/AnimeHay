import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChevronCircleRight, faCircleExclamation, faClapperboard, faGear, faMoon, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

import Button from '../../components/Button/Button';
import styles from './WatchMoviePage.module.scss';
import Comment from '../../components/Comment'
import { useEffect, useState } from 'react';
import PostTime from '../../components/PostTime';
import LoginSection from '../../components/LoginSection/LoginSection';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);

function WatchMoviePage() {
  const [data, setData] = useState('')

  // server 
  const [server, setServer] = useState('ophim')

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  // filmId
  const [id, setId] = useState(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    return queryParameters.get("id");
  })

  // episode of film
  const [episode, setEpisode] = useState(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    return queryParameters.get("episode");
  })

  useEffect(() => {
    const getData = async function () {
      try {
        const response = await axios.get(`http://localhost:4000/films/watch-film/${id}/${episode}`);
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData()

    // add history
    const timeAddHistory = setTimeout(() => {
      if (inforUsers) {
        const getData = async function () {
          try {
            await axios.post(`http://localhost:4000/users/add-history`, {
              userId: inforUsers.id,
              filmId: id,
              episode: episode
            })
          } catch (error) {
            console.error(error);
          }
        }
        getData()
      }
    }, 5000)

    // add views of film
    const timeAddViews = setTimeout(() => {
      if (inforUsers) {
        const getData = async function () {
          try {
            await axios.post(`http://localhost:4000/films/add-views-film`, {
              filmId: id,
            })
          } catch (error) {
            console.error(error);
          }
        }
        getData()
      }
    }, 5000)

    return () => {
      clearTimeout(timeAddHistory)
      clearTimeout(timeAddViews)
    }

  }, [episode])

  return (
    <div className={cx('watch-movie')}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* movie-details */}
      <div className={cx('movie-details')}>
        <div className={cx('first')}>
          <FontAwesomeIcon icon={faClapperboard} />
          <div>{data?.infor_film?.name}</div>
        </div>
        <div className={cx('second')}>
          <span>Đang xem tập {data?.infor_film?.episode !== 10000 ? (data?.infor_film?.episode) : 'Full'}</span>
          <span>{data && PostTime(data.infor_film.time_upLoad)}</span>
        </div>
      </div>

      {/* introduction */}
      <div className={cx('introduction')}>
        <span>Truy cập:</span>
        <Link to='/'> AnimeHay.TV</Link>
        <span> hoặc</span>
        <Link to='/'> TenMienAnimeHay.com</Link>
        <span>
          khi bị chặn để biết thông tin về tên miền mới
        </span>
      </div>

      {/* how-episode */}
      <div className={cx('how-episode')}>
        <div className={cx('first')}>
          Tập  {data.infor_film?.episode !== 10000 ? (data.infor_film?.episode) : 'Full'}
        </div>
        <div className={cx('second')}>
          <div style={{ 'backgroundColor': '#795548' }}>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <div style={{ 'backgroundColor': '#b73a3a' }}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>
        </div>
      </div>

      {/* button-server */}
      <div className={cx('button-server')}>
        <Button onClick={() => {
          setServer('ophim')
        }} mini content='Ophim' style={server === 'ophim' ? { 'background': 'red', 'color': '#fff' } : { 'background': '#fff', 'color': '#000' }} />

        {data && data.infor_film?.phimgiff && <Button onClick={() => {
          setServer('phimgiff')
        }} mini content='Phimgiff' style={server === 'phimgiff' ? { 'background': 'red', 'color': '#fff' } : { 'background': '#fff', 'color': '#000' }} />}
      </div>

      {/* video */}
      <div className={cx('video')}>
        {data && <iframe width="640" allowFullScreen={true} frameBorder='0' height="360" src={data.infor_film[server]} title={data.infor_film?.name} />}
      </div>

      {/* option */}
      <div className={cx('option')}>
        <Button fa={<FontAwesomeIcon icon={faGear} />} style={{ background: '#25867d', 'fontSize': '1.4rem', padding: '10px 12px' }} />
        <Button fa={<FontAwesomeIcon icon={faMoon} />} style={{ background: '#3a79af', 'fontSize': '1.4rem', padding: '10px 12px' }} content='Night' />
        <Button fa={<FontAwesomeIcon icon={faBan} />} style={{ background: '#b73a3a', 'fontSize': '1.4rem', padding: '10px 12px' }} content='Ads' />

        {data &&
          (data.nextFilm !== undefined ?
            (<Button fa={<FontAwesomeIcon
              icon={faChevronCircleRight} />}
              to={`/watch-movie?id=${data.infor_film.id}&episode=${data.nextFilm.episode}`}
              onClick={() => {
                setEpisode(data.nextFilm.episode)
              }}
              style={{
                background: '#6b6a6a',
                'fontSize': '1.4rem',
                padding: '10px 18px'
              }} content='Tiếp'
            />)
            :
            (<Button fa={<FontAwesomeIcon
              icon={faChevronCircleRight} />}
              style={{
                background: '#4c4b4b',
                'fontSize': '1.4rem',
                padding: '10px 18px',
                opacity: 1,
                color: '#999'
              }} content='Tiếp'
            />)
          )
        }
      </div>

      {/* list-episode */}
      <div className={cx('list-episode')}>
        <div className={cx('before')}>Danh sách tập</div>
        <div className={cx('after')}>
          <div>
            {data && data.list_film?.map((item, index) => {
              return (< Link key={index}
                style={item.episode === +episode ? { 'backgroundColor': '#bb6464' } : {}}
                to={`/watch-movie?id=${data.infor_film.id}&episode=${item.episode}`}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                  setEpisode(item.episode)
                  setServer('ophim')
                }}
              >
                {item.episode}
              </Link>)
            })}
          </div>
        </div>
      </div>

      {/* Comment */}
      {console.log('id', inforUsers?.id)}
      {
        data && (<Comment
          url={`http://127.0.0.1:4000/films/comment-episode-film/${data.infor_film.id}/${data.infor_film.episode}`}
          url2={`http://127.0.0.1:4000/films/rep-episode-comment/${data.infor_film.id}/${data.infor_film.episode}`}
          filmId={id}
          episode={episode}
          userId={inforUsers?.id}
        />)
      }

      {/* read-story */}
      <div className={cx('read-story')}>
        <Button content='Đọc truyện chữ' border={false} style={{ 'backgroundColor': '#b73a3a' }} />
      </div>
    </div >
  );
}

export default WatchMoviePage;
