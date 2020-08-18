// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './MarkdownRenderer'

// UI Elements
import { Layout, Affix, Button, Row, Col } from 'antd'


const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class PageHandler extends Component {
	constructor(props) {
    super(props)
    this.state = {
      category: null,
      page: null,
      prevProps: null,
      pageType: null,
      pageSubtype: null,
      // pageBanner: null,
      // pageIcon: null,
      pageFile: null
    }
    this.baseState = this.state
	}

  componentDidMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      console.log('New')
      this.updateInfo();
    }
  }

  updateInfo = () => {
    this.setState(this.baseState)
    console.log("Updating Info..")
    this.setState({ category: this.props.match.params.category, page: this.props.match.params.page })
    console.log('Updated to:', this.props.match.params.category, this.props.match.params.page)
    api.getPageInfo(this.props.match.params.category, this.props.match.params.page).then((res) => {
      console.log('Page Info: ', res)
      if (res.status === 200) {
        this.setState({ pageType: res.data.type, pageSubtype: res.data.subtype, pageFile: res.data.file})
        // console.log(res)
        // this.$store.commit('stopLoading')
      }
    })


  }

  Selector = ( prop ) => {
    if (this.state.page) {
      if (this.state.pageSubtype == "md") {
        return <MarkdownRenderer category={this.state.category} page={this.state.page} file={this.state.pageFile} />
      } else {
        return <h3> this page aint no good ... (yet?) </h3>
      }
    } else {
      return <h3>loading or somethin aint right </h3>
    }

  }

  pageTitleRenderer = () => {
    return (
      <div className={"Page-Heading"}>
      <Row justify="center"> {/* a row in a row, i know */}
        <Col span={18}>
          <h1 style={{fontSize: "xx-large", textAlign: "center"}}>
            {this.state.category} / {this.state.page}
          </h1>
        </Col>
      </Row>
      </div>
    )
  }

  

  

	render() {
		return (
      <div>
        {/* <h2>NewPageHandler</h2> */}
        {/* <h1>{this.state.category} {this.state.page} {this.state.pageFile}</h1>  */}
        <this.pageTitleRenderer/>
        {/* <MarkdownRenderer category={this.state.category} page={this.state.page} file={this.state.pageFile} /> */}
        {/* {this.Selector} */}
        <this.Selector/>
      </div>
		)
	}
}
