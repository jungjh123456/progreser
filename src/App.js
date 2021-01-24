import { Route, Switch } from 'react-router-dom';
import './App.css';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootSaga } from './modules/root';
import LoginContainer from './containers/LoginContainer';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import SignContainer from './containers/SignContainer';
import NewRoutineContainer from './containers/NewRoutineContainer';
import storage from 'redux-persist/lib/storage';
import persistReducer from '../node_modules/redux-persist/es/persistReducer';
import persistStore from '../node_modules/redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import MyModal from './ModalPortal/MyModal/MyModal';
import RoutineContainer from './containers/MobxRoutineContainer';
import { Provider as MoxProvider } from 'mobx-react';
import RoutineStore from './mobx/RoutineStore';
import MobxnewRoutineContainer from './containers/MobxnewRoutineContainer';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userInfo', 'signinfo', 'newRoutine', 'getRoutine'],
};
const enhancedReducer = persistReducer(persistConfig, rootReducer(history));
const RoutineStores = new RoutineStore();
const store = createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

function App() {
  return (
    <MoxProvider RoutineStore={RoutineStores}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <ConnectedRouter history={history}>
              <Switch>
                <Route path="/login" component={LoginContainer} />
                <Route path="/newroutine" component={MobxnewRoutineContainer} />
                <Route path="/signup" component={SignContainer} />
                <Route path="/" exact component={RoutineContainer} />
              </Switch>
            </ConnectedRouter>
          </div>
          {/* <MyModal /> */}
        </PersistGate>
      </Provider>
    </MoxProvider>
  );
}

export default App;
