// ReactJS
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown' // https://github.com/rexxars/react-markdown
// https://github.com/rexxars/commonmark-react-renderer#type-renderer-options

// Components
import api from '../../services/Api'

// UI Elements
import { Layout, Affix, Button, Row, Col, Card, Typography, Image } from 'antd'

const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card
const { Text, Link } = Typography

// Main Class
export default class MarkdownRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // markdown: '### Loading page contents...',
      markdown: '',
      // prevProps: null,
    }
    this.baseState = this.state
  }

  updateInfo = () => {
    console.log('Updating Markdown Renderer:', this.props.category, this.props.page, this.props.file)
    // console.log('Getting page data...')
    api.getPageContent(this.props.category, this.props.page, this.props.file).then((res) => {
      console.log('Got Markdown Data: ', res)
      if (res.status === 200) {
        // console.log(res)
        // this.$store.commit('stopLoading')
        this.setState({ markdown: res.data }, () => {
          this.props.doneLoading()
        })
      }
    })
    
  }

  imageUriFormatter = (Uri) => {
    // return "http://localhost:8081/pagecontent/Projects/New%20Page/" + Uri
    return api.getPageContentBaseUrl(this.props.category, this.props.page) + '/' + Uri
  }

  imageRenderer = (props) => {
    // pros: {src, title, alt}
    // console.log('image source:', props.src)
    return (
      <Row justify='center'>
        {/* a row in a row, i know */}
        <Col span={10} justify='center'>
          <Card hoverable cover={<img src={props.src} />} style={{ marginTop: 10 }}>
            <Meta style={{ fontStyle: 'italic' }} description={props.alt} />
          </Card>
          {/* // <Image
          //   width="200px"
          //   height={200}
          //   src={props.src}
          // /> */}
        </Col>
      </Row>
    )
  }

  codeBlockRenderer = (props) => {
    // pros: {literal: String, language: ex. JS}
    // console.log('code:', props)
    return (
      <Card hoverable bordered={true} style={{ marginTop: 10, marginBottom: 10 }}>
        <p style={{ marginBottom: 0, fontFamily: 'monospace' }}>{props.value}</p>
      </Card>
    )
  }

  codeInlineRenderer = (props) => {
    // pros: {literal: String, inline: Boolean}
    // console.log('code:', props)
    return (
      // <span style={{ marginBottom: 0, fontFamily: "monospace", backgroundColor: "white" }}>{props.value}</span>
      <Text code>{props.value}</Text>
    )
  }

  pageTitleRenderer = () => {
    return (
      <Row justify='center'>
        {/* a row in a row, i know */}
        <Col justify='center'>
          <h1 style={{ fontSize: 'xx-large' }}>
            {this.props.category} / {this.props.page}
          </h1>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div className='Page-Container md-container'>
        <Row justify='center'>
          <Col span={18}>
            {/* <this.pageTitleRenderer/> */}
            <ReactMarkdown
              source={this.state.markdown}
              transformImageUri={this.imageUriFormatter}
              renderers={{
                image: this.imageRenderer,
                inlineCode: this.codeInlineRenderer,
                code: this.codeBlockRenderer,
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    // console.log(this.props.match.params.id, this.props.page)
    // this.setState(this.baseState)
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    console.log('debug: MDrenderer, componentDidUpdate()', prevProps, this.props)
    if(JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.updateInfo();
    }
  }
}
