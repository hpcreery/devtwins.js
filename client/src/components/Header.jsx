import React, { Component } from 'react'
import { Layout, Affix, Button, Menu } from 'antd'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, Redirect, withRouter } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined, PictureOutlined } from '@ant-design/icons'

import api from '../services/Api'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout

class MainHeader extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    date: new Date(),
    menuItems: null,
    photopages: [],
    projectpages: [],
    redirect: null,
  }

  async componentDidMount() {
    // this.getTestData();
    this.populateMenuItems()
  }
  getTestData() {
    api.getTestData().then((res) => {
      console.log('aye!', res.data)
      if (res.status === 200) {
        console.log(res)
      }
    })
  }
  populateMenuItems = () => {
    api.getPageListOfCategory('Photos').then((res) => {
      // console.log('aye!', res.data)
      if (res.status === 200) {
        console.log(res)
        this.setState({ photopages: res.data })
        // this.$store.commit('stopLoading')
      }
    })
    api.getPageListOfCategory('Projects').then((res) => {
      // console.log('aye!', res.data)
      if (res.status === 200) {
        console.log(res)
        this.setState({ projectpages: res.data })
        // this.$store.commit('stopLoading')
      }
    })
  }

  goTo = (props) => {
    console.log('Clicked:', props.key)
    const dest = props.key.replace(/ /g, '%20')
    // history.push(props.id)
    this.props.history.push(dest)
    // this.setState({ redirect: dest });  // Use with redirect router method && remove withRouter from export
    // let history = useHistory();
    // history.push(dest)
  }

  render() {
    // if (this.state.redirect) {  // Use with redirect router method && remove withRouter from export
    //   var dest = this.state.redirect
    //   this.setState({ redirect: null });
    //   return <Redirect to={dest} />
    // }
    return (
      <div className='Header-Container'>
        <Header className='Site-Header' style={{ position: 'fixed', width: '100%' }}>
          {/* <div className="logo" /> */}
          <Menu
            theme='dark'
            mode='horizontal'
            className='Site-Header-Menu'
            defaultSelectedKeys={['/']}
            getPopupContainer={(node) => node.parentNode}
          >
            {/*getPopupContainer submenu scroll bug https://github.com/ant-design/ant-design/issues/10145*/}
            <Menu.Item key='/' className='Header-Menu-Item' onClick={this.goTo}>
              Home
            </Menu.Item>
            <SubMenu icon={<SettingOutlined />} title='Projects' className='Header-Menu-Item'>
              {this.state.projectpages.map((value, index) => {
                return (
                  <Menu.Item key={'/Projects/' + value} onClick={this.goTo}>
                    {value}
                  </Menu.Item>
                )
              })}
            </SubMenu>
            <SubMenu icon={<PictureOutlined />} title='Photos' className='Header-Menu-Item'>
              {/* <Menu.Item key='photo:1'>Option 1</Menu.Item> */}
              {this.state.photopages.map((value, index) => {
                return (
                  <Menu.Item key={'/Photos/' + value} onClick={this.goTo}>
                    {value}
                  </Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Header>
      </div>
    )
  }
}

export default withRouter(MainHeader)
