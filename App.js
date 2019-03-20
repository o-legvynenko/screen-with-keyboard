/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, TextInput, Animated, Keyboard} from 'react-native';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width / 7;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }
  
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  
  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
  };
  
  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20
  },
  register: {
    marginBottom: 20, 
    width: window.width -100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffae',
  }
});
