import React from "react";
import JsonLd from "@site/src/components/JsonLd";

type FaqItem = {
  question: string;
  /** Plain-text answer. Must match the answer shown on the page. */
  answer: string;
};

type FaqSchemaProps = {
  items: FaqItem[];
};

/**
 * Emits FAQPage structured data. Renders nothing visible: keep the visible
 * Q&A on the page in sync with `items`.
 */
export default function FaqSchema({ items }: FaqSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }}
    />
  );
}
