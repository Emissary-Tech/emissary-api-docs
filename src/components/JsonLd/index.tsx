import React from "react";
import Head from "@docusaurus/Head";

type JsonLdProps = {
  /** A schema.org object (or array of objects), serialized into a JSON-LD script tag. */
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Emits a JSON-LD structured data script in the page <head>. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
