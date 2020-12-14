import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { BrowserRouter as Router, Route, Link, Switch, useHistory, Redirect, withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

import api from '../services/Api'

const { SubMenu } = Menu
const { Header } = Layout

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      menuItems: null,
      menudata: {},
      redirect: null,
      isShadowVisible: false
    }
  }

  getTestData = () => {
    api.getTestData().then((res) => {
      console.log('aye!', res.data)
      if (res.status === 200) {
        console.log(res)
        // this.$store.commit('stopLoading')
      }
    })
  }

  populateMenuItems = () => {
    api.getSiteMap().then((res) => {
      if (res.status === 200) {
        console.log('Fetched map:', res.data)
        this.setState({ menudata: res.data })
        // this.$store.commit('stopLoading')
      }
    })
  }

  goTo = ({ key }) => {
    console.log('Clicked:', key)
    const dest = key.replace(/ /g, '%20')
    // history.push(props.id)
    // this.props.history.push(dest)
    setTimeout(() => {
      // to prevent menubar animation from freezing
      this.props.history.push(dest)
    }, 300)
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
      <div>
        <Header className={`Site-Header ${this.state.isShadowVisible ? "active" : ""}`} style={{ position: 'fixed', width: '100%', padding: '0 0' }}>
          {/* <div className="logo" /> */}
          <Menu
            theme='dark'
            mode='horizontal'
            className='Site-Header-Menu'
            defaultSelectedKeys={['/']}
            getPopupContainer={(node) => node.parentNode}
            // style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)" }}
          >
            <Menu.Item key='/' className='Header-Menu-Item' onClick={(...props) => this.goTo(...props)}>
              Home
            </Menu.Item>

            {!this.state.menudata.categories
              ? null
              : this.state.menudata.categories.map((category, index) => {
                  return (
                    <SubMenu key={category.name} title={category.name} className='Header-Menu-Item'>
                      {category.pages.map((value, index) => {
                        return (
                          <Menu.Item
                            key={'/' + category.name + '/' + value.name}
                            onClick={(...props) => this.goTo(...props)}
                          >
                            {value.name}
                          </Menu.Item>
                        )
                      })}
                    </SubMenu>
                  )
                })}

            <Menu.Item key='/search' className='Header-Menu-Item' onClick={(...props) => this.goTo(...props)}>
              <SearchOutlined className='Header-SearchIcon' />
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    )
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.populateMenuItems()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll = (event) => {
    let scrollTop = event.target.scrollingElement.scrollTop

    if ((scrollTop > 0) && (this.state.isShadowVisible == false)) {
      this.setState({ isShadowVisible: true })
      console.log('scrolled down')
    } else if ((scrollTop == 0) && (this.state.isShadowVisible == true)) {
      this.setState({ isShadowVisible: false })
      console.log('top')
    }
  }
}

export default withRouter(MainHeader)
