import mysql from 'mysql2'

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'moviewebsitedb',
    password: 'Dangkymkmsql@1234',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

export default pool