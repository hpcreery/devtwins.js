// ReactJS
import React, { Component } from 'react'

// Components
import api from '../../services/Api'
import MarkdownRenderer from '../renderers/MarkdownRenderer'

// UI Elements
import { Row, Col } from 'antd'

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '_app',
      page: null,
      pageType: null,
      pageSubtype: null,
      pageFiles: null,
    }
    this.baseState = this.state
  }

  updateInfo = async () => {
    console.log('THESE ARE THE KEYS ', this.props.match.params)
    let newState = { ...this.state }
    newState.category = '_app'
    newState.page = 'Home'
    var res = await api.getPageInfo(newState.category, newState.page)
    if (res.status === 200) {
      newState.pageType = res.data.type // "static"
      newState.pageSubtype = res.data.subtype // "md"
      newState.pageFiles = res.data.files // "README.md"
    } else {
      console.log('Server Error')
    }
    this.setState({ ...newState })
  }

  PageTitle = () => {
    return (
      <div className={'Page-Heading'}>
        <Row justify="center">
          <Col span={20}>
            <h1 style={{ fontSize: '3vh', textAlign: 'center', paddingTop: '20px' }}>{this.state.pageFiles}</h1>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <div>
        <this.PageTitle />
        {this.state.page ? <MarkdownRenderer key={this.state.page} category={this.state.category} page={this.state.page} file={this.state.pageFiles} /> : null}
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
