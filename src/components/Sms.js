import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Form, Input, Button} from 'antd'
import {Frame, Hovered} from '../UI'
const {TextArea} = Input
const FormItem = Form.Item

export default class Frame3 extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    user: PropTypes.object,
    actions: PropTypes.shape({
      setNextFrame: PropTypes.func,
      getNextFrame: PropTypes.func,
      setFrame: PropTypes.func,
      closeFrame: PropTypes.func,
      closeCurrentFrame: PropTypes.func
    })
  }

  goBack = event => {
    this.props.actions.closeCurrentFrame()
  }

  handleSubmit = e => {
    e.preventDefault()
    alert("it's a demo!")
  }

  render() {
    const {isActive, user} = this.props

    const capitalizeFirstLetter = string => {
      return string[0].toUpperCase() + string.slice(1)
    }

    const name = capitalizeFirstLetter(user.name.first)

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 14}
    }

    return (
      <Frame
        isActive={isActive}
        frameWidth={isActive ? '30vw' : '30vw'}
        frameHeight="auto"
        onClickClose={this.goBack}
        render={() => (
          <Hovered>
            <h1>So you want to text {name}...</h1>
            <h4>
              <Icon type="phone" /> {user.cell}
            </h4>
            <Form onSubmit={this.handleSubmit} style={{marginTop: '32px'}}>
              <FormItem {...formItemLayout} label="Text">
                <TextArea
                  prefix={
                    <Icon type="message" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Enter the text to send "
                />
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </FormItem>
            </Form>
          </Hovered>
        )}
      />
    )
  }
}
