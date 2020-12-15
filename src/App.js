import './App.css';
import StoresList from './components/stores/StoresList'
import {Route, BrowserRouter as Router, Link, Switch} from 'react-router-dom'
import Header from './components/Header'
import AddStore from './components/stores/AddStore'
import StoreDetail from './components/stores/StoreDetail'

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Switch>
                    <Route path='/add-store' component={AddStore} />
                    <Route path='/store-detail/:id' component={StoreDetail} />
                    <Route to='/' component={StoresList} />
                </Switch>
            </Router>
        </div>
    );
}


export default App;
