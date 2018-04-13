import React from 'react'
import {Spin, Icon} from 'antd'
import styled, {css} from 'styled-components'

export const media = {
  handheld: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)};
    }
  `
}

const Container = styled.div`
  width: ${props => props.frameWidth || '50vw'};
  height: ${props => props.frameHeight || 'auto'};
  margin-right: 16px;
  position: relative;
  display: flex;
  transform-origin: 0 50%;
  & > * {
    flex: 1 1 auto;
    overflow: auto;
  }
  ${media.handheld`
    width: 100%;
    height: 50%;
    margin-right:0;
  `};
`

const CloseIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  right: -8px;
  top: -8px;
  color: #ff383f;
  transition: color 200ms ease-in;
  &:hover {
    color: #a9a9a9;
  }
  ${media.handheld`
  right:0;
  top: 0;
  `};
`

const CloseIconWrapper = styled.span`
  flex: 0;
  transition: opacity 400ms ease-in-out;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  pointer-events: ${({isVisible}) => (isVisible ? 'auto' : 'none')};
`

export const ActionIcon = styled(Icon)`
  transition: all 200ms ease-out;
  font-size: 1.2rem;
  color: #a9a9a9;
  cursor: pointer;
  &:hover {
    color: #61dafb;
    transform: scale(1.2);
  }
`

export const Hovered = styled.div`
  background: white;
  padding: 1em 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  border-radius: 0.28571429rem;
  border: 1px solid rgba(0, 0, 0, 0.09);
`

export const ItemsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({vertical}) => (vertical ? 'column' : 'row')};
  ${media.handheld`
    flex-direction: column-reverse;
  `};
`

export const Frame = ({
  isActive,
  onClickClose,
  frameWidth,
  frameHeight,
  render,
  children
}) => (
  <Container
    isActive={isActive}
    frameWidth={frameWidth}
    frameHeight={frameHeight}
  >
    {render ? render() : children}
    {
      <CloseIconWrapper isVisible={isActive}>
        <CloseIcon type="close-square" onClick={onClickClose} />
      </CloseIconWrapper>
    }
  </Container>
)

const Header = styled.header`
  width: 16rem;
  height: 16rem;
  display: flex;
  align-items: center;
  transition: all 400ms ease-in;
  will-change: transform, opacity, filter;
`

const StartButton = styled.a`
  background-image: -webkit-linear-gradient(top, #f4f1ee, #fff);
  background-image: linear-gradient(top, #f4f1ee, #fff);
  border-radius: 50%;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.3), inset 0px 4px 1px 1px white,
    inset 0px -3px 1px 1px rgba(204, 198, 197, 0.5);
  display: block;
  height: 240px;
  position: relative;
  width: 240px;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-image: -webkit-linear-gradient(top, #fff, #f4f1ee);
    background-image: linear-gradient(top, #fff, #f4f1ee);
    color: #0088cc;
  }

  ${props =>
    props.isOpen
      ? `
    background-image: -webkit-linear-gradient(top, #efedec, #f7f4f4);
    background-image: linear-gradient(top, #efedec, #f7f4f4);
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4),
    inset 0px -3px 1px 1px rgba(204, 198, 197, 0.5);
    opacity: 0;
  `
      : ''};
`

export const AppHeader = props => (
  <Header>
    <StartButton href="#" onClick={this.handleChange} {...props}>
      <div className="App-header">
        <svg viewBox="0 0 841.9 595.3" className="App-logo">
          <g>
            <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
            <circle cx="420.9" cy="296.5" r="45.7" />
            <path d="M520.5 78.1z" />
          </g>
        </svg>
      </div>
    </StartButton>
  </Header>
)

const SpinnerWrapper = styled.div`
  transition: opacity 300ms ease-in-out;
  opacity: ${({isVisible}) => (isVisible ? 1 : 0)};
  pointer-events: ${({isVisible}) => (isVisible ? 'auto' : 'none')};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = props => (
  <SpinnerWrapper {...props}>
    <Spin size="large" />
  </SpinnerWrapper>
)
