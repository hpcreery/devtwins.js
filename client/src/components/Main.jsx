// ReactJS
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import MainHeader from './MainHeader'
import MainFooter from './Footer'
import PageHandler from './PageHandler'
// import MarkdownRenderer from './Renderers/MarkdownRenderer'
import FrontPage from './pages/FrontPage'
import SearchPage from './pages/SearchPage'

// UI Elements
import { Layout } from 'antd'

const { Content } = Layout

// Main Class
export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  state = {}

  render() {
    return (
      <Router>
        <Layout className='Site-Layout'>
          <MainHeader />
          <Content className='Content'>
            <Route path='/' exact component={FrontPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/:category/:page' component={PageHandler} />
          </Content>
          <MainFooter />
        </Layout>
      </Router>
    )
  }
}
