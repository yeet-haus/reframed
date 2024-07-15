/** @jsxImportSource frog/jsx */
import { Rows, Row, Columns, Column, Heading } from '../src/ui.js';
import { Header } from './Header.js';
import { Footer } from './Footer.js';

interface ErrorViewProps {
  message: string;
}

export function ErrorView({ message }: ErrorViewProps) {
  return (
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
            <Heading wrap="balance">{message}</Heading>
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
  );
}
