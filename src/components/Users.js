import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {List, Avatar} from 'antd'
import reqwest from 'reqwest'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import {Frame, Hovered, ActionIcon, Spinner} from '../UI'

const fakeDataUrl = 'https://magic-hat-demo-api.herokuapp.com/users'

const ListItem = styled(List.Item)`
  transition: all 100ms ease-out;
  &:hover {
    background: #efefef;
  }
`

export default class Frame1 extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    scrollToIndex: PropTypes.number,
    data: PropTypes.array,
    actions: PropTypes.shape({
      setNextFrame: PropTypes.func,
      getNextFrame: PropTypes.func,
      replaceFrame: PropTypes.func,
      closeFrame: PropTypes.func,
      closeCurrentFrame: PropTypes.func,
      getCurrentFrame: PropTypes.func,
      setCurrentFrame: PropTypes.func
    })
  }

  goBack = event => {
    this.props.actions.closeCurrentFrame()
  }

  loadUser = (index, user) => {
    const {
      actions: {setCurrentFrame, getCurrentFrame, setNextFrame}
    } = this.props

    setCurrentFrame({
      ...getCurrentFrame().state,
      scrollToIndex: index
    })

    setNextFrame('User', {
      user
    })
  }

  loadFilters = (index, user) => {
    this.props.actions.setNextFrame('UsersFilters', {
      user
    })
  }

  sendMessage = (index, user) => {
    const {
      actions: {setCurrentFrame, getCurrentFrame, setNextFrame}
    } = this.props

    setCurrentFrame({
      ...getCurrentFrame().state,
      scrollToIndex: index
    })

    setNextFrame('Email', {
      user
    })
  }

  openMap = (index, user) => {
    const {
      actions: {setCurrentFrame, getCurrentFrame, setNextFrame}
    } = this.props

    setCurrentFrame({
      ...getCurrentFrame().state,
      scrollToIndex: index
    })

    setNextFrame('Map', {
      user
    })
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res)
      }
    })
  }

  componentDidMount() {
    if (!this.props.data) {
      this.getData(data => {
        this.props.actions.setCurrentFrame({
          ...this.props.actions.getCurrentFrame().state,
          data
        })
      })
    }
  }

  renderItem = ({index, key, style}, nextFrame) => {
    const {scrollToIndex} = this.props
    const {data = []} = this.props
    const item = data[index]

    const isActive = scrollToIndex === index

    if (isActive) {
      style = {...style, ...{background: '#efefef'}}
    }

    // console.log('nextFrame', nextFrame)
    const capitalizeFirstLetter = string => {
      return string[0].toUpperCase() + string.slice(1)
    }

    const name = `${capitalizeFirstLetter(
      item.name.first
    )} ${capitalizeFirstLetter(item.name.last)}`

    return (
      <ListItem
        key={key}
        style={{...style, ...{cursor: 'pointer'}}}
        actions={[
          <ActionIcon
            key="action1"
            type="environment"
            style={isActive && nextFrame.id === 'Map' ? {color: 'red'} : {}}
            onClick={event => this.openMap(index, item)}
          />,
          <ActionIcon
            key="action2"
            type="mail"
            style={isActive && nextFrame.id === 'Email' ? {color: 'red'} : {}}
            onClick={event => this.sendMessage(index, item)}
          />
        ]}
      >
        <List.Item.Meta
          onClick={event => {
            this.loadUser(index, item)
          }}
          avatar={<Avatar src={item.picture.thumbnail} />}
          title={name}
          description={item.email}
        />
      </ListItem>
    )
  }

  render() {
    const {data = []} = this.props

    const {isActive, scrollToIndex} = this.props
    const nextFrame = this.props.actions.getNextFrame()

    return (
      <Frame
        onClickClose={this.goBack}
        isActive={isActive}
        frameWidth="40vw"
        frameHeight="50vh"
      >
        <Hovered>
          <List
            style={{height: 'calc(50vh - 8rem)'}}
            header={
              <h1>
                <ActionIcon
                  type="filter"
                  style={nextFrame.id === 'UsersFilters' ? {color: 'red'} : {}}
                  onClick={this.loadFilters}
                />{' '}
                Users
              </h1>
            }
          >
            <AutoSizer>
              {({height, width}) => (
                <VList
                  ref={ref => (this._virtualScroll = ref)}
                  height={height}
                  rowCount={data.length}
                  rowHeight={73}
                  scrollToAlignment="auto"
                  rowRenderer={item => this.renderItem(item, nextFrame)}
                  scrollToIndex={scrollToIndex}
                  width={width}
                />
              )}
            </AutoSizer>
            <Spinner size="large" isVisible={data.length === 0} />
          </List>
        </Hovered>
      </Frame>
    )
  }
}
