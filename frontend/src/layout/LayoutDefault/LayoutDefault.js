import styles from './LayoutDefault.module.scss'
import classNames from 'classnames/bind';

import Header from '../components/Header'
import Footer from '../components/Footer'

let cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    return (
        <div style={{ 'background': '#000' }} className='grid'>
            <div className='wide'>

                <div className={cx('layout-default')}>
                    {/* header */}
                    <Header />

                    {children}

                    {/* footer */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default LayoutDefault