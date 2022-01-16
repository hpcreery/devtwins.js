// ReactJS
import React, { Component } from 'react'

// Components

// UI Elements
import { Spin, Progress } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// Main Class
export default class PageLoader extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  updateInfo = async () => {}

  render() {
    return (
      <Spin
        spinning={this.props.loading}
        indicator={
          this.props.progress > 0 || this.props.progress > 99 ? (
            <Progress
              percent={Math.round(this.props.progress)}
              status="active"
              showInfo={false}
              style={{
                position: 'relative',
                left: '0%',
                textAlign: 'center',
                width: '60%',
              }}
              trailColor="white"
              size="small"
            />
          ) : (
            <LoadingOutlined style={{ fontSize: 24 }} />
          )
        }
      >
        <div
          style={{
            transition: 'margin 700ms',
            marginTop: this.props.loading ? '110vh' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Spin>
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  async componentDidUpdate(prevProps) {}
}
