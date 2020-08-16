// React
import React, { Component } from 'react'

// UI Elements
import {} from 'antd'

// UX Elements

export class FrontPage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div>{this.props.scrollPosition}</div>
	}
}

export default FrontPage
