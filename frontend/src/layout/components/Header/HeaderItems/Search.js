import { useState, useEffect, memo } from 'react'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import styles from './HeaderItems.module.scss'

let cx = classNames.bind(styles);

function Search({ show }) {

    // value search
    const [searchValue, setSearchValue] = useState('')

    // data
    const [data, setData] = useState(null)

    useEffect(() => {
        if (searchValue !== '') {
            const id = setTimeout(() => {

                async function getUser() {
                    try {
                        const response = await axios.get(`http://localhost:4000/films/search-film`, {
                            params: {
                                name: searchValue === '' ? undefined : searchValue
                            }
                        });

                        setData(response.data)
                    } catch (error) {
                        console.error(error);
                    }
                }
                getUser()
            }, 1000)

            return () => {
                clearTimeout(id)
            }
        } else {
            setData(null)
        }
    }, [searchValue])

    // handle search
    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }

    // handle search film reducer
    const handleClickSearch = () => {
        if (searchValue === '') {
            alert('Bạn chưa nhập từ khóa tìm kiếm')
        } else {
            window.location.href = `/search-film?name=${searchValue}`
            setData(null)
        }
    }

    return (
        <div className={`${show === false && 'hide-on-m-t'} ${cx('search')}`}>
            <div className={cx('before')}>
                <input
                    value={searchValue}
                    onChange={handleChangeSearch}
                    placeholder='Nhập từ khóa...'
                    spellCheck={false}
                />
                <button
                    onClick={handleClickSearch}
                >
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </button>

            </div>

            {
                data && (
                    <ul className={cx('after')}>
                        {data.map((item, index) => (
                            <li key={index}>
                                <a onClick={() => {
                                    setSearchValue('')
                                }} href={`/movie-information?filmId=${item.filmId}`} className={cx('conver-page-search')}>
                                    <div className={cx('wrap-avartar')}>
                                        <img alt='avata' src={`https://i.ytimg.com/vi/${item.image}/mqdefault.jpg`} />
                                    </div>

                                    <div className={cx('details')}>
                                        <h3>{item.name}</h3>
                                        {item.oddFilmLength === null ?
                                            (<span>{item.maxEpisode} / {item.seriesFilmLength || '???'}</span>)
                                            :
                                            (<span>{item.oddFilmLength}</span>)
                                        }
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>

    )
}

export default memo(Search)