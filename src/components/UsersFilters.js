import React from 'react'
import PropTypes from 'prop-types'
import {Form, Slider, Mention, Switch} from 'antd'
import {Frame, Hovered} from '../UI'

const {toContentState} = Mention

const FormItem = Form.Item

export default class UserFilters extends React.Component {
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
    const {isActive} = this.props

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12}
    }

    return (
      <Frame
        isActive={isActive}
        frameWidth={isActive ? '30vw' : '30vw'}
        frameHeight="auto"
        onClickClose={this.goBack}
        render={() => (
          <Hovered>
            <h1>Filters</h1>
            <h4>
              {' '}
              demo, not working{' '}
              <span role="img" aria-label="">
                😎
              </span>
            </h4>
            <Form style={{marginTop: '32px'}}>
              <FormItem {...formItemLayout} label="Search User:">
                <Mention
                  style={{width: '100%'}}
                  defaultValue={toContentState('@user1')}
                  suggestions={[
                    'user1',
                    'user2',
                    'user3',
                    'user4',
                    'user5',
                    'user6'
                  ]}
                />
              </FormItem>
              <FormItem {...formItemLayout} label="How many">
                <Slider defaultValue={30} />
              </FormItem>
              <FormItem {...formItemLayout} label="Cool switches">
                <Switch defaultChecked /> <Switch /> <Switch defaultChecked />
              </FormItem>
            </Form>
          </Hovered>
        )}
      />
    )
  }
}
