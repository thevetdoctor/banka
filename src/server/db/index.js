import { Pool } from 'pg';
// import config from '../config';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = null;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.database_params;
} else {
  connectionString = process.env.database_uri;
}

const pool = new Pool({
  connectionString,
});


export default pool;
