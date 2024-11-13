import React, { Component } from 'react';
import GraphicsMenu from './GraphicsMenu';

const GRAPH_WIDTH = 70;

/**
 * GetFPS component calculates and tracks the frames per second (FPS) of an animation.
 * It updates the FPS value every second and passes the current FPS to the GraphicsMenu component.
 *
 * @extends Component
 *
 * @prop {function} handleGraphicsChange - Function to handle changes in graphics settings.
 * @prop {object} graphics - Graphics settings object.
 *
 * @state {number} frames - Number of frames rendered since the last FPS calculation.
 * @state {number} startTime - The time when the component was initialized.
 * @state {number} prevTime - The time when the last FPS calculation was made.
 * @state {Array<number>} fps - Array of FPS values calculated over time.
 *
 * @method shouldComponentUpdate - Determines if the component should re-render based on changes in props or state.
 * @method componentDidMount - Starts the animation frame request loop to calculate FPS.
 * @method componentWillUnmount - Cancels the animation frame request loop when the component is unmounted.
 * @method calcFPS - Calculates the FPS and updates the state with the new FPS value.
 * @method render - Renders the GraphicsMenu component with the current FPS value.
 */
class GetFPS extends Component {
  // Calculate frames per second of the entire animation
  constructor(props) {
    super(props);
    const currentTime = +new Date();
    this.state = {
      frames: 0,
      startTime: currentTime,
      prevTime: currentTime,
      fps: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.fps !== nextState.fps || this.props !== nextProps;
  }

  componentDidMount() {
    const onRequestAnimationFrame = () => {
      this.calcFPS();
      this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
    };
    this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.afRequest);
  }

  calcFPS() {
    const currentTime = +new Date();
    this.setState((state) => ({
      frames: state.frames + 1,
    }));
    if (currentTime > this.state.prevTime + 1000) {
      let fps = Math.round(
        (this.state.frames * 1000) / (currentTime - this.state.prevTime)
      );
      fps = this.state.fps.concat(fps);
      let sliceStart = Math.min(fps.length - GRAPH_WIDTH, 0);
      fps = fps.slice(sliceStart, fps.length);
      this.setState({
        fps: fps,
        frames: 0,
        prevTime: currentTime,
      });
    }
  }

  render() {
    const currentFPS = this.state.fps.pop();
    return (
      // Render graphics menu options, blink if fps below threshold
      <GraphicsMenu
        handleGraphicsChange={this.props.handleGraphicsChange}
        graphics={this.props.graphics}
        currentFPS={currentFPS}
      />
    );
  }
}

export default GetFPS;
