import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk"
import {fakeShieldReducer} from "./FakeShield/Reducer"
import {qwenReducer} from "./Qwen/Reducer"
import { step1XReducer } from "./Step1X/Reducer"

export const PRELOAD_SURVEY_DATA = 'PRELOAD_SURVEY_DATA';

const rootReducers = combineReducers({
    fakeShieldData: fakeShieldReducer,
    qwenData: qwenReducer,
    step1XData: step1XReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))