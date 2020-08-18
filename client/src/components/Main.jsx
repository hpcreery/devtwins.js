// ReactJS
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";

// Components
import SiteHeader from './Header'
import PageHandler from './PageHandler'
import MarkdownRenderer from './MarkdownRenderer'
import FrontPage from './pages/FrontPage'

// UI Elements
import { Layout, Affix, Button } from 'antd'


const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class Main extends Component {
	constructor(props) {
		super(props)
		document.documentElement.dataset.scroll = 0
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
  
  _PageHandler = ( prop ) => {
    console.log('Match:', prop)
    const page = prop.match.params.page
    const category = prop.match.params.category
    
    return (
      <div>
        <h1>{category} {page}</h1> 
        <MarkdownRenderer category={category} page={page} />
      </div>
      )
    // return <MarkdownRenderer />
  }

  

	render() {
		console.log('rendering')
		return (
      <Router>
        <Layout className='SiteLayout'>
          <SiteHeader />
          <Content className='Content'>
            {/* <div>This is a test</div> */}
            <Route path="/" exact component={FrontPage} />
            <Route path="/:category/:page" component={PageHandler} />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Router>
		)
	}
	componentDidMount() {
		this.listenToScrollEvent()
	}
}
