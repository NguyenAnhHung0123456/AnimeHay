import pool from '../configs/connectDb'
const promisePool = pool.promise();
import jwt from 'jsonwebtoken'

class TestControllers {
    // [method: get], [router: /]
    async test(req, res, next) {
        try {

            res.json('test sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /]
    async test2(req, res, next) {
        try {

            res.json('test2 sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

    // [method: get], [router: /]
    async test3(req, res, next) {
        try {
            console.log('test3')
            console.log(req.cookies)

            res.json('test 3 sucessfully!')
        } catch (err) {
            console.log(err)
            res.status(500).json('sai')
        }
    }

}

export default new TestControllers