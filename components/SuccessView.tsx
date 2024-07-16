/** @jsxImportSource frog/jsx */
import { Rows, Row, Columns, Column, Heading, Text } from '../src/ui.js';
import { Header } from './Header.js';

interface SuccessViewProps {
  name: string;
  mission: string;
  goal: string;
  balance: string;
  endTime: string;
  minTribute: string;
}

export function SuccessView({
  name,
  mission,
  goal,
  balance,
  endTime,
  minTribute,
}: SuccessViewProps) {
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
            alignHorizontal="center"
            alignVertical="center"
            paddingRight="12"
            paddingLeft="12"
            width="1/2"
          >
            <Heading wrap="balance">{name}</Heading>
          </Column>
          <Column
            backgroundColor="death"
            color="angel"
            alignHorizontal="center"
            alignVertical="center"
            paddingRight="12"
            paddingLeft="12"
            width="1/2"
          >
            <Heading size="24" weight="400">
              {mission}
            </Heading>
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
        <Columns grow>
          <Column alignHorizontal="center" alignVertical="center" width="1/4">
            <Heading size="18">Goal</Heading>
            <Text size="18" weight="400">
              {goal} ETH
            </Text>
          </Column>
          <Column alignHorizontal="center" alignVertical="center" width="1/4">
            <Heading size="18">Raised</Heading>
            <Text size="18" weight="400">
              {balance} ETH
            </Text>
          </Column>
          <Column alignHorizontal="center" alignVertical="center" width="1/4">
            <Heading size="18">Ends</Heading>
            <Text size="18" weight="400">
              {endTime}
            </Text>
          </Column>
          <Column alignHorizontal="center" alignVertical="center" width="1/4">
            <Heading size="18">Tribute</Heading>
            <Text size="18" weight="400">
              {minTribute} ETH
            </Text>
          </Column>
        </Columns>
      </Row>
    </Rows>
  );
}
