import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { StyleSheet, css } from 'aphrodite';
import VideoCall from 'material-ui/svg-icons/av/video-call';

import {
  setRoomId,
} from '../actions';

const styles = StyleSheet.create({
  content: {
    fontFamily: 'Roboto',
    color: '#fff',
    textAlign: 'left',
    textShadow: 'black 0.1em 0.1em 0.2em',
    fontWeight: '300',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
  }
  createRoom() {
    const id = shortid.generate();
    this.props.createRoom(id);
    this.context.router.push(`/video/${id}`);
  }

  render() {
    return (
      <div className={css(styles.content)}>
        <h1>Let's get started!</h1>
        <h2>Click the button below to create a new video chat room!</h2>
        <div onClick={this.createRoom}>
          <VideoCall
            style={{
              border: 'white 2px solid',
              borderRadius: '100%',
              padding: '25px'
            }}
            color='white'
          />
          <p>VIDEO CALL</p>
        </div>
      </div>
    );
  }
}

Main.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

export const mapDispatchToProps = (dispatch) => ({
  createRoom: (id) => {
    dispatch(setRoomId(id));
  }
});

export default connect(null, mapDispatchToProps)(Main);
