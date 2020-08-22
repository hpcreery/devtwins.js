// ReactJS
import React, { Component } from 'react'

// Components
import api from '../services/Api'
import MarkdownRenderer from './Renderers/MarkdownRenderer'
import CollageRenderer from './Renderers/GalleryRenderer'
import PDF from './Renderers/PDF'
import IPYNB from './Renderers/ipynb'

// UI Elements
import { Layout, Affix, Button, Row, Col } from 'antd'

const { Header, Footer, Sider, Content } = Layout

// Main Class
export default class PageHandler extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    category: null,
    page: null,
    pageType: null,
    pageSubtype: null,
    // pageBanner: null,
    // pageIcon: null,
    pageFiles: null,
  }

  updateInfo = async () => {
    let newState = { ...this.state }
    console.log('Updating Info..')
    // this.setState({ category: this.props.match.params.category, page: this.props.match.params.page })
    newState.category = this.props.match.params.category
    newState.page = this.props.match.params.page
    var res = await api.getPageInfo(newState.category, newState.page)
    console.log('New Page Info: ', res)
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
          {' '}
          {/* a row in a row, i know */}
          <Col span={18}>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>
              {this.state.category} / {this.state.page}
            </h1>
          </Col>
        </Row>
      </div>
    )
  }

  PageBody = () => {
    if (this.state.page) {
      if (this.state.pageType == 'static') {
        if (this.state.pageSubtype == 'md') {
          return <MarkdownRenderer category={this.state.category} page={this.state.page} file={this.state.pageFiles} />
        } else if (this.state.pageSubtype == "pdf") {
          return <PDF category={this.state.category} page={this.state.page} file={this.state.pageFiles}/>
        } else if (this.state.pageSubtype == "ipynb") {
          return <IPYNB category={this.state.category} page={this.state.page} file={this.state.pageFiles}/>
        } else {
          return <h3> this page is unsupported </h3>
        }
      } else if (this.state.pageType == 'collage') {
        return <CollageRenderer category={this.state.category} page={this.state.page} files={this.state.pageFiles} />
      } else {
        return <h3> gathering pagetype or this page aint no good ... (yet?) </h3>
        // return <this.Loader/>
      }
    } else {
      return <h3> somethin aint right </h3>
    }
  }

  Loader = () => {
    return (
      // <h3>Loading page details...</h3>
      <Row justify='center'>
        {' '}
        {/* a row in a row, i know */}
        <Col span={18}>
          <h3 style={{ fontSize: 'small', textAlign: 'center' }}>{/* Loading page details... */}</h3>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div>
        <this.PageTitle />
        <this.PageBody />
      </div>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateInfo()
    }
  }
}
