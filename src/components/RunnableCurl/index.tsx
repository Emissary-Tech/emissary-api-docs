import React, { useState } from "react";
import styles from "./styles.module.css";

const ENDPOINT = "https://api.withemissary.com/gateway/v1/chat/completions";
const KEY_PLACEHOLDER = "YOUR_EMISSARY_API_KEY";

type Props = {
  /** Default router name shown in the editable field. */
  router?: string;
  /** Default message shown in the editable field. */
  message?: string;
};

type Result =
  | { kind: "ok"; status: number; model?: string; content?: string; cost?: number; raw: string }
  | { kind: "http-error"; status: number; raw: string }
  | { kind: "network-error" };

const shellQuote = (value: string) => `'${value.replace(/'/g, `'\\''`)}'`;

function buildCurl(router: string, message: string, apiKey: string) {
  const body = JSON.stringify({
    model: router,
    messages: [{ role: "user", content: message }],
  });
  return [
    `curl ${ENDPOINT} \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -H "Authorization: Bearer ${apiKey}" \\`,
    `  -d ${shellQuote(body)}`,
  ].join("\n");
}

export default function RunnableCurl({
  router: defaultRouter = "my-router",
  message: defaultMessage = "Hello!",
}: Props) {
  const [router, setRouter] = useState(defaultRouter);
  const [message, setMessage] = useState(defaultMessage);
  // Held in memory only: never persisted, never put in the URL.
  const [apiKey, setApiKey] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const shown = buildCurl(router, message, KEY_PLACEHOLDER);
  const canRun = apiKey.trim() !== "" && router.trim() !== "" && message.trim() !== "" && !running;

  async function run() {
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: router,
          messages: [{ role: "user", content: message }],
        }),
      });
      const raw = await res.text();
      if (!res.ok) {
        setResult({ kind: "http-error", status: res.status, raw });
        return;
      }
      let json: any = {};
      try {
        json = JSON.parse(raw);
      } catch {
        // Show the raw body below if it isn't JSON.
      }
      setResult({
        kind: "ok",
        status: res.status,
        model: json.model,
        content: json.choices?.[0]?.message?.content,
        cost: json.usage?.cost,
        raw: json && Object.keys(json).length ? JSON.stringify(json, null, 2) : raw,
      });
    } catch {
      setResult({ kind: "network-error" });
    } finally {
      setRunning(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildCurl(router, message, apiKey.trim() || KEY_PLACEHOLDER));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable: the command is still visible to select.
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Router name</span>
          <input value={router} onChange={(e) => setRouter(e.target.value)} spellCheck={false} />
        </label>
        <label className={styles.field}>
          <span>Message</span>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Emissary API key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={KEY_PLACEHOLDER}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>

      <pre className={styles.code}>
        <code>{shown}</code>
      </pre>

      <div className={styles.actions}>
        <button type="button" className="button button--primary button--sm" onClick={run} disabled={!canRun}>
          {running ? "Running…" : "Run"}
        </button>
        <button type="button" className="button button--secondary button--sm" onClick={copy}>
          {copied ? "Copied" : "Copy curl"}
        </button>
        <span className={styles.note}>
          Run sends a real request from your browser to the gateway, using your router and its provider
          keys. Your API key stays in this page and is only sent to the gateway.
        </span>
      </div>

      {result?.kind === "ok" && (
        <div className={styles.result}>
          <div className={styles.meta}>
            <span>HTTP {result.status}</span>
            {result.model && (
              <span>
                Served by <code>{result.model}</code>
              </span>
            )}
            {typeof result.cost === "number" && <span>Cost ${result.cost}</span>}
          </div>
          {result.content && <p className={styles.answer}>{result.content}</p>}
          <details>
            <summary>Raw response</summary>
            <pre className={styles.code}>
              <code>{result.raw}</code>
            </pre>
          </details>
        </div>
      )}

      {result?.kind === "http-error" && (
        <div className={`${styles.result} ${styles.error}`}>
          <div className={styles.meta}>
            <span>HTTP {result.status}</span>
          </div>
          <pre className={styles.code}>
            <code>{result.raw || "(empty response)"}</code>
          </pre>
        </div>
      )}

      {result?.kind === "network-error" && (
        <div className={`${styles.result} ${styles.error}`}>
          Couldn't reach the gateway from the browser. Copy the curl command and run it in a terminal
          instead.
        </div>
      )}
    </div>
  );
}
