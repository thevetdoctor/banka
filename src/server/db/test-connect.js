import pg from 'pg';
import testConfig from '../config/test-config';

const testDB = new pg.Pool(testConfig);


export default testDB;
