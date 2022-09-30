import { combineReducers } from 'redux';
import { user } from './user';
import { users } from './users';

const reducers = combineReducers({
    userState: user,
    usersState: users
});
export default reducers;
