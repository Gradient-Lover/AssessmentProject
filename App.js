import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class StopwatchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    };
  }

  formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  handleStart = () => {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
        startTime: Date.now() - this.state.elapsedTime,
      });
      this.interval = setInterval(this.updateElapsedTime, 10);
    }
  };

  handleStop = () => {
    if (this.state.isRunning) {
      clearInterval(this.interval);
      this.setState({ isRunning: false });
    }
  };

  handleReset = () => {
    if (!this.state.isRunning) {
      this.setState({
        elapsedTime: 0,
      });
    }
  };

  updateElapsedTime = () => {
    this.setState({
      elapsedTime: Date.now() - this.state.startTime,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>H:M:S</Text>
        <Text style={styles.timerText}>
          {this.formatTime(this.state.elapsedTime)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.handleStart} style={styles.button}>
            <Text>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleStop} style={styles.button}>
            <Text>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleReset} style={styles.button}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
  },
  timerText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
  },
});

export default StopwatchApp;
