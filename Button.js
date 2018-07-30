import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const baseContainer = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth: 1,
  borderColor: '#fff',
};

const baseText = {
  fontSize: 30,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    ...baseContainer,
  },
  specialContainer: {
    flex: 2,
    backgroundColor: '#9bc23c',
    ...baseContainer,
  },
  text: baseText,
  specialText: {
    ...baseText,
    color: '#fff',
  },
});

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.textRef = React.createRef();
  }

  handleOnPress = () => {
    const { onPress, text } = this.props;
    this.textRef.current.pulse(400);
    onPress(text);
  }

  render() {
    const { text, special } = this.props;

    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        style={special ? styles.specialContainer : styles.container}
      >
        <Animatable.Text
          ref={this.textRef}
          style={special ? styles.specialText : styles.text}
        >
          {text}
        </Animatable.Text>
      </TouchableOpacity>);
  }
}
