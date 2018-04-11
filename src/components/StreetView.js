import React from 'react'
import PropTypes from 'prop-types'
import {Frame, Hovered} from '../UI'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama
} from 'react-google-maps'

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{lat: props.lat, lng: props.lng}}>
      <StreetViewPanorama
        defaultPosition={{lat: props.lat, lng: props.lng}}
        visible
      />
    </GoogleMap>
  ))
)

export default class Frame3 extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    coords: PropTypes.object,
    user: PropTypes.object,
    isAnimating: PropTypes.bool,
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

  render() {
    const {isActive, user, isAnimating} = this.props

    return (
      <Frame
        isActive={isActive}
        frameWidth={'50vw'}
        frameHeight="60vh"
        onClickClose={this.goBack}
        render={() => (
          <Hovered>
            {!isAnimating && (
              <MyMapComponent
                lat={user.geo.lat}
                lng={user.geo.lng}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDu48bMsj_-PY399GdTqJmbQtsYrbysBC0"
                loadingElement={<div style={{height: `100%`}} />}
                containerElement={<div style={{height: `100%`}} />}
                mapElement={<div style={{height: `100%`}} />}
              />
            )}
          </Hovered>
        )}
      />
    )
  }
}
