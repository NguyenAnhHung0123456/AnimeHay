import pool from '../configs/connectDb'
const promisePool = pool.promise();

class FilmsControllers {
    // [method: get], [router: /films/list-film]
    async listFilm(req, res, next) {
        try {
            const query1 = await promisePool.execute(
                `
                select f.id, f.name, f.image, f.number_episodes, f.movie_duration,f.description, max(e.episode) as currentEpisode 
                from episodeoffilm as e join films as f 
                on e.filmID = f.id 
                group by f.name, f.image, f.number_episodes, f.id
            `)

            const query2 = promisePool.execute(
                `
                select evaluateuseroffilm.filmId,  cast(avg(evaluateuseroffilm.evaluateId) as decimal(10,1)) as mediumPoint
                from evaluateuseroffilm
                join films on films.id = evaluateuseroffilm.filmId
                group by evaluateuseroffilm.filmId
                `
            )

            Promise.all([query1, query2]).then((data) => {
                let followedFilm = data[0][0];
                let mediumPoint = data[1][0];

                function addMediumPoint(followedFilm, mediumPoint) {
                    let updatedFollowedFilm = followedFilm.map((film) => {
                        let match = mediumPoint.find((point) => point.filmId === film.id);

                        if (match) {
                            film.mediumPoint = match.mediumPoint;
                        } else {
                            film.mediumPoint = null
                        }

                        return film;
                    });

                    return updatedFollowedFilm;
                }

                let result = addMediumPoint(followedFilm, mediumPoint);

                res.json(result)
            })
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/infor-film]
    async inforFilm(req, res, next) {
        try {
            const id = req.query.filmId
            const querys = [
                promisePool.execute(
                    `
                    select *
                    from films join episodeoffilm where films.id = ? and episodeoffilm.filmId = ?
                    and episodeoffilm.episode = 1 and episodeoffilm.source_link = 'ophim'
                `,
                    [id, id]
                ),
                promisePool.execute(
                    `
                    select max(episodeoffilm.episode) as maxCurrent from episodeoffilm join films
                    on episodeoffilm.filmId = films.id
                    and episodeoffilm.filmId = ?
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select genres.genre from genreoffilm 
                    join genres on genres.genre = genreoffilm.genreId
                    where filmId = ?
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select avg(evaluateuseroffilm.filmId) as avg, count(evaluateuseroffilm.filmId) as count
                    from evaluateuseroffilm 
                    join evaluates on evaluates.id = evaluateuseroffilm.evaluateId
                    where evaluateuseroffilm.filmId = ?
                    group by evaluateuseroffilm.filmId
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    SELECT epo.episode, epo.videoLink
                    from episodeoffilm as epo
                    where epo.filmId = ? and epo.source_link = 'ophim'
                    order by epo.episode desc
                `,
                    [id]
                ),
                promisePool.execute(
                    `
                    select fi.id as currentFilmLink, fi.part as currentPart, fir.part as relatedPart, 
                    fir.id as relatedFilmLink
                    from relatedfilm as re, films as fi, films as fir
                    where re.filmId = fi.id and re.filmId = ?
                    and re.relatedfilmId = fir.id
                `,
                    [id]
                ),
            ]

            Promise.all(querys).then((data) => {

                // console.log('a', data[3][0])
                const result = {
                    inforFilm: data[0][0][0],
                    maxCurrent: data[1][0][0].maxCurrent,
                    genres: data[2][0],
                    mediumPoint: data[3][0],
                    episodeFilm: data[4][0],
                    relatedFilm: data[5][0],
                }
                res.json(result)
            })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/comment-film]
    async commentFilm(req, res, next) {
        try {
            const filmId = req.query.filmId
            const response = await promisePool.query(
                `
                select users.name, users.id as userId, users.lever, users.avatar, commentuseroffilm.filmId, commentuseroffilm.content, commentuseroffilm.time, commentuseroffilm.id
                from commentuseroffilm
                join episodeoffilm on commentuseroffilm.filmId = episodeoffilm.filmId
                and commentuseroffilm.episode = episodeoffilm.episode
                join users on commentuseroffilm.userId = users.id
                where commentuseroffilm.filmId = ?
                group by users.name, users.id, users.lever, users.avatar, commentuseroffilm.filmId, commentuseroffilm.content, commentuseroffilm.time, commentuseroffilm.id
                order by time desc
                `,
                [filmId]
            )

            const [data] = response

            res.json(data)
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/rep-comment]
    async repComment(req, res, next) {
        try {
            const filmId = req.query.filmId
            const data = await promisePool.query(
                `
                select users.name, users.lever, users.id as userId, users.avatar, repcomment.content, repcomment.time, repcomment.idCommentFilm, repcomment.id as commentRepId
                from repcomment
                join users on users.id = repcomment.userId
                join commentuseroffilm on commentuseroffilm.id = repcomment.idCommentFilm
                where commentuseroffilm.filmId = '${filmId}'
                order by repcomment.time asc
                `
            )

            res.json(data[0])
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/rep-episode-comment]
    async repEpisodeComment(req, res, next) {
        try {
            const { id, episode } = req.params
            const data = await promisePool.query(
                `
                select users.name, users.lever, users.avatar, users.id as userId, repcomment.content, repcomment.time, repcomment.idCommentFilm,  repcomment.id as commentRepId
                from repcomment
                join users on users.id = repcomment.userId
                join commentuseroffilm on commentuseroffilm.id = repcomment.idCommentFilm
                where commentuseroffilm.filmId = '${id}' and commentuseroffilm.episode = ${episode}
                order by repcomment.time asc
                `
            )

            res.json(data[0])
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/comment-episode-film]
    async commentEpisodeFilm(req, res, next) {
        try {
            const { id, episode } = req.params
            const response = await promisePool.query(
                `
                select users.name, users.lever, users.avatar, users.id as userId, commentuseroffilm.content, commentuseroffilm.time, commentuseroffilm.id
                from commentuseroffilm
                join episodeoffilm on commentuseroffilm.filmId = episodeoffilm.filmId
                and commentuseroffilm.episode = episodeoffilm.episode
                join users on commentuseroffilm.userId = users.id
                where commentuseroffilm.filmId = ?
                and episodeoffilm.episode = ?
                group by users.name, users.lever, users.avatar, users.id, commentuseroffilm.content, commentuseroffilm.time, commentuseroffilm.id
                order by time desc
                `,
                [id, episode]
            )

            const [data] = response

            res.json(data)
        }

        catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/watch-film/:filmName/:episode]
    async watchFilm(req, res, next) {
        try {
            const { filmName, episode } = req.params

            const querys = [
                promisePool.execute(
                    `
                    select fi.id, fi.name, ep.episode, ep.timeUpLoad, ep.videoLink, ep.source_link
                    from films as fi, episodeoffilm as ep
                    where fi.id = '${filmName}' and ep.episode = ${episode} and fi.id = ep.filmId
                `
                ),
                promisePool.execute(
                    `
                    select ep.videoLink, fi.name, ep.episode
                    from films as fi, episodeoffilm as ep
                    where fi.id = '${filmName}' and fi.id = ep.filmId and ep.episode > ${episode} and ep.episode < ${+episode + 2}
                `
                ),
                promisePool.execute(
                    `
                    select ep.episode, ep.videoLink
                    from films as fi, episodeoffilm as ep
                    where fi.id = '${filmName}' and fi.id = ep.filmId and ep.source_link = 'ophim'
                    order by ep.episode desc
                `
                )
            ]

            Promise.all(querys).then((data) => {
                const inforFilm = data[0][0][0]

                for (let i = 0; i < data[0][0].length; i++) {
                    inforFilm[data[0][0][i].source_link] = data[0][0][i].videoLink
                }

                delete inforFilm.videoLink
                delete inforFilm.source_link

                const result = {
                    inforFilm: inforFilm,
                    nextFilm: data[1][0][0],
                    listFilm: data[2][0]
                }

                res.json(result)
            })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/filter-film/filtered-film]
    async filteredFilm(req, res, next) {
        try {
            let { genres, years, minEpisode, status } = req.query

            const genresQuery = genres && "('" + genres.join("', '") + "')";
            const yearsQuery = years && "('" + years.join("', '") + "')";

            if (status === '1')
                status = 'and max(ep.episode) = fi.number_episodes'
            else if (status === '0')
                status = 'and max(ep.episode) != fi.number_episodes'

            let query1 =
                `
                select fi.name, max(ep.episode) as currentEpisode,
                fi.number_episodes, fi.image, fi.id, fi.year
                from films as fi join episodeoffilm as ep on fi.id = ep.filmId
                where id in (select genreoffilm.filmId from genreoffilm join  genres
                on genreoffilm.genreId = genres.genre
                where genres.genre
                in ${genresQuery}
                group by genreoffilm.filmId
                having count(genreoffilm.filmId) = ${genres ? genres.length : 5})
                and fi.year in ${yearsQuery || '(select year from films)'}
                group by fi.name,
                fi.number_episodes, fi.image, fi.id
                having max(ep.episode) >= ${minEpisode || '0'}
                ${status || ''}
            `
            let query2 =
                `
                select fi.name, max(ep.episode) as currentEpisode,
                fi.number_episodes, fi.image, fi.year, fi.id
                from films as fi join episodeoffilm as ep on fi.id = ep.filmId
                where fi.year in ${yearsQuery || '(select year from films)'}
                group by fi.id, fi.name,
                fi.number_episodes, fi.image, fi.year
                having count(ep.episode) >= ${minEpisode || '0'}
                ${status || ''}
            `

            let query = (genres ? query1 : query2)

            const [response] = await promisePool.execute(query)

            res.json(response)
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/filter-film/filter-list]
    async filterList(req, res, next) {
        try {

            const query1 = promisePool.execute(
                `
                select * from genres order by genre
                `
            )

            const query2 = promisePool.execute(
                `
                select distinct year from films order by year desc
                `
            )

            Promise.all([query1, query2])
                .then(([genres, years]) => {
                    const data = {
                        genres: genres[0],
                        years: years[0]
                    }

                    res.json(data)
                })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/views-film]
    async viewsFilm(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select episodeoffilm.filmId, films.name, films.number_episodes, films.image, max(episodeoffilm.episode) as maxEpisode
                from episodeoffilm
                join films on films.id = episodeoffilm.filmId
                where episodeoffilm.filmId in
                (select * from (select viewsoffilm.filmId
                from viewsoffilm
                join films
                on films.id = viewsoffilm.filmId
                group by viewsoffilm.filmId
                order by count(filmId) desc
                limit 10) temp_table)
                group by episodeoffilm.filmId, films.name, films.number_episodes, films.image
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /films/search-film]
    async searchFilm(req, res, next) {
        try {
            const { name } = req.query

            const query = await promisePool.execute(
                `
                select episodeoffilm.filmId, films.name, films.number_episodes, films.image, max(episodeoffilm.episode) as maxEpisode
                from episodeoffilm
                join films on films.id = episodeoffilm.filmId
                where films.name in (select name from films where name like '%${name}%')
                group by episodeoffilm.filmId, films.name, films.number_episodes, films.image
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /films/add-views-film]
    async addViewsFilm(req, res, next) {
        try {
            const { filmId } = req.body

            const query = await promisePool.execute(
                `
                insert viewsoffilm (filmId)
                values ('${filmId}')
                `
            )

            res.json('Add Views Of Film Sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }
}

export default new FilmsControllers