// ReactJS
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown' // https://github.com/rexxars/react-markdown
// https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
import gfm from 'remark-gfm'

// Components
import api from '../../services/Api'

// UI Elements
import { Row, Col, Card, Typography } from 'antd'

// const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card
const { Text } = Typography

// Main Class
export default class MarkdownRenderer extends Component {

  state = {
    loading: true,
    markdown: '',
    fetched: false,
  }

  updateInfo = async () => {
    //this.loading = true
    console.log('Updating Markdown Renderer:', this.props.category, this.props.page, this.props.file)
    api.getPageContent(this.props.category, this.props.page, this.props.file).then((res) => {
      console.log('Got Markdown Data: ', res)
      if (res.status === 200) {
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
    if (props.alt.split('|')[0] === '!wide') {
      jsx = (
      <Row justify='center'>
        <Col span={24}>
          <Card cover={<img alt='' style={{ padding: '10px' }} src={props.src} />} style={{ marginTop: 10 }}>
            <Meta style={{ fontStyle: 'italic' }} description={props.alt.split('|')[1]} />
          </Card>
        </Col>
      </Row>
    )
    } else {
      jsx = (
        
        <Row justify='center'>
          {/* a row in a row, i know */}
          <Col xs={20} sm={20} md={16} lg={16} xl={16} justify='center'>
            <Card cover={<img alt='' style={{padding: '10px'}} src={props.src} />} style={{ marginTop: 10 }} bodyStyle={{ padding: '6px', paddingTop: '0px', textAlign: 'center' }}>
              <Meta style={{ fontStyle: 'italic' }} description={props.alt} />
            </Card>
          </Col>
        </Row>
      )
    }
    return jsx
  }

  codeBlockRenderer = (props) => {
    // props: {literal: String, language: ex. JS}
    // console.log('code:', props)

    return (
      <Card hoverable bordered={true} style={{ marginTop: 10, marginBottom: 10 }}>
        <span style={{ marginBottom: 0, fontFamily: 'monospace' }}>{props.value}</span>
      </Card>
    )
  }

  codeInlineRenderer = (props) => {
    // props: {literal: String, inline: Boolean}
    // console.log('code:', props)
    
    return (
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
          <Col xs={22} sm={22} md={20} lg={18} xl={18}>
            <Card style={{ marginTop: 10, marginBottom: 10, cursor: 'auto' }} hoverable bordered style={{borderColor: '#D9D9D9'}}>
            <ReactMarkdown
              source={this.state.markdown}
              transformImageUri={this.imageUriFormatter}
              renderers={{
                image: this.imageRenderer,
                inlineCode: this.codeInlineRenderer,
                code: this.codeBlockRenderer,
              }}
              allowDangerousHtml
              skipHtml={false}
              plugins={[gfm]}
            />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  async componentDidMount() {
    this.updateInfo()
  }

}
