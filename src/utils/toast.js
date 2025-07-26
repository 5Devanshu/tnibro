import React, { Component } from 'react'
import { Animated, Dimensions, Platform, StyleSheet, Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const windowHeight = Dimensions.get('window').height

import PropTypes from 'prop-types'

let GREEN = '#4CAF50'
let RED = '#FF0000'
let GREY = '#EDEDED'
let BLUE = '#3096B4'
let PEARL = '#fabe3b'

let bottom = (refss, text, duration = 3000, color = GREY) => {
  if (refss && refss.bottom && refss.bottom.ShowToastFunction) {
    refss.bottom.ShowToastFunction(text, duration, color)
  } else if (refss && refss.current && refss.current.ShowToastFunction) {
    refss.current.ShowToastFunction(text, duration, color)
  }
}

const color = {
  GREEN: GREEN,
  RED: RED,
  GREY: GREY,
  BLUE: BLUE,
  PEARL: PEARL,
}

export const toast = {
  bottom: bottom,
  color: color,
}

export default class CustomToast extends Component {
  constructor() {
    super()
    this.animateOpacityValue = new Animated.Value(0)
    this.state = {
      ShowToast: false,
      color: '#4CAF50',
    }
    this.ToastMessage = ''
  }

  componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID)
  }

  ShowToastFunction(message = '', duration = 3000, color) {
    this.setState({ color: color })
    this.ToastMessage = message

    this.setState({ ShowToast: true }, () => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(this.HideToastFunction(4000))
    })
  }

  HideToastFunction = duration => {
    this.timerID = setTimeout(() => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ ShowToast: false })
        clearTimeout(this.timerID)
      })
    }, duration)
  }

  render() {
    if (this.state.ShowToast) {
      return (
        <Animated.View
          style={[
            styles.animatedToastView,
            {
              opacity: this.animateOpacityValue,
              top: this.props.position == 'top' ? windowHeight * 0.15 : '70%',
              backgroundColor: this.state.color,
            },
            this.props.b ? { top: this.props.bottomVal } : {},
          ]}>
          {this.state.color === '#4CAF50' && (
            <AntDesign style={styles.icon} name="checkcircle" size={14} color="#ffffff" />
          )}
          <Text style={[styles.ToastBoxInsideText, { color: this.props.textColor }]}>{this.ToastMessage}</Text>
        </Animated.View>
      )
    } else {
      return null
    }
  }
}

CustomToast.propTypes = {
  backgroundColor: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  textColor: PropTypes.string,
}

CustomToast.defaultProps = {
  backgroundColor: '#666666',
  textColor: '#fff',
  fontFamily: 'muli',
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    paddingTop: 3,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 20 : 0,
    margin: 10,
  },

  animatedToastView: {
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 9999,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  ToastBoxInsideText: {
    fontSize: 14,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingLeft: 5,
  },
})
