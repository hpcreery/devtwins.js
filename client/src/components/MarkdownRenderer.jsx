// ReactJS
import React, { Component } from 'react'
import ReactMarkdown from "react-markdown"; // https://github.com/rexxars/react-markdown

// Components
import api from '../services/Api'

// UI Elements
import { Layout, Affix, Button, Row, Col, Card } from 'antd'


const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card

// Main Class
export default class MarkdownRenderer extends Component {
	constructor(props) {
    super(props)
    this.state = {
      markdown: '# NULL',
      prevProps: null
    }
    this.baseState = this.state
  }
  

  componentWillMount() {
    // console.log(this.props.match.params.id, this.props.page)
    this.setState(this.baseState)
    this.updateInfo()
  }
  componentDidUpdate(prevProps) {
    // if(this.props !== prevProps) {
    //   this.updateInfo();
    // }
  }

  updateInfo () {
    console.log('Getting page data...')
    api.getPageContent(this.props.category, this.props.page, this.props.file).then((res) => {
      console.log('Got Markdown Data: ', res)
      if (res.status === 200) {
        // console.log(res)
        // this.$store.commit('stopLoading')
        this.setState({ markdown: res.data })
      }
    })
  }

  imageUriFormatter = (Uri) => {
    // return "http://localhost:8081/pagecontent/Projects/New%20Page/" + Uri
    return api.getPageContentBaseUrl(this.props.category, this.props.page) + "/" + Uri
  }

  imageRenderer = (props) => {
    // pros: {src, title, alt}
    console.log('image source:', props.src)
    return (
      <Row justify="center"> {/* a row in a row, i know */}
        <Col span={8} justify="center">
          <Card
            hoverable
            cover={<img src={props.src} />}
          >
            <Meta title={props.alt} />
          </Card>
        </Col>
      </Row>
      )
  }

  pageTitleRenderer = () => {
    return (
      <Row justify="center"> {/* a row in a row, i know */}
        <Col justify="center">
          <h1 style={{fontSize: "xx-large"}}>
          {this.props.category}/{this.props.page}
          </h1>
        </Col>
      </Row>
    )
  }
  

	render() {
		return (
      <div className="Page-Container md-container">
        <Row justify="center">
          <Col span={18}>
            <this.pageTitleRenderer/>
            <ReactMarkdown source={this.state.markdown} transformImageUri={this.imageUriFormatter} renderers={{image: this.imageRenderer}} />
          </Col>
        </Row>
      </div>
		)
	}
}
