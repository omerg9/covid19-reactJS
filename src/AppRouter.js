import React from 'react'
import NavMenu from './components/includes/NavMenu'
import TopCases from './components/TopCases'
import TopIncreaseRate from './components/TopIncreaseRate'
import MostStable from './components/MostStable'
import SingleCountry from './components/SingleCountry'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './style.css'

const AppRouter = () => {
    return (
        <Router>
            <NavMenu/>
            <Switch>
                <Route path='/' component={TopCases} exact={true}/>
                <Route path='/top-increase-rate' component={TopIncreaseRate}/>
                <Route path='/most-stable' component={MostStable}/>
                <Route path='/country/:id/:countryName' component={SingleCountry}/>
            </Switch>
        </Router>
    )
}

export default AppRouter