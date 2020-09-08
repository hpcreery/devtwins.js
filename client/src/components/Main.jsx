// ReactJS
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom'

// Components
import SiteHeader from './MainHeader'
import PageHandler from './PageHandler'
// import MarkdownRenderer from './Renderers/MarkdownRenderer'
import FrontPage from './pages/FrontPage'
import SearchPage from './pages/SearchPage'

// UI Elements
import { Layout, Affix, Button, Row, Col, BackTop, Dropdown, Menu } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PictureOutlined,
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useThemeSwitcher } from 'react-css-theme-switcher'

const { Header, Footer, Sider, Content } = Layout

const igmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="https://www.instagram.com/peyton_creery/?hl=en">peyton_creery</Menu.Item>
    <Menu.Item key="https://www.instagram.com/_huntercreery_/?hl=en">_huntercreery_</Menu.Item>
  </Menu>
);

const githubmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="https://github.com/phcreery">phcreery</Menu.Item>
    <Menu.Item key="https://github.com/hpcreery">hpcreery</Menu.Item>
  </Menu>
);

const ytmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="https://www.youtube.com/channel/UCfmeNqWuXu1V1EgYaPNiywg">phcreery</Menu.Item>
    <Menu.Item key="https://www.youtube.com/channel/UCNjaQzmH4ZDepLGT77JI_lA">hpcreery</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  console.log('click', e.key);
  var win = window.open(e.key, '_blank');
  win.focus();
}

// Main Class
export default class Main extends Component {
  constructor(props) {
    super(props)
    document.documentElement.dataset.scroll = 0
    this.contentRef = React.createRef()
  }

  state = {}

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

  render() {
    // console.log('rendering')
    return (
      <Router>
        <Layout className='Site-Layout'>
          <SiteHeader />
          <Content className='Content' ref={this.contentRef}>
            <Route path='/' exact component={FrontPage} />
            <Route path='/search' exact component={SearchPage} />
            <Route path='/:category/:page' component={PageHandler} />
            {/* <BackTop> */}
              {/* <div className="Back-Up">UP</div> */}
            {/* </BackTop> */}
          </Content>
          
          <Footer>
            <Row justify='space-between'>
              <Col xs={10} sm={12} md={15} lg={20} xl={20}>Created by Hunter & Peyton Creery</Col>
              {/* <Col> */}
              <Col>
                {/* <Button type="text" icon={<GithubOutlined />}></Button> */}
                <Dropdown overlay={githubmenu}>
                  <Button type="text" icon={<GithubOutlined />}><DownOutlined /></Button>
                </Dropdown>
              </Col>
              <Col>
                {/* <Button type="text" icon={<YoutubeOutlined />}></Button> */}
                {/* <YoutubeOutlined /> */}
                <Dropdown overlay={ytmenu}>
                  <Button type="text" icon={<YoutubeOutlined />}><DownOutlined /></Button>
                </Dropdown>
              </Col>
              <Col>
                {/* <Button type="text" icon={<InstagramOutlined />}></Button> */}
                {/* <InstagramOutlined /> */}
                <Dropdown overlay={igmenu} >
                  <Button type="text" icon={<InstagramOutlined />}><DownOutlined /></Button>
                </Dropdown>
              </Col>
              {/* Social */}
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
