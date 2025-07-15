import pg from 'pg'
import dotenv from 'dotenv';
const {Pool} = pg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL DB'))
  .catch(err => console.error('🔴 Connection to PostgreSQL failed:', err.stack));

export {pool}