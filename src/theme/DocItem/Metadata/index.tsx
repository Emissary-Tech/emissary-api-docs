import React from "react";
import Metadata from "@theme-original/DocItem/Metadata";
import type MetadataType from "@theme/DocItem/Metadata";
import type { WrapperProps } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import JsonLd from "@site/src/components/JsonLd";

type Props = WrapperProps<typeof MetadataType>;

/**
 * Adds TechArticle structured data to every doc page, built from the page's
 * own title, description and last-updated time, on top of the metadata
 * Docusaurus already emits (title, description, canonical, breadcrumbs).
 */
export default function MetadataWrapper(props: Props): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const { metadata } = useDoc();
  const url = `${siteConfig.url}${metadata.permalink}`.replace(/\/$/, "") || siteConfig.url;

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: metadata.title,
    mainEntityOfPage: url,
    url,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Emissary" },
    publisher: {
      "@type": "Organization",
      name: "Emissary",
      url: "https://www.withemissary.com",
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/img/emissary.svg` },
    },
  };
  if (metadata.description) {
    article.description = metadata.description;
  }
  if (metadata.lastUpdatedAt) {
    article.dateModified = new Date(metadata.lastUpdatedAt).toISOString();
  }

  return (
    <>
      <Metadata {...props} />
      <JsonLd data={article} />
    </>
  );
}
