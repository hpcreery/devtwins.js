// ReactJS
import React, { Component } from 'react'

// Components
import api from '../../services/Api'
import MarkdownRenderer from '../renderers/MarkdownRenderer'

// UI Elements
import { Row, Col, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "_app",
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
    newState.category = "_app"
    newState.page = "Home"
    newState.isLoading = true
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


  doneLoading = () => {
    console.log('Done Loading Child Component')
    this.setState({ isLoading: false })
  }

  PageTitle = () => {
    return (
      <div className={'Page-Heading'}>
        <Row justify='center'>
          <Col span={18}>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center', paddingTop: '20px' }}>
              {/* {this.props.match.params.category} / {this.props.match.params.page} */}
              {/* README.md */}
              {this.state.pageFiles}
            </h1>
          </Col>
        </Row>
      </div>
    )
  }



  render() {
    return (
      <div>
        <this.PageTitle />
        <Spin spinning={this.state.isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
          {this.state.page ? <MarkdownRenderer
            key={this.state.page}
            category={this.state.category}
            page={this.state.page}
            file={this.state.pageFiles}
            doneLoading={this.doneLoading}
          /> : null}
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
