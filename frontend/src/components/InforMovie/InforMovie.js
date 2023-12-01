import classNames from 'classnames/bind';
import { Link } from "react-router-dom";

import styles from './InforMovie.module.scss';

let cx = classNames.bind(styles);


function InforMovie({
    src,
    onClick,
    currentEpisode = '??',
    numberEpisodes = '??',
    id,
    mediumPoint,
    name = '?????' }) {

    let props = {
        key: Math.ceil(Math.random() * 10000),
        onClick
    }

    return (

        <div className='col l-2-4 t-3 m-6'>
            <div {...props} className={cx('infor-movie')}>
                <Link to={`/movie-information?filmId=${id}`} className={cx('container-img')}>
                    <img alt={`Ảnh anime ${name}`} src={`${src}`} />
                    {numberEpisodes === 1 ?
                        (<span className={cx('episode')}>Full</span>)
                        :
                        (<span className={cx('episode')}>{currentEpisode}/{numberEpisodes || '??'}</span>)
                    }
                    {mediumPoint && <span className={cx('evaluate')}>{mediumPoint}</span>}
                    <h3>{name}</h3>
                </Link>
            </div>
        </div>
    )
}

export default InforMovie;
