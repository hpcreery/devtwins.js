// ReactJS
import React, { Component } from 'react'

// Components

// UI Elements
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// Main Class
export default class PageLoader extends Component {
  constructor(props) {
    super(props)
    /*
    loading: bool
    progress: 0-100
    */
    this.state = {
    }
  }


  updateInfo = async () => {
  }

  render() {
    return (
      <Spin spinning={this.props.loading} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
        {this.props.children}
      </Spin>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  async componentDidUpdate(prevProps) {
  }
}
