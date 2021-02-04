import React, { Component } from 'react'
import { Layout, Button, Row, Col, Dropdown, Menu, Divider } from 'antd'
import {
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  GlobalOutlined
} from '@ant-design/icons'

import api from '../services/Api'

const { Footer } = Layout

function handleMenuClick(e) {
  console.log('click', e.key)
  var win = window.open(e.key, '_blank')
  win.focus()
}


export default class MainFooter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      sitesmenu: (<div/>),
      igmenu: (<div/>),
      ytmenu: (<div/>),
      twittermenu: (<div/>),
      githubmenu: (<div/>),

    }
  }

  componentDidMount() {
    this.updateInfo()
  }

  updateInfo() {
    var data = {}
    console.log('Updating footer')
    api.getPageContent("_App", "Footer", "footer.json").then((res) => {
      if (res.status === 200) {
        this.setState({ data: res.data }, () => { console.log("Footer:", this.state.data) })

        console.log("sites", res.data.web)
        var newsitesmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.web).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        var newlinkedinmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.linkedin).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        var newytmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.youtube).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        var newigmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.instagram).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        var newtwittermenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.twitter).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        var newgithubmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.github).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        this.setState({ sitesmenu: newsitesmenu, ytmenu: newytmenu, igmenu: newigmenu, twittermenu: newtwittermenu, linkedmenu: newlinkedinmenu, githubmenu: newgithubmenu })

      }
    })

  }

  render() {
    return (
      <div className='Footer-Container'>
        {/* <Divider /> */}
        <Footer className='Footer-Component'>
          {/* <Row justify='space-between' gutter={[16,36]}></Row> */}
          <Row justify='space-between' style={{alignItems: 'center'}} gutter={[0, 0]}>
            <Col flex='auto'><p style={{marginBottom: '0', }}>Designed and Developed by Hunter & Peyton Creery</p></Col>
            <Col flex='50px'>
              <Dropdown overlay={this.state.githubmenu} placement="topCenter" arrow>
                <Button type='text' icon={<GithubOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={this.state.ytmenu} placement="topCenter" arrow>
                <Button type='text' icon={<YoutubeOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={this.state.igmenu} placement="topCenter" arrow>
                <Button type='text' icon={<InstagramOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={this.state.linkedmenu} placement="topCenter" arrow>
                <Button type='text' icon={<LinkedinOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={this.state.sitesmenu} placement="topCenter" arrow>
                <Button type='text' icon={<GlobalOutlined />} />
              </Dropdown>
            </Col>
          </Row>
          {/* Created by Hunter & Peyton Creery */}
        </Footer>
      </div>
    )
  }
}

