import pg from 'pg';
import config from '../config';

const db = new pg.Pool(config);


export default db;
