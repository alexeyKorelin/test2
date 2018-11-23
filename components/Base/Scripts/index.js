import React, {Component} from 'react';
import {Wrapper} from 'utils/utils';
import { YMInitializer } from 'react-yandex-metrika';
import Settings from 'config';

export default class Scripts extends Component {
  render () {
    const stage = Settings.stage;
    return (
      <Wrapper>
        <If condition={stage == 'production'}>
          <YMInitializer accounts={[49686337]} version="2"
            options={{
              id: 49686337,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            }}/>
        </If>
        <script src="https://cdn.ravenjs.com/3.24.0/raven.min.js" crossOrigin="anonymous"></script>
      </Wrapper>
    )
  }
}
