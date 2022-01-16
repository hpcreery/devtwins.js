// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './renderers/MarkdownRenderer'
import CollageRenderer from './renderers/GalleryRenderer'
import PDF from './renderers/PDF'
import IPYNB from './renderers/ipynb'

// UI Elements
import { Row, Col, Dropdown, Menu, message } from 'antd'

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      pageName: null,
      pageType: null,
      pageSubtype: null,
      pageFiles: null,
      pageFileURL: null,
      pageLastModified: null,
    }
    this.baseState = this.state
  }

  updateInfo = async () => {
    console.log('THESE ARE THE KEYS ', this.props.match.params)
    let newState = { ...this.state }
    newState.category = this.props.match.params.category
    newState.pageName = this.props.match.params.page
    var res = await api.getPageInfo(newState.category, newState.pageName)
    if (res.status === 200) {
      newState.pageType = res.data.type
      newState.pageSubtype = res.data.subtype
      newState.pageFiles = res.data.files
      newState.pageLastModified = new Date(res.data.lastModified).toDateString()
    } else {
      console.log('Server Error')
    }
    newState.pageFileURL = (await api.getPageContentBaseUrl(newState.category, newState.pageName)) + '/' + res.data.files
    this.setState({ ...newState })
    //console.log('newstate', newState)
  }

  PageTitle = () => {
    return (
      <div className={'Page-Heading'}>
        <Row justify="center">
          <Col span={18}>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center', paddingTop: '20px' }}>
              {this.props.match.params.category} / {this.props.match.params.page}
            </h1>
          </Col>
        </Row>
      </div>
    )
  }

  PageSubTitle = () => {
    return (
      <div>
        <Row justify="center">
          <Col span={18}>
            <p style={{ fontSize: 'small', textAlign: 'center', color: 'grey', paddingTop: '0' }}>{this.state.pageLastModified}</p>
          </Col>
        </Row>
      </div>
    )
  }

  handleMenuClick = (e) => {
    console.log('click', e.key)
    if (e.key === 'download') {
      fetch(this.state.file).then((response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = this.state.pageFiles
          a.click()
        })
      })
    } else if (e.key === 'open') {
      window.open(this.state.pageFileURL)
    } else if (e.key === 'share') {
      navigator.clipboard.writeText(window.location.href)
      message.info('URL copied to clipboard')
    }
  }

  menu = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="download">Download Page</Menu.Item>
      <Menu.Item key="open">Open Raw</Menu.Item>
      <Menu.Item key="share">Share Page</Menu.Item>
    </Menu>
  )

  pageBodyElements = [
    {
      pageType: 'static',
      pageSubtype: 'md',
      component: MarkdownRenderer,
    },
    {
      pageType: 'static',
      pageSubtype: 'pdf',
      component: PDF,
    },
    {
      pageType: 'static',
      pageSubtype: 'ipynb',
      component: IPYNB,
    },
    {
      pageType: 'collage',
      pageSubtype: 'none',
      component: CollageRenderer,
    },
  ]

  render() {
    console.log(this.state)
    const PageBody =
      this.state.pageName !== null
        ? this.pageBodyElements.filter((element) => element.pageType === this.state.pageType).find((element) => element.pageSubtype === this.state.pageSubtype)
            .component
        : 'Working...'
    return (
      <div>
        <this.PageTitle />
        <this.PageSubTitle />
        <Dropdown overlay={this.menu} trigger={['contextMenu']}>
          <div>
            <PageBody key={this.state.pageName} category={this.state.category} page={this.state.pageName} file={this.state.pageFiles} />
          </div>
        </Dropdown>
      </div>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.updateInfo()
    }
  }
}
