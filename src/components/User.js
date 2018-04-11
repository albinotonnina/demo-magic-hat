import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Avatar, Card} from 'antd'
import {Frame, Hovered} from '../UI'

export default class Frame2 extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    user: PropTypes.object,
    actions: PropTypes.shape({
      setNextFrame: PropTypes.func,
      getNextFrame: PropTypes.func,
      replaceFrame: PropTypes.func,
      closeFrame: PropTypes.func,
      closeCurrentFrame: PropTypes.func
    })
  }

  goBack = event => {
    this.props.actions.closeCurrentFrame()
  }

  sendMessage = () => {
    this.props.actions.setNextFrame('Email', {
      user: this.props.user
    })
  }

  sendSms = () => {
    this.props.actions.setNextFrame('Sms', {
      user: this.props.user
    })
  }

  openMap = () => {
    this.props.actions.setNextFrame('Map', {
      user: this.props.user
    })
  }

  render() {
    const {user, isActive} = this.props

    const capitalizeFirstLetter = string => {
      return string[0].toUpperCase() + string.slice(1)
    }

    const name = `${capitalizeFirstLetter(
      user.name.title
    )} ${capitalizeFirstLetter(user.name.first)} ${capitalizeFirstLetter(
      user.name.last
    )}`

    return (
      <Frame
        isActive={isActive}
        onClickClose={this.goBack}
        frameWidth={isActive ? '30vw' : '30vw'}
        frameHeight="auto"
        render={() => (
          <Hovered>
            <Card
              title={
                <h1 style={{margin: 0}}>
                  <Avatar size="large" src={user.picture.thumbnail} /> {name}
                </h1>
              }
              bordered={false}
              actions={[
                <Icon type="environment" key="one" onClick={this.openMap} />,
                <Icon type="mail" key="two" onClick={this.sendMessage} />,
                <Icon type="message" key="three" onClick={this.sendSms} />
              ]}
            >
              <p>
                <strong>cell:</strong> {user.cell}
              </p>
              <p onClick={this.sendMessage}>
                <strong>email:</strong> {user.email}
              </p>
              <p>
                <strong>dob:</strong> {user.dob}
              </p>
              <p>
                <strong>nat:</strong> {user.nat}
              </p>
              <p onClick={this.openMap}>
                <strong>Location:</strong> {user.location.street} -{' '}
                {user.location.postcode} {user.location.city},{' '}
                {user.location.state}
              </p>
            </Card>
          </Hovered>
        )}
      />
    )
  }
}
