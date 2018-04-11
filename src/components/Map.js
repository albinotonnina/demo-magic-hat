import React from 'react'
import PropTypes from 'prop-types'
import {Frame, Hovered} from '../UI'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'

const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap defaultZoom={8} defaultCenter={props.coords}>
        <Marker
          clickable={true}
          onClick={props.openStreetView}
          position={props.coords}
        >
          {props.isActive && (
            <InfoWindow>
              <div>Open Street View</div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
    )
  })
)

export default class Frame3 extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    isAnimating: PropTypes.bool,
    coords: PropTypes.object,
    user: PropTypes.object,
    actions: PropTypes.shape({
      setNextFrame: PropTypes.func,
      getNextFrame: PropTypes.func,
      setFrame: PropTypes.func,
      closeFrame: PropTypes.func,
      closeCurrentFrame: PropTypes.func
    })
  }

  state = {
    rerender: false
  }

  goBack = event => {
    this.props.actions.closeCurrentFrame()
  }

  openStreetView = () => {
    this.props.actions.setNextFrame('StreetView', {
      user: this.props.user
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({rerender: !this.state.rerender})
    }, 1000)
  }

  render() {
    const {isActive, user, isAnimating} = this.props

    return (
      <Frame
        isActive={isActive}
        frameWidth="40vw"
        frameHeight="60vh"
        onClickClose={this.goBack}
        render={() => (
          <Hovered>
            {this.state.rerender && (
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDu48bMsj_-PY399GdTqJmbQtsYrbysBC0"
                loadingElement={<div style={{height: `100%`}} />}
                containerElement={<div style={{height: '100%'}} />}
                mapElement={<div style={{height: '100%'}} />}
                openStreetView={this.openStreetView}
                isActive={isActive}
                isAnimating={isAnimating}
                coords={{
                  lat: user.geo.lat,
                  lng: user.geo.lng
                }}
              />
            )}
          </Hovered>
        )}
      />
    )
  }
}
