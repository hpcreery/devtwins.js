import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, Redirect, withRouter } from 'react-router-dom'
// import { MailOutlined, AppstoreOutlined, SettingOutlined, PictureOutlined } from '@ant-design/icons'
import { Layout, Affix, Button, Row, Col, BackTop, Dropdown, Menu, Divider } from 'antd'
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

import api from '../services/Api'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout

const igmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='https://www.instagram.com/peyton_creery/?hl=en'>peyton_creery</Menu.Item>
    <Menu.Item key='https://www.instagram.com/_huntercreery_/?hl=en'>_huntercreery_</Menu.Item>
  </Menu>
)

const githubmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='https://github.com/phcreery'>phcreery</Menu.Item>
    <Menu.Item key='https://github.com/hpcreery'>hpcreery</Menu.Item>
  </Menu>
)

const ytmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='https://www.youtube.com/channel/UCfmeNqWuXu1V1EgYaPNiywg'>phcreery</Menu.Item>
    <Menu.Item key='https://www.youtube.com/channel/UCNjaQzmH4ZDepLGT77JI_lA'>hpcreery</Menu.Item>
  </Menu>
)

function handleMenuClick(e) {
  console.log('click', e.key)
  var win = window.open(e.key, '_blank')
  win.focus()
}

class MainFooter extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    // this.getTestData();
    // this.populateMenuItems()
  }

  render() {
    return (
      <div className='Footer-Container'>
        <Divider />
        <Footer className='Footer-Component'>
          {/* <Row justify='space-between' gutter={[16,36]}></Row> */}
          <Row justify='space-between' gutter={[0, 0]}>
            <Col flex='auto'>Created by Hunter & Peyton Creery</Col>
            <Col flex='50px'>
              <Dropdown overlay={githubmenu} placement="topCenter" arrow>
                <Button type='text' icon={<GithubOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={ytmenu} placement="topCenter" arrow>
                <Button type='text' icon={<YoutubeOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50xpx'>
              <Dropdown overlay={igmenu} placement="topCenter" arrow>
                <Button type='text' icon={<InstagramOutlined />} />
              </Dropdown>
            </Col>
          </Row>
          {/* Created by Hunter & Peyton Creery */}
        </Footer>
      </div>
    )
  }
}

export default MainFooter
