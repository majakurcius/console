import React, { useContext } from 'react';
import { Router } from '@reach/router';
import { StickyContainer, Sticky } from 'react-sticky';
import { Grid, Spinner } from '@kyma-project/components';
import * as LuigiClient from '@luigi-project/client';

import { Content } from '../components/Content';
import { Navigation } from '../components/Navigation';
import { QueriesService } from '../services';
import { ERRORS } from '../constants';

import { Wrapper, ErrorWrapper } from './styled';

export const App: React.FunctionComponent = () => {
  setImmediate(() =>
    LuigiClient.sendCustomMessage({ id: 'console.setWindowTitle', title: "Docs" }),
  );

  const { loading, error } = useContext(QueriesService);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorWrapper>{ERRORS.SERVER}</ErrorWrapper>;
  }

  return (
    <Wrapper>
      <Grid.Container className="grid-container" padding="0" width="auto">
        <StickyContainer>
          <Grid.Row style={{ margin: 0 }}>
            <Grid.Unit style={{ padding: 0 }} df={3} sm={0}>
              <Sticky>
                {({ style }: any) => (
                  <div style={{ ...style, zIndex: 200 }}>
                    <Navigation />
                  </div>
                )}
              </Sticky>
            </Grid.Unit>
            <Grid.Unit df={9} sm={12}>
              <Router>
                <Content path="/" />
                <Content path="/:group/:topic" />
              </Router>
            </Grid.Unit>
          </Grid.Row>
        </StickyContainer>
      </Grid.Container>
    </Wrapper>
  );
};
