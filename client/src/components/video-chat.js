import React from 'react';
import Video from 'twilio-video';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import VideoCamOff from 'material-ui/svg-icons/av/videocam-off';
import CallEnd from 'material-ui/svg-icons/communication/call-end';

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: '20px',
    display: 'inline-block',
    marginTop: '20px',
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
});

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.videoClient = new Video.Client(props.user.token);
    this.state = {
      activeRoom: null,
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
        this.setState({
          activeRoom: null,
        });
      });
      room.localParticipant.media.attach(this.localMedia);
      room.participants.map((participant) => {
        participant.media.attach(this.remoteMedia);
      });
    }, (error) => {
      console.log(error);
    });
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
          <MicOff color='white'/>
          <VideoCamOff color='white'/>
          <CallEnd color='red'/>
        </div>
        <div ref={(localMedia) => { this.localMedia = localMedia; }}/>
        <div ref={(remoteMedia) => { this.remoteMedia = remoteMedia; }}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  room: state.room,
  peripherals: state.peripherals,
});

export default connect(mapStateToProps)(VideoChat);
