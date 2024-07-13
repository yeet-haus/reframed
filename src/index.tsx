// import * as process from 'node:process';

import { Frog } from 'frog';
import { Box, Heading, Text, VStack, vars } from './ui.js';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';

// import { formatEther, getAddress } from 'viem';

// import {
//   addParsedContent,
//   formatShortDateTimeFromSeconds,
//   postData,
// } from '../utils/helpers.js';

import { DH_GRAPH_ENDPOINT, GRAPH_ENDPOINT } from '../utils/constants.js';

// import { Header } from '../components/Header.js';
// import { Footer } from '../components/Footer.js';

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
  const graphKey = c.env.GRAPH_KEY;

  // Log the GRAPH_KEY to verify it's being read correctly
  console.log('GRAPH_KEY:', graphKey);

  // Log the endpoints to verify they are working
  console.log('Testing GRAPH_ENDPOINT:');
  console.log(GRAPH_ENDPOINT(graphKey));

  console.log('Testing DH_GRAPH_ENDPOINT:');
  console.log(DH_GRAPH_ENDPOINT(graphKey));

  return c.res({
    image: '/nipple',
  });
});

app.image('/nipple', c => {
  return c.res({
    headers: {
      'Cache-Control': 'max-age=0',
    },
    image: (
      <Box grow alignHorizontal="center" backgroundColor="nipple" padding="32">
        <VStack gap="4">
          <Heading>FrogUI</Heading>
          <Text color="angel" size="20">
            Build consistent frame experiences
          </Text>
        </VStack>
      </Box>
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
