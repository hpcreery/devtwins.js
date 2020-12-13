// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './renderers/MarkdownRenderer'
import CollageRenderer from './renderers/GalleryRenderer'
import PDF from './renderers/PDF'
import IPYNB from './renderers/ipynb'

// UI Elements
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      page: null,
      pageType: null,
      pageSubtype: null,
      pageFiles: null,
      isLoading: true,
    }
    this.baseState = this.state
  }

  updateInfo = async () => {
    console.log('THESE ARE THE KEYS ', this.props.match.params)
    let newState = { ...this.state }
    newState.category = this.props.match.params.category
    newState.page = this.props.match.params.page
    newState.isLoading = true
    var res = await api.getPageInfo(newState.category, newState.page)
    if (res.status === 200) {
      newState.pageType = res.data.type
      newState.pageSubtype = res.data.subtype
      newState.pageFiles = res.data.files
    } else {
      console.log('Server Error')
    }
    this.setState({ ...newState })
  }

  PageTitle = () => {
    return (
      <div className={'Page-Heading'}>
        <Row justify='center'>
          <Col span={18}>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center', paddingTop: '20px' }}>
              {this.props.match.params.category} / {this.props.match.params.page}
            </h1>
          </Col>
        </Row>
      </div>
    )
  }

  doneLoading = () => {
    console.log('Done Loading Child Component')
    this.setState({ isLoading: false })
  }

  PageBody = () => {
    if (this.props.match.params.page) {
      if (this.state.pageType === 'static') {
        if (this.state.pageSubtype === 'md') {
          return (
            <MarkdownRenderer
              key={this.state.page}
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else if (this.state.pageSubtype === 'pdf') {
          return (
            <PDF
              // key={this.state.page} // Interferes with page updating????
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else if (this.state.pageSubtype === 'ipynb') {
          return (
            <IPYNB
              key={this.state.page}
              category={this.state.category}
              page={this.state.page}
              file={this.state.pageFiles}
              doneLoading={this.doneLoading}
            />
          )
        } else if (this.state.pageSubtype === null) {
          return (
            <h3>
              {' '}
              this page does not exist
            </h3>
          )
        } else {
          return (
            <h3>
              {' '}
              this page is unsupported <br /> error: {this.state.page} {this.state.pageType} {this.state.pageSubtype}
            </h3>
          )
        }
      } else if (this.state.pageType === 'collage') {
        return (
          <CollageRenderer
            key={this.state.page}
            category={this.state.category}
            page={this.state.page}
            files={this.state.pageFiles}
            doneLoading={this.doneLoading}
          />
        )
      } else {
        return (
          <h3>
            {' '}
            gathering pagetype or this page ain't no good ... (yet?) <br /> IDK what kinda page this is{' '}
          </h3>
        )
      }
    } else {
      return (
        <h3>
          {' '}
          somethin ain't right. <br /> I received no page to render from my component properties OR the state has not
          been set{' '}
        </h3>
      )
    }
  }


  render() {
    return (
      <div>
        <this.PageTitle />
        <Spin spinning={this.state.isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
          <this.PageBody />
        </Spin>
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
