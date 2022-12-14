import { combineReducers } from '@reduxjs/toolkit';
import countReducer from './counter/counter-slice';
import readReducer from './Read/read-slice';
import authReducer from './auth/authSlice';
import videoReducer from './video/video-slice';
import studyReducer from './study/study-slice';
import writingReducer from './writing/writing-slice';
import dashboardReducer from './dashboard/dashboard-slice';
import guildReducer from './guild/guild-slice';
const rootReducer = combineReducers({
  counter: countReducer,
  read: readReducer,
  auth: authReducer,
  video: videoReducer,
  study: studyReducer,
  write: writingReducer,
  dashboard: dashboardReducer,
  guild: guildReducer,
});

export default rootReducer;
