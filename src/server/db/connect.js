import pg from 'pg';
import config from '../config';
import testConfig from '../config/test-config';

let configDetails;

if (process.env.NODE_ENV === 'test') {
  configDetails = testConfig;
} else {
  configDetails = testConfig;
}

const db = new pg.Pool(configDetails);


export default db;
