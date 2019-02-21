import { combineReducers } from 'redux';

import images from './images';
import user from './user';

const rootReducer = combineReducers({ images, user });

export default rootReducer;
