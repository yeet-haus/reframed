// Frog Development
import * as process from 'node:process';

import { Frog } from 'frog';
import {
  Box,
  Columns,
  Column,
  Rows,
  Row,
  Heading,
  Text,
  VStack,
  vars,
} from './ui.js';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

// import { formatEther, getAddress } from 'viem';

// import {
//   addParsedContent,
//   formatShortDateTimeFromSeconds,
//   postData,
// } from '../utils/helpers.js';

import { DH_GRAPH_ENDPOINT, GRAPH_ENDPOINT } from '../utils/constants.js';

import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

export const app = new Frog({
  title: 'YEET',
  // browserLocation: 'https://app.yeet.haus/',
  assetsPath: '/',
  ui: { vars },
  initialState: {
    minTribute: '0',
    shamanAddress: '',
  },
});

app.frame('/', c => {
  // const graphKey = c.env.GRAPH_KEY;
  // const graphKey = process.env.GRAPH_KEY;
  const graphKey = c.env?.GRAPH_KEY || process.env.GRAPH_KEY;

  if (!graphKey) {
    throw new Error('GRAPH_KEY Missing');
  }

  // Log the GRAPH_KEY to verify it's being read correctly
  console.log('GRAPH_KEY:', graphKey);

  // Log the endpoints to verify they are working
  console.log('Testing GRAPH_ENDPOINT:');
  console.log(GRAPH_ENDPOINT(graphKey));

  console.log('Testing DH_GRAPH_ENDPOINT:');
  console.log(DH_GRAPH_ENDPOINT(graphKey));

  return c.res({
    image: '/yeeter-not-found',
  });
});

app.image('/yeeter-not-found', c => {
  return c.res({
    headers: {
      'Cache-Control': 'max-age=0',
    },
    image: (
      <Rows grow>
        <Row
          backgroundColor="death"
          color="nipple"
          textTransform="uppercase"
          borderTopColor={'angel'}
          borderTopWidth={'4'}
          borderRightColor={'angel'}
          borderRightWidth={'4'}
          borderLeftColor={'angel'}
          borderLeftWidth={'4'}
          height="1/5"
        >
          <Header />
        </Row>
        <Row
          backgroundColor="nipple"
          borderTopColor={'angel'}
          borderTopWidth={'2'}
          borderRightColor={'angel'}
          borderRightWidth={'4'}
          borderBottomColor={'angel'}
          borderBottomWidth={'2'}
          borderLeftColor={'angel'}
          borderLeftWidth={'4'}
          height="3/5"
        >
          <Columns grow>
            <Column
              backgroundColor="death"
              color="angel"
              textAlign="center"
              textTransform="uppercase"
              alignHorizontal="center"
              alignVertical="center"
              paddingRight="12"
              paddingLeft="12"
              width="1/1"
            >
              <Heading wrap="balance">Yeeter Not Found</Heading>
            </Column>
          </Columns>
        </Row>
        <Row
          backgroundColor="death"
          color="angel"
          textTransform="uppercase"
          borderRightColor={'angel'}
          borderRightWidth={'4'}
          borderBottomColor={'angel'}
          borderBottomWidth={'4'}
          borderLeftColor={'angel'}
          borderLeftWidth={'4'}
          height="1/5"
        >
          <Footer />
        </Row>
      </Rows>
    ),
  });
});

const isCloudflareWorker = typeof caches !== 'undefined';
if (isCloudflareWorker) {
  const manifest = await import('__STATIC_CONTENT_MANIFEST');
  const serveStaticOptions = { manifest, root: './' };
  app.use('/*', serveStatic(serveStaticOptions));
  devtools(app, { assetsPath: '/frog', serveStatic, serveStaticOptions });
} else {
  devtools(app, { serveStatic });
}

export default app;
