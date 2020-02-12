import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('jest-localstorage-mock');

configure({ adapter: new Adapter() });

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length),
  },
});
