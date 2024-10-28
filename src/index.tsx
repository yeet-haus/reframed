// Frog Development
import * as process from "node:process";

import { Frog, Button } from "frog";
import { vars } from "./ui.js";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";

import { formatEther, getAddress } from "viem";

import {
  addParsedContent,
  formatShortDateTimeFromSeconds,
  postData,
} from "../utils/helpers.js";

import { DH_GRAPH_ENDPOINT, GRAPH_ENDPOINT } from "../utils/constants.js";

import { ErrorView } from "../components/ErrorView.js";
import { SuccessView } from "../components/SuccessView.js";

export const app = new Frog({
  title: "YEET",
  browserLocation: "https://app.yeet.haus/",
  origin: "https://frames.yeet.haus",
  assetsPath: "/",
  ui: { vars },
  initialState: {
    minTribute: "0",
    shamanAddress: "",
  },
});

app.frame("/", (c) => {
  return c.res({
    image: "/wheres-the-yeet",
  });
});

app.frame("/yeeter/:yeeterid", async (c) => {
  const yeeterid = c.req.param("yeeterid");

  const graphKey = c.env?.GRAPH_KEY || process.env.GRAPH_KEY;

  if (!graphKey) {
    throw new Error("GRAPH_KEY Missing");
  }

  const yeetData = await postData(GRAPH_ENDPOINT(graphKey), {
    query: `{yeeter(id: "${yeeterid.toLowerCase()}") {id endTime startTime minTribute multiplier goal balance dao { id }}}`,
  });

  console.log("yeeterid", yeeterid);
  console.log("yeetData", yeetData);

  if (!yeetData.data.yeeter) {
    return c.res({
      image: <ErrorView message="Yeeter Not Found" />,
    });
  }

  const now = Date.now() / 1000;
  const isActive =
    now > Number(yeetData.data.yeeter.startTime) &&
    now < Number(yeetData.data.yeeter.endTime);

  if (!isActive) {
    return c.res({
      image: <ErrorView message="Yeeter Not Active" />,
    });
  }

  const daoid = yeetData.data.yeeter.dao.id;

  const metaRes = await postData(DH_GRAPH_ENDPOINT(graphKey), {
    query: `{records(where: { dao: "${daoid.toLowerCase()}", table: "yeetDetails" }, orderBy: createdAt, orderDirection: desc) {id content dao { name } }}`,
  });

  const meta = addParsedContent(metaRes.data.records[0].content);

  if (!metaRes.data.records[0]) {
    return c.res({
      image: <ErrorView message="Missing Yeeter Mission" />,
    });
  }

  const name = metaRes.data.records[0].dao.name;
  const mission = meta?.missionStatement || "No Mission";
  const balance = formatEther(yeetData.data.yeeter.balance);
  const endTime =
    formatShortDateTimeFromSeconds(yeetData.data.yeeter.endTime) || "No End";
  const goal = formatEther(yeetData.data.yeeter.goal);
  const minTribute = formatEther(yeetData.data.yeeter.minTribute);

  return c.res({
    action: `/success/${daoid}`,
    headers: {
      "Cache-Control": "max-age=0",
    },
    image: (
      <SuccessView
        name={name}
        mission={mission}
        goal={goal}
        balance={balance}
        endTime={endTime}
        minTribute={minTribute}
      />
    ),
    intents: [
      <Button.Transaction
        target={`/yeet/${yeeterid}/${yeetData.data.yeeter.minTribute}`}
      >
        YEET
      </Button.Transaction>,
    ],
  });
});

app.transaction("/yeet/:yeeterid/:mintribute", (c) => {
  const yeeterid = c.req.param("yeeterid");
  const mintribute = c.req.param("mintribute");
  const shamanAddress = getAddress(yeeterid);
  const message = "YEET FROM FRAMES";

  return c.contract({
    abi: [
      {
        inputs: [{ internalType: "string", name: "message", type: "string" }],
        name: "contributeEth",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    chainId: "eip155:8453",
    functionName: "contributeEth",
    value: BigInt(mintribute),
    args: [message],
    to: shamanAddress,
  });
});

app.frame(`/success/:daoid`, (c) => {
  const daoid = c.req.param("daoid");
  return c.res({
    image: "/success.c725c72095.png",
    headers: {
      "Content-Type": "image/png",
    },
    intents: [
      <Button.Link
        href={`https://app.yeet.haus/#/molochV3/0x2105/${daoid.toLowerCase()}`}
      >
        View Project
      </Button.Link>,
    ],
  });
});

app.image("/wheres-the-yeet", (c) => {
  return c.res({
    image: <ErrorView message="Where's the Yeet?" />,
  });
});

app.image("/yeeter-not-found", (c) => {
  return c.res({
    image: <ErrorView message="Yeeter Not Found" />,
  });
});

app.image("/yeeter-not-active", (c) => {
  return c.res({
    image: <ErrorView message="Yeeter Not Active" />,
  });
});

app.image("/missing-yeeter-mission", (c) => {
  return c.res({
    image: <ErrorView message="Missing Yeeter Mission" />,
  });
});

const isCloudflareWorker = typeof caches !== "undefined";
if (isCloudflareWorker) {
  const manifest = await import("__STATIC_CONTENT_MANIFEST");
  const serveStaticOptions = { manifest, root: "./" };
  app.use("/*", serveStatic(serveStaticOptions));
  devtools(app, { assetsPath: "/frog", serveStatic, serveStaticOptions });
} else {
  devtools(app, { serveStatic });
}

export default app;
