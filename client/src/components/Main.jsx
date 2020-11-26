// ReactJS
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import SiteHeader from './MainHeader'
import MainFooter from './Footer'
import PageHandler from './PageHandler'
// import MarkdownRenderer from './Renderers/MarkdownRenderer'
import FrontPage from './pages/FrontPage'
import SearchPage from './pages/SearchPage'

// UI Elements
import { Layout } from 'antd'
import { useThemeSwitcher } from 'react-css-theme-switcher'

const { Content } = Layout

// Main Class
export default class Main extends Component {
  // constructor(props) {
    // super(props)
    //document.documentElement.dataset.scroll = 0
    //this.contentRef = React.createRef()
  // }

  state = {}

  // listenToScrollEvent = () => {
  //   document.addEventListener('scroll', () => {
  //     requestAnimationFrame(() => {
  //       // Calculates the scroll distance
  //       this.calculateScrollDistance()
  //     })
  //   })
  // }

  // calculateScrollDistance = () => {
  //   const scrollTop = window.pageYOffset
  //   const windowHeight = window.innerHeight
  //   const docHeight = this.getDocHeight()
  //   const totalDocScrollLength = docHeight - windowHeight
  //   this.scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100)
  //   //console.log(scrollPostion)
  //   document.documentElement.dataset.scroll = this.scrollPostion
  // }

  // getDocHeight = () => {
  //   return Math.max(
  //     document.body.scrollHeight,
  //     document.documentElement.scrollHeight,
  //     document.body.offsetHeight,
  //     document.documentElement.offsetHeight,
  //     document.body.clientHeight,
  //     document.documentElement.clientHeight
  //   )
  // }

  // changeTheme = (nextTheme) => {
  //   Object.keys(nextTheme).map((key) => {
  //     var value = nextTheme[key]
  //     document.documentElement.style.setProperty(key, value)
  //   })
  // }

  render() {
    // console.log('rendering')
    return (
      <Router>
        <Layout className='Site-Layout'>
          <SiteHeader />
          <Content className='Content'>
            <Route path='/' exact component={FrontPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/:category/:page' component={PageHandler} />
            {/* <BackTop> */}
            {/* <div className="Back-Up">UP</div> */}
            {/* </BackTop> */}
          </Content>
          <MainFooter />
        </Layout>
      </Router>
    )
  }

  componentDidMount() {
    //this.listenToScrollEvent()
  }
}
