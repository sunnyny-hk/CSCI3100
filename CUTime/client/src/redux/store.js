/*
    Description : store for reducers
    Contributer : Kwok Chun Yin
    Written on : 2022/4/5
    Last modified : 2022/4/10
*/

import React from 'react'
import {createStore} from 'redux'
import rootReducer from './reducers/'
import {Provider} from 'react-redux'

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function DataProvider({children}) {
    return (
        <Provider store={store}>

            {children}

        </Provider>

    )
}

export default DataProvider