// ReactJS
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown' // https://github.com/rexxars/react-markdown
// https://github.com/rexxars/commonmark-react-renderer#type-renderer-options

// Components
import api from '../../services/Api'

// UI Elements
import { Layout, Row, Col, Card, Typography, Image } from 'antd'

// const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card
const { Text, Link } = Typography

// Main Class
export default class MarkdownRenderer extends Component {
  constructor(props) {
    super(props)

    //this.baseState = this.state
  }

  state = {
    // markdown: '### Loading page contents...',
    loading: true,
    markdown: '',
    fetched: false,
    // prevProps: null,
  }

  updateInfo = async () => {
    //this.loading = true
    console.log('Updating Markdown Renderer:', this.props.category, this.props.page, this.props.file)
    // console.log('Getting page data...')
    api.getPageContent(this.props.category, this.props.page, this.props.file).then((res) => {
      console.log('Got Markdown Data: ', res)
      if (res.status === 200) {
        // console.log(res)
        // this.$store.commit('stopLoading')

        this.setState({ markdown: res.data, loading: false, fetched: true }, () => {
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
    let jsx = ''
    if (props.alt.split('|')[0] == '!wide') {
      jsx = (
      <Row justify='center'>
        <Col span={24}>
          <Card hoverable cover={<img style={{padding: '10px'}} src={props.src} />} style={{ marginTop: 10 }}>
            <Meta style={{ fontStyle: 'italic' }} description={props.alt.split('|')[1]} />
          </Card>
          {/* <Image
            // width="100%"
            // height={200}
            src={props.src}
          /> */}
        </Col>
      </Row>
    )
    } else {
      jsx = (
        <Row justify='center'>
          {/* a row in a row, i know */}
          <Col span={10} justify='center'>
            <Card hoverable cover={<img style={{padding: '10px'}} src={props.src} />} style={{ marginTop: 10 }}>
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
    return jsx
  }

  codeBlockRenderer = (props) => {
    // pros: {literal: String, language: ex. JS}
    // console.log('code:', props)
    return (
      <Card hoverable bordered={true} style={{ marginTop: 10, marginBottom: 10 }}>
        {/* <p style={{ marginBottom: 0, fontFamily: 'monospace' }}>{props.value}</p> */}
        <span style={{ marginBottom: 0, fontFamily: 'monospace' }}>{props.value}</span>
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
            {/* <Card> */}
            {/* <this.pageTitleRenderer/> */}
            <Card style={{ marginTop: 10, marginBottom: 10 }} hoverable>
            <ReactMarkdown
              source={this.state.markdown}
              transformImageUri={this.imageUriFormatter}
              renderers={{
                image: this.imageRenderer,
                inlineCode: this.codeInlineRenderer,
                code: this.codeBlockRenderer,
              }}
            />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  async componentDidMount() {
    // console.log(this.props.match.params.id, this.props.page)
    // this.setState(this.baseState)
    this.updateInfo()
  }

  // async componentDidUpdate(prevProps) {
  //   console.log('debug: MDrenderer, componentDidUpdate()', prevProps, this.props)
  //   if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
  //     this.updateInfo()
  //   }
  // }

  // static getDerivedStateFromProps(props, state) {
  //   if (state.fetched === true) {
  //     return { loading: false }
  //   } else {
  //     return { loading: true }
  //   }

  //   // if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
  //   //   this.updateInfo()
  //   // }
  // }
}
