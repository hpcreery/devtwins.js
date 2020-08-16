// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'

// UI Elements
import { Layout, Affix, Button } from 'antd'


const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class MarkdownRenderer extends Component {
	constructor(props) {
    super(props)
    this.state = {
      prevProps: null,
      pageType: null,
      pageSubtype: null,
      pageBanner: null,
      pageIcon: null,

    }
	}

  componentWillMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    // if(this.props !== prevProps) {
    //   prevProps = this.props
    //   this.updateInfo();
    // }
  }

  updateInfo () {
    // this.page = this.props.match.params.page
    // this.category = this.props.match.params.category
    // console.log(this.page, this.category)

  }

  

  

	render() {
		return (
      <div>
        <h2>NewPageHandler</h2>
        <h1>{this.props.match.params.category} {this.props.match.params.page}</h1> 
        {/* <MarkdownRenderer category={category} page={page} /> */}
      </div>
		)
	}
}
