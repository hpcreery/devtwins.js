// ReactJS
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom'

// Components
import SiteHeader from './MainHeader'
import PageHandler from './PageHandler'
import MarkdownRenderer from './renderers/MarkdownRenderer'
import FrontPage from './pages/FrontPage'

// UI Elements
import { Layout, Affix, Button, Row, Col } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PictureOutlined,
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { useThemeSwitcher } from 'react-css-theme-switcher'

const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class Main extends Component {
  constructor(props) {
    super(props)
    document.documentElement.dataset.scroll = 0
    this.state = {
      // isDarkMode: false,
    }
  }

  state = {
    scrollPosition: 0,
  }

  listenToScrollEvent = () => {
    document.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        // Calculates the scroll distance
        this.calculateScrollDistance()
      })
    })
  }

  calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset
    const windowHeight = window.innerHeight
    const docHeight = this.getDocHeight()
    const totalDocScrollLength = docHeight - windowHeight
    this.scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100)
    //console.log(scrollPostion)
    document.documentElement.dataset.scroll = this.scrollPostion
  }

  getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
  }

  changeTheme = (nextTheme) => {
    Object.keys(nextTheme).map((key) => {
      var value = nextTheme[key]
      document.documentElement.style.setProperty(key, value)
    })
  }

  _PageHandler = (prop) => {
    console.log('Match:', prop)
    const page = prop.match.params.page
    const category = prop.match.params.category

    return (
      <div>
        <h1>
          {category} {page}
        </h1>
        <MarkdownRenderer category={category} page={page} />
      </div>
    )
    // return <MarkdownRenderer />
  }

  ThemeSwitchComponent = () => {
    const { switcher, themes, currentTheme, status } = useThemeSwitcher()
    const [isDarkMode, setIsDarkMode] = React.useState(false)

    if (status === 'loading') {
      return <div>Loading styles...</div>
    }

    const toggleDarkMode = () => {
      setIsDarkMode((previous) => {
        switcher({ theme: previous ? themes.light : themes.dark })
        return !previous
      })
    }

    return (
      <div>
        <h2>Current theme: {currentTheme}</h2>
        <button onClick={toggleDarkMode}> swith the theme </button>
      </div>
    )
  }

  render() {
    console.log('rendering')
    return (
      <Router>
        <Layout className='Site-Layout'>
          <SiteHeader />
          <Content className='Content'>
            {/* <this.ThemeSwitchComponent/> */}
            {/* <h2>Current status: {this.ThemeSwitchComponent.status}</h2> */}
            {/* <div>This is a test</div> */}
            <Route path='/' exact component={FrontPage} />
            <Route path='/:category/:page' component={PageHandler} />
          </Content>
          <Footer>
            <Row justify='space-between'>
              <Col span={20}>Created by Hunter & Peyton Creery</Col>
              {/* <Col> */}
              <Col>
                <GithubOutlined />
              </Col>
              <Col>
                <YoutubeOutlined />
              </Col>
              <Col>
                <InstagramOutlined />
              </Col>
              Social
              {/* </Col> */}
            </Row>
            {/* Created by Hunter & Peyton Creery */}
          </Footer>
        </Layout>
      </Router>
    )
  }
  componentDidMount() {
    this.listenToScrollEvent()
  }
}
