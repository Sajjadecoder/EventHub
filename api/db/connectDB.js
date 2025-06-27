import pg from 'pg'
const {Pool} = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'eventdb',
  password: '111',
  port: 5432, // default PostgreSQL port
});

// Test DB connection
pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL DB'))
  .catch(err => console.error('🔴 Connection to PostgreSQL failed:', err.stack));

export {pool}