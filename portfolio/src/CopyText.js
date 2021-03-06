import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

class CopyText extends Component {
  state = {
    value: 'alexcolbourn@gmail.com',
    copied: false,
  };

  render() {
    return (
      <div>
        <CopyToClipboard
          text={this.state.value}
          onCopy={() => this.setState({ copied: true })}
        >
          <Typography variant='subtitle1'>
            alexcolbourn@gmail.com
            <IconButton aria-label='Copy Email'>
              <FileCopyIcon
                style={{ color: this.state.copied ? this.props.theme.colors.primary : 'grey' }}
              />
            </IconButton>
          </Typography>
        </CopyToClipboard>
      </div>
    );
  }
}

export default withTheme(CopyText);
