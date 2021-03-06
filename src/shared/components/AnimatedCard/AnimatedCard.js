import React from 'react';
import PropTypes from 'prop-types';
import InteractionHandler from './InteractionHandler';
import AnimatedComponent from './AnimatedComponent';
import { RotateAnimation, TransitionAnimation } from './Animation';
import TextInput from '../TextInput';
import Card from './Card';

class AnimatedCard extends React.Component {
  static propTypes = {
    faceFrontside: PropTypes.bool,
    onRequestRotation: PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    onSidesChange: PropTypes.func,
    frontside: PropTypes.string.isRequired,
    backside: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      faceFrontside: props.faceFrontside !== undefined ? props.faceFrontside : true,
    };
  }

  componentDidUpdate() {
    const { faceFrontside: externalFaceFrontside } = this.props;
    const { faceFrontside } = this.state;

    if (externalFaceFrontside !== undefined && externalFaceFrontside !== faceFrontside) {
      this.rotate();
    }
  }

  animationRef = React.createRef()

  handleEditStop = () => {
    this.requestRotation();
  }

  handleTap = () => {
    this.requestRotation();
  }

  requestRotation() {
    const { onRequestRotation } = this.props;

    if (onRequestRotation) {
      onRequestRotation();
    } else {
      this.rotate();
    }
  }

  rotate() {
    this.animationRef.current.runAnimation(new RotateAnimation(
      () => {
        this.setState(({ faceFrontside }) => ({ faceFrontside: !faceFrontside }));
      },
    ));
  }

  handleMove = ({ offset, swipe }) => {
    this.animationRef.current.runAnimation(new TransitionAnimation({
      offsetX: offset.x,
      scale: swipe ? 0.7 : 1,
    }, 50));
  }

  handleMoveEnd = () => {
    this.setState({ offset: undefined, scale: undefined });
  }

  handleSwipe = (direction) => {
    this.animationRef.current.runAnimation(new TransitionAnimation({
      offsetX: direction === 'left' ? -1000 : 1000,
    }, 150)).then(() => {
      const { onSwipeLeft, onSwipeRight } = this.props;

      if (direction === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (direction === 'right' && onSwipeRight) {
        onSwipeRight();
      }
    });
  }

  handleSideChange = (value) => {
    const { onSidesChange, frontside, backside } = this.props;
    const { faceFrontside } = this.state;

    if (onSidesChange) {
      onSidesChange({
        frontside: faceFrontside ? value : frontside,
        backside: faceFrontside ? backside : value,
      });
    }
  }

  render() {
    const { frontside, backside, editable } = this.props;
    const { faceFrontside, scale, offset } = this.state;

    return (
      <InteractionHandler
        onMove={this.handleMove}
        onMoveEnd={this.handleMoveEnd}
        onTap={this.handleTap}
        onSwipe={this.handleSwipe}
      >
        <AnimatedComponent ref={this.animationRef} scale={scale} offset={offset}>
          <Card
            value={faceFrontside ? frontside : backside}
            faceBackside={!faceFrontside}
            content={editable && (value => (
              <TextInput
                value={value}
                alt={!faceFrontside}
                onChangeText={this.handleSideChange}
                onEditStop={this.handleEditStop}
              />
            ))}
          />
        </AnimatedComponent>
      </InteractionHandler>
    );
  }
}

export default AnimatedCard;
