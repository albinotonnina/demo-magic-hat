import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Form, Input, Button} from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Frame, Hovered} from '../UI'

// import Avatar from 'antd/lib/avatar'

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
            <h1>We are going to send an email to {name}</h1>
            <h4>
              <Icon type="mail" /> {user.email}
            </h4>

            <Form onSubmit={this.handleSubmit} style={{marginTop: '32px'}}>
              <FormItem {...formItemLayout} label="Subject">
                <Input
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Email Subject here"
                />
              </FormItem>

              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{}}
                toolbar={{
                  options: ['inline', 'emoji', 'image'],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  }
                }}
                editorStyle={{
                  background: '#f4f4f4',
                  minHeight: '200px',
                  maxHeight: '300px',
                  padding: '16px'
                }}
              />

              <FormItem>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>
          </Hovered>
        )}
      />
    )
  }
}
