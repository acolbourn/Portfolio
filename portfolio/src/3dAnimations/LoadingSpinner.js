import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';
import '../styles/LoadingSpinner.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className='LoadingSpinner-root'>
        <PuffLoader
          css={override}
          size={150}
          color={this.props.theme.colors.primary}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default withTheme(LoadingSpinner);
