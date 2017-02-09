import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const backgroundURL = "https://source.unsplash.com/category/nature/1600x900/daily";
const styles = StyleSheet.create({
  background: {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepead: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100%',
    minWidth: '100%',
    position: 'fixed',
    ':before': {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'radial-gradient(circle, #909090, #0c0c0c)',
      opacity: 0.6,
    }
  },
});

class App extends React.Component {
  render() {
    return (
      <MultiThemeProvider>
        <div className={css(styles.background)}>
          {this.props.children}
        </div>
      </MultiThemeProvider>
    );
  }
}

export default App;
