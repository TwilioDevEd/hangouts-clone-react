import React from 'react';
import Video from 'twilio-video';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';

import {
  clearRoom
} from '../actions';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '20px',
    margin: '0 auto',
    width: '200px',
  },
  warning: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '30px',
    fontFamily: 'Roboto',
    color: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  icon: {
    padding: '20px',
  },
  localMedia: {
    width: '480px',
    margin: '0 auto',
  },
});

class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.muteAudio = this.muteAudio.bind(this);
    this.disableVideo = this.disableVideo.bind(this);
    this.exitRoom = this.exitRoom.bind(this);

    this.videoClient = new Video.Client(props.user.token);
    this.state = {
      activeRoom: null,
      muted: false,
      paused: false,
    };
  }

  componentDidMount() {
    this.videoClient.connect({to: this.props.room.id}).then((room) => {
      this.setState({
        activeRoom: room,
      });
      room.on('participantConnected', (participant) => {
        console.log('New participant!');
        participant.media.attach(this.remoteMedia);
      });
      room.on('participantDisconnected', (participant) => {
        participant.media.detach();
      });
      room.on('disconnected', () => {
        room.localParticipant.media.detach();
        room.participants.map((participant) => {
          participant.media.detach();
        });
        this.exitRoom();
      });
      room.localParticipant.media.attach(this.localMedia);
      if (room.participants) {
        room.participants.map((participant) => {
          participant.media.attach(this.remoteMedia);
        });
      }
      this.setState({
        activeRoom: room,
      });
    }, (error) => {
      console.log(error);
    });
  }

  muteAudio() {
    if (this.state.activeRoom.localParticipant.media.isMuted) {
      this.state.activeRoom.localParticipant.media.mute(false);
      this.setState({
        muted: false,
      });
    } else {
      this.state.activeRoom.localParticipant.media.mute(true);
      this.setState({
        muted: true,
      });
    }
  }

  disableVideo() {
    const videoTracks = this.state.activeRoom.localParticipant.media.videoTracks;
    console.log(videoTracks);
    if (this.state.activeRoom.localParticipant.media.isPaused) {
      videoTracks.forEach((value, key) => {
        value.enable();
      });
      this.setState({
        paused: false,
      });
    } else {
      videoTracks.forEach((value, key) => {
        value.disable();
      });
      this.setState({
        paused: true,
      });
    }
  }

  exitRoom() {
    this.setState({
      activeRoom: false,
    });
    this.state.activeRoom.disconnect();
    this.props.clearRoom();
    this.context.router.push('/main');
  }

  render() {
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      return (
        <div className={css(styles.warning)}>
          <h1>Oops! WebRTC is not available in your browser.</h1>
        </div>
      );
    }

    if (!this.state.activeRoom) {
      return false;
    }


    return (
      <div>
        <div className={css(styles.toolbar)}>
          <MicOff color={ this.state.muted ? 'red' : 'white' } onClick={this.muteAudio} className={css(styles.icon)}/>
          <VideoCamOff color={ this.state.paused ? 'red': 'white' } onClick={this.disableVideo} className={css(styles.icon)}/>
          <CallEnd color='red' onClick={this.exitRoom} className={css(styles.icon)}/>
        </div>
        <div className={css(styles.localMedia)} ref={(localMedia) => { this.localMedia = localMedia; }}/>
        <div className={css(styles.remoteMedia)} ref={(remoteMedia) => { this.remoteMedia = remoteMedia; }}/>
      </div>
    );
  }
}

VideoChat.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  room: state.room,
  peripherals: state.peripherals,
});

const mapDispatchToProps = (dispatch) => ({
  clearRoom: () => {
    dispatch(clearRoom());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
