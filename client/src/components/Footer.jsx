import React, { Component } from 'react'
import { Layout, Button, Row, Col, Dropdown, Menu, Divider } from 'antd'
import {
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  TwitterOutlined,
  FacebookOutlined,
  MediumOutlined,
  RedditOutlined
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

      sites: false,
      sitesmenu: (<div/>),
      ig: false,
      igmenu: (<div/>),
      yt: false,
      ytmenu: (<div/>),
      twitter: false,
      twittermenu: (<div/>),
      github: false,
      githubmenu: (<div />),
      linkedin: false,
      linkedinmenu: (<div />),
      facebook: false,
      facebookmenu: (<div />),
      medium: false,
      mediummenu: (<div />),
      reddit: false,
      redditmenu: (<div />),
      about: ""

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

        this.setState({ about: res.data.about })

        if (Object.keys(res.data.web).length > 0) {this.setState({ sites: true })}
        var newsitesmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.web).map((key, index) => {
              return <Menu.Item key={res.data.web[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.linkedin).length > 0) {this.setState({ linkedin: true })}
        var newlinkedinmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.linkedin).map((key, index) => {
              return <Menu.Item key={res.data.linkedin[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.youtube).length > 0) {this.setState({ yt: true })}
        var newytmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.youtube).map((key, index) => {
              return <Menu.Item key={res.data.youtube[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.instagram).length > 0) {this.setState({ ig: true })}
        var newigmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.instagram).map((key, index) => {
              return <Menu.Item key={res.data.instagram[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.twitter).length > 0) {this.setState({ twitter: true })}
        var newtwittermenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.twitter).map((key, index) => {
              return <Menu.Item key={res.data.twitter[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.github).length > 0) {this.setState({ github: true })}
        var newgithubmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.github).map((key, index) => {
              return <Menu.Item key={res.data.github[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.facebook).length > 0) {this.setState({ facebook: true })}
        var newfacebookmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.facebook).map((key, index) => {
              return <Menu.Item key={res.data.facebook[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.medium).length > 0) {this.setState({ medium: true })}
        var newmediummenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.medium).map((key, index) => {
              return <Menu.Item key={res.data.medium[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        if (Object.keys(res.data.reddit).length > 0) {this.setState({ reddit: true })}
        var newredditmenu = (
          <Menu onClick={handleMenuClick}>
            {Object.keys(res.data.reddit).map((key, index) => {
              return <Menu.Item key={res.data.reddit[key]}>{key}</Menu.Item>
            })}
          </Menu>
        )
        this.setState({ sitesmenu: newsitesmenu, ytmenu: newytmenu, igmenu: newigmenu, twittermenu: newtwittermenu, linkedinmenu: newlinkedinmenu, githubmenu: newgithubmenu, facebookmenu: newfacebookmenu, mediummenu: newmediummenu, redditmenu: newredditmenu })

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
            {/* <Col flex='auto'><p style={{marginBottom: '0', }}>Designed and Developed by Hunter & Peyton Creery</p></Col> */}
            <Col flex='auto'><p style={{marginBottom: '0', }}>{this.state.about}</p></Col>
            {this.state.github ? <Col flex='50px'>
              <Dropdown overlay={this.state.githubmenu} placement="topCenter" arrow>
                <Button type='text' icon={<GithubOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.yt ? <Col flex='50px'>
              <Dropdown overlay={this.state.ytmenu} placement="topCenter" arrow>
                <Button type='text' icon={<YoutubeOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.ig ? <Col flex='50px'>
              <Dropdown overlay={this.state.igmenu} placement="topCenter" arrow>
                <Button type='text' icon={<InstagramOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.linkedin ? <Col flex='50px'>
              <Dropdown overlay={this.state.linkedinmenu} placement="topCenter" arrow>
                <Button type='text' icon={<LinkedinOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.twitter ? <Col flex='50px'>
              <Dropdown overlay={this.state.twittermenu} placement="topCenter" arrow>
                <Button type='text' icon={<TwitterOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.facebook ? <Col flex='50px'>
              <Dropdown overlay={this.state.facebookmenu} placement="topCenter" arrow>
                <Button type='text' icon={<FacebookOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.medium ? <Col flex='50px'>
              <Dropdown overlay={this.state.mediummenu} placement="topCenter" arrow>
                <Button type='text' icon={<MediumOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.reddit ? <Col flex='50px'>
              <Dropdown overlay={this.state.redditmenu} placement="topCenter" arrow>
                <Button type='text' icon={<RedditOutlined />} />
              </Dropdown>
            </Col> : null}
            {this.state.sites ? <Col flex='50px'>
              <Dropdown overlay={this.state.sitesmenu} placement="topCenter" arrow>
                <Button type='text' icon={<GlobalOutlined />} />
              </Dropdown>
            </Col> : null}
          </Row>
          {/* Created by Hunter & Peyton Creery */}
        </Footer>
      </div>
    )
  }
}

