import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './HomePage.module.scss';
import ReactSlick from './HomePageItems/ReactSlick'
import StylesMovie from '../../components/StylesMovie'
import Button from '../../components/Button';
import WrapComponentEmpty from '../../components/WrapComponentEmpty/WrapComponentEmpty';
import Paginate from '../../components/Paginate';
import { Link } from 'react-router-dom';
import LoginSection from '../../components/LoginSection/LoginSection';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);


function HomePage() {
  const [data, setData] = useState()

  // use selector
  const inforUsers = useSelector(state => (state.user.value))

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('http://localhost:4000/films/list-film');
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }, [])

  return (
    <div className={`${cx('container')}`}>

      {/* login section */}
      {inforUsers && <LoginSection />}

      {/* test page */}
      <Link style={{ 'fontSize': '24px', 'padding': '0 12px', 'color': 'red', 'display': 'block' }} to='/test'>trang test</Link>

      {/* nominated-movie */}
      < StylesMovie content='Phim đề cử' />

      {/* react-slick */}
      < ReactSlick />

      {/* nominated-movie */}
      < StylesMovie content='Mới cập nhật' >
        <div className={cx('wrap-btn')}>
          <button className={cx('btn', 'btn-red')}>Anime</button>
          <button className={cx('btn', 'btn-blue')}>CNA</button>
        </div>
      </StylesMovie >

      {/* paginate */}
      {data && <Paginate itemsPerPage={30} items={data} />}

      {/* Read stories */}
      < WrapComponentEmpty >
        <Button background='#b73a3a' border={false} content='Đọc truyện chữ' />
      </WrapComponentEmpty >
    </div >
  );
}

export default HomePage;
