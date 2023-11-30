import { upload } from '../routes/usersRouter';
import pool from '../configs/connectDb'
const promisePool = pool.promise();
const Mailjet = require('node-mailjet');
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// defined let random
let randomString;

class UsersControllers {
    // [method: post], [router: /users/log-in]
    async login(req, res, next) {
        try {
            const { account, password } = req.body

            const query = await promisePool.execute(
                `
                    select * from users where BINARY account = ?  and BINARY password = ?
                `,
                [account, password]
            )

            // where has error
            if (query[0].length === 0) {
                return res.json('Account not found!')
            }

            const { id: idHidden, admin } = query[0][0]

            const { password: pw, account: acc, id_google, ...rest } = query[0][0]

            // jwt
            const token = jwt.sign({
                userId: idHidden,
                admin: admin
            },
                process.env.ACCESTOKEN, {
                expiresIn: '2h'
            });

            // create cookie
            await res.cookie('accestoken', token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            })

            res.json({ ...rest, accestoken: token })
        } catch (err) {
            console.log(err)
            res.json('Login failed')
        }
    }

    // [method: post], [router: /users/log-in-google]
    async loginGoogle(req, res, next) {
        try {
            const { id, email, name, picture } = req.body

            let query2;

            const checkId = await promisePool.execute(
                `
                SELECT * FROM users where id_google = ?
                `,
                [id]
            );

            if (checkId[0].length === 0) {
                // add account
                await promisePool.execute(
                    `
                    insert users (name, email, avatar, id_google)
                    values 
                    (?, ?, ?, ?)
                    `,
                    [name, email, picture, id]
                );

                query2 = await promisePool.execute(
                    `
                    select * from users where id_google = ?
                    `,
                    [id]
                );


            } else {
                // login
                query2 = await promisePool.execute(
                    `
                    select * from users where id_google = ?
                    `,
                    [id]
                )

            }

            const result = query2[0][0];

            // // defined constant
            const { id: idHidden, admin } = result;

            const { password: pw, account: acc, id_google, ...rest } = result

            // jwt
            const token = jwt.sign({
                userId: idHidden,
                admin: admin
            },
                process.env.ACCESTOKEN, {
                expiresIn: '2h'
            });

            // create cookie
            await res.cookie('accestoken', token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            })

            res.json({ ...rest, accestoken: token })


        } catch (err) {
            console.log(err)
            res.json('Login failed!')
        }
    }

    // [method: post], [router: /users/add-evaluate]
    async addEvaluate(req, res, next) {
        try {
            const { userId, filmId, evaluateId } = req.body

            // check evaluate
            const checkEvaluate = await promisePool.execute(
                `
                select * from evaluateuseroffilm where filmId = '${filmId}' and userId = ${userId}
                `
            )

            if (checkEvaluate[0].length === 0) {
                await promisePool.execute(
                    `
                    insert evaluateuseroffilm (filmId, userId, evaluateId)
                    values 
                    ( '${filmId}', ${userId}, ${evaluateId})
                    `
                )
                res.json('Add evaluate Sucess')
            } else {
                await promisePool.execute(
                    `
                    update evaluateuseroffilm set evaluateId = ${evaluateId}
                    WHERE userId = ${userId} and filmId = '${filmId}'
                    `
                )

                res.json('Update evaluate Sucess')
            }
        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-comment]
    async addComment(req, res, next) {
        try {
            const { filmId, userId, episode, content } = req.body

            await promisePool.execute(
                `
                insert commentuseroffilm (filmId, userId, episode, content)
                values 
                ('${filmId}', ${userId}, ${episode}, '${content}')
                `
            )

            res.json('Add comment sucessfully!')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-rep-comment]
    async addRepComment(req, res, next) {
        try {
            const { userId, content, idCommentFilm } = req.body

            await promisePool.execute(
                `
                insert repcomment (userId, content, idCommentFilm)
                values 
                (${userId}, '${content}', ${idCommentFilm})
                `
            )

            res.json('Add rep comment sucessfully!')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/history-film]
    async historyFilm(req, res, next) {
        try {
            const userId = req.query.userId

            const query = await promisePool.execute(
                `
                select films.id, films.name, historyOfFilm.timeView, historyOfFilm.episode, historyOfFilm.userId, films.image
                from historyOfFilm
                join episodeoffilm on episodeoffilm.episode = historyOfFilm.episode and historyOfFilm.filmId = episodeoffilm.filmId
                join users on historyOfFilm.userId = users.id
                join films on historyOfFilm.filmId = films.id
                where historyOfFilm.userId = ${userId}
                order by historyOfFilm.timeView desc
                limit 10
                `
            )

            res.json(query[0])

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/followed-film]
    async followedFilm(req, res, next) {
        try {
            const userId = req.query.userId

            const query1 = promisePool.execute(
                `
                select films.name, films.description, films.movie_duration, films.number_episodes, films.year, films.image, films.id,
                max(episodeoffilm.episode) as currentEpisode
                from followedFilm
                join users on users.id = followedFilm.userId
                join films on films.id = followedFilm.filmId
                join episodeoffilm on films.id = episodeoffilm.filmId
                where followedFilm.userId = ?
                group by films.name, films.description, films.movie_duration, films.number_episodes, films.year, films.image, films.id
                `,
                [userId]
            )

            const query2 = promisePool.execute(
                `
                select evaluateuseroffilm.filmId, cast(avg(evaluateuseroffilm.evaluateId) as decimal(3,1)) as mediumPoint
                from evaluateuseroffilm
                join films on films.id = evaluateuseroffilm.filmId
                where evaluateuseroffilm.filmId in ( select filmId from followedFilm where userId = ${userId} )
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

                // Gọi hàm addMediumPoint và lưu kết quả vào biến result
                let result = addMediumPoint(followedFilm, mediumPoint);

                res.json(result)
            })


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-password]
    async changePassword(req, res, next) {
        try {
            const userId = req.body.userId
            const currentPassword = req.body.currentPassword
            const newPassword = req.body.newPassword

            const query = await promisePool.execute(
                `
                 select password from users where id = ${userId}
                `
            )

            if (query[0][0].password === currentPassword) {
                const updataPassword = await promisePool.execute(
                    `
                    update users set password = '${newPassword}'
                    WHERE id = ${userId}
                    `
                )

                res.json('Success')
            } else {
                res.json('Failer')
            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/update-password-forgot-password]
    async updatePasswordForgotPassword(req, res, next) {
        try {
            const { account, password } = req.body

            const checkAccount = await promisePool.execute(
                `
                SELECT account FROM users where account = '${account}'
                `
            )

            if (checkAccount[0].length === 0) {
                res.json('Account not found!')
            } else {
                const query = await promisePool.execute(
                    `
                        update users set password = '${password}'
                        WHERE account = binary '${account}'
                    `
                )
                res.json('Password changed successfully!')

            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-comment]
    async changeComment(req, res, next) {
        try {
            const { commentId, content } = req.body

            const query = await promisePool.execute(
                `
                update commentuseroffilm set content = '${content}'
                WHERE id = ${commentId}
                `
            )

            res.json('Update comment sucessfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/update-isread]
    async updateIsread(req, res, next) {
        try {
            const { id } = req.body

            const query = await promisePool.execute(
                `
                update notifycation set is_read = 1
                WHERE id = ?
                `,
                [id]
            )

            res.status(200).json('Update isread succesfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/change-rep-comment]
    async changeRepComment(req, res, next) {
        try {
            const { id, content } = req.body

            const query = await promisePool.execute(
                `
                update repcomment set content = '${content}'
                WHERE id = ${id}
                `
            )

            res.json('Update rep comment sucessfully!')


        } catch (err) {
            console.log(err)
        }
    }

    // [method: put], [router: /users/forgot-password]
    async forgotPassword(req, res, next) {
        try {
            const { email, account } = req.body

            const checkAccount = await promisePool.execute(
                `
                SELECT account FROM users where account = binary '${account}'
                `
            )

            if (checkAccount[0].length === 0) {
                res.json('Not find account!')
            } else {

                const checkEmail = await promisePool.execute(
                    `
                    SELECT * FROM users where account = '${account}' and email = binary '${email}'
                    `
                )

                if (checkEmail[0].length === 0) {
                    res.json('Email does not match account!')
                } else {
                    // code defined password
                    randomString = Math.random().toString(36).substring(2, 10);

                    const mailjet = Mailjet.apiConnect(
                        process.env.MJ_APIKEY_PUBLIC,
                        process.env.MJ_APIKEY_PRIVATE,
                    );

                    const request = mailjet
                        .post('send', { version: 'v3.1' })
                        .request({
                            Messages: [
                                {
                                    From: {
                                        Email: process.env.EMAIL_HOST,
                                        Name: "Web Animehay"
                                    },
                                    To: [
                                        {
                                            Email: email,
                                            Name: email
                                        }
                                    ],
                                    Subject: "forget password",
                                    HTMLPart: `
                            <h2>This is the code to confirm the password<h2/>
                            <button>${randomString}</button>
                            `
                                }
                            ]
                        })

                    request
                        .then((result) => {
                            res.json('Account found!')
                        })
                        .catch((err) => {
                            res.json(err.statusCode)
                        })
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-history]
    async addHistory(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId
            const episode = req.body.episode

            const query = await promisePool.execute(
                `
                select filmId from historyoffilm where filmId = '${filmId}' and userId = ${userId} and episode = ${episode}
                `
            )

            if (query[0].length === 0) {
                const query = await promisePool.execute(
                    `
                    insert historyoffilm (filmId, episode, userId)
                    values 
                    ( '${filmId}', ${episode}, ${userId})
                    `
                )

                res.json('Add history sucess');

            } else {
                const query = await promisePool.execute(
                    `
                    update historyoffilm set timeView = current_timeStamp
                    WHERE userId = ${userId} and filmId = '${filmId}' and episode = ${episode}
                    `
                )

                res.json('Update history sucess');
            }

        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-account]
    async addAccount(req, res, next) {
        try {
            const { account, email, password } = req.body

            const checkAccount = await promisePool.execute(
                `
                select * from users where account = binary '${account}'
                `
            )

            if (checkAccount[0].length !== 0) {
                res.json('Account already exists')
            } else {
                const quer = await promisePool.execute(
                    `
                        insert users (email, password, lever, account, experience, coint)
                        values 
                        ('${email}', '${password}', 0, '${account}', 0, 0)
                    `
                )

                res.json('Create account sucess')

            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/validate-code-forgot-password]
    async validateCodeForgotPassword(req, res, next) {
        try {
            const { code } = req.body

            console.log(code, randomString)

            if (code === randomString) {
                res.json('Verified successfully!')
            } else {
                res.json('Verification code is incorrect!')
            }


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/followed-only-film]
    async followedOnlyFilm(req, res, next) {
        try {
            const userId = req.query.userId
            const filmId = req.query.filmId

            const query = await promisePool.execute(
                `
                select * from followedfilm where filmId = '${filmId}' and userId = ${userId}
                `
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/profile]
    async profile(req, res, next) {
        try {

            if (req.file === undefined) {
                res.json('Bạn chưa chọn cảnh')
            }

            const avatar = `http://127.0.0.1:${process.env.POST}/${req.file.destination}${req.file.filename}`

            const userId = req.body.userId

            const query = await promisePool.execute(
                `
                update users set avatar = '${avatar}'
                WHERE id = ${userId}
                `
            )

            res.json({ notify: 'Update file Sucessfully!', avatar: avatar })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/list-evaluate]
    async listEvaluate(req, res, next) {
        try {

            const query = await promisePool.execute(
                `
                select id from evaluates
                `
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/list-notification ]
    async listNotification(req, res, next) {
        try {

            const { userId } = req.query

            const query = await promisePool.execute(
                `
                select * from notifycation where userId = ? order by time desc
                `,
                [userId]
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: get], [router: /users/notification ]
    async notification(req, res, next) {
        try {

            const { id } = req.query

            const query = await promisePool.execute(
                `
                select * from notifycation where id = ?
                `,
                [id]
            )

            res.json(query[0])


        } catch (err) {
            console.log(err)
        }
    }

    // [method: post], [router: /users/add-follow]
    async addFollow(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId

            const query = await promisePool.execute(
                `
                insert followedFilm (filmId, userId)
                values 
                ( '${filmId}', ${userId})
                `
            )

            res.json('Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-follow]
    async remoteFollow(req, res, next) {
        try {
            const userId = req.body.userId
            const filmId = req.body.filmId

            const query = await promisePool.execute(
                `
                delete from followedFilm
                where filmId = '${filmId}' and userId = ${userId}
                `
            )

            res.json('Delete Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-history]
    async remoteHistory(req, res, next) {
        try {
            const userId = req.body.userId

            const query = await promisePool.execute(
                `
                select * from historyoffilm where userId = ${userId} order by timeView desc
                `
            )

            if (query[0].length > 100) {
                const query = await promisePool.execute(
                    `
                    DELETE FROM historyoffilm
                    WHERE timeView IN (
                        SELECT timeView FROM (
                            SELECT timeView FROM historyoffilm WHERE userId = ${userId} ORDER BY timeView ASC LIMIT 70
                        ) AS tmp
                    )
                    AND userId = ${userId}

                    `
                )
            }

            res.json('Delete Sucess')
        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-comment]
    async remoteComment(req, res, next) {
        try {
            const { commentId } = req.body

            const query1 = promisePool.execute(
                `
                DELETE from repcomment
                where idCommentFilm = ${commentId}
                `
            )

            const query2 = promisePool.execute(
                `
                DELETE from commentuseroffilm
                where id = ${commentId}
                `
            )

            Promise.all([query1, query2]).then(() => {
                res.json('Delete comment sucessfully!')
            })

        } catch (err) {
            console.log(err)
        }
    }

    // [method: delete], [router: /users/remote-rep-comment]
    async remoteRepComment(req, res, next) {
        try {
            const { id } = req.body

            const query1 = promisePool.execute(
                `
                delete from repcomment
                where id = ${id}
                `
            )
            res.json('Delete rep comment sucessfully!')

        } catch (err) {
            console.log(err)
        }
    }
}

export default new UsersControllers