import React, { Component } from 'react'
import { Layout, Button, Row, Col, Dropdown, Menu, Divider } from 'antd'
import {
  GithubOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

const { Footer } = Layout

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

const linkedmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='https://www.linkedin.com/in/peyton-creery'>Peyton Creery</Menu.Item>
    <Menu.Item key='https://www.linkedin.com/in/hunter-creery-a4479815a/'>Hunter Creery</Menu.Item>
  </Menu>
)

const sitesmenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key='https://twinsphoto.creery.org/'>twinsphoto.creery.org</Menu.Item>
    <Menu.Item key='https://dev.creery.org/'>dev.creery.org</Menu.Item>
  </Menu>
)

function handleMenuClick(e) {
  console.log('click', e.key)
  var win = window.open(e.key, '_blank')
  win.focus()
}

class MainFooter extends Component {

  render() {
    return (
      <div className='Footer-Container'>
        <Divider />
        <Footer className='Footer-Component'>
          {/* <Row justify='space-between' gutter={[16,36]}></Row> */}
          <Row justify='space-between' style={{alignItems: 'center'}} gutter={[0, 0]}>
            <Col flex='auto'><p style={{marginBottom: '0', }}>Designed and Developed by Hunter & Peyton Creery</p></Col>
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
            <Col flex='50px'>
              <Dropdown overlay={igmenu} placement="topCenter" arrow>
                <Button type='text' icon={<InstagramOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={linkedmenu} placement="topCenter" arrow>
                <Button type='text' icon={<LinkedinOutlined />} />
              </Dropdown>
            </Col>
            <Col flex='50px'>
              <Dropdown overlay={sitesmenu} placement="topCenter" arrow>
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

export default MainFooter
