// ReactJS
import React, { Component } from 'react'

// Components
import MainHeader from './MainHeader'

// UI Elements
import { Layout, Affix, Button } from 'antd'

const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class Main extends Component {
	constructor(props) {
		super(props)
		this.lightTheme = {
			'--color-text-primary': 'black',
			'--color-text-secondary': 'white',
			'--color-background-primary': 'rgba(0, 0, 0, 0)',
			'--color-background-secondary': 'rgba(0, 0, 0, 1)',
		}
		this.darkTheme = {
			'--color-text-primary': 'white',
			'--color-text-secondary': 'black',
			'--color-background-primary': 'rgba(255, 255, 255, 0)',
			'--color-background-secondary': 'rgba(255, 255, 255, 1)',
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
		const scrollPostion = Math.floor(
			(scrollTop / totalDocScrollLength) * 100
		)
		//console.log(scrollPostion)
		document.documentElement.dataset.scroll = scrollPostion
		this.setState({
			scrollPosition: scrollPostion,
		})
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

	addScrollData = () => {
		document.addEventListener('scroll', () => {
			document.documentElement.dataset.scroll = window.scrollY
			console.log(window.scrollY)
		})
	}

	changeTheme = (nextTheme) => {
		Object.keys(nextTheme).map((key) => {
			var value = nextTheme[key]
			document.documentElement.style.setProperty(key, value)
		})
	}

	render() {
		return (
			<Layout className='SiteLayout'>
				<Affix offsetTop={0}>
					<MainHeader />
				</Affix>
				<Content className='Content'>
					<div>This is a test</div>
				</Content>
				<Footer>Footer</Footer>
			</Layout>
		)
	}
	componentDidMount() {
		this.listenToScrollEvent()
		//this.addScrollData()
	}
}
