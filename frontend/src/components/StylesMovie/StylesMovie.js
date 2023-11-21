import styles from './StylesMovie.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function StylesMovie({ content = '???', children }) {
    return (
        <div className={cx('nominated-movie')}>
            <div className={cx('title')}>
                {content}
            </div>
            {children}
        </div>
    )
}

export default StylesMovie