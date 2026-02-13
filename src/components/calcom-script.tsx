/**
 * Cal.com Embed Script
 * Loads Cal.com embed script for popup/modal booking widgets
 * Initializes the '30min' namespace for ai-rio booking
 * Docs: https://cal.com/docs/embed
 */
"use client";

export function CalcomScript() {
  return (
    <>
      {/* Inline script - defines Cal queue BEFORE embed.js loads */}
      <script
        id="calcom-init"
        dangerouslySetInnerHTML={{
          __html: `
            (function(C, A, L) {
              let p = function(a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function() {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function() { p(api, arguments); };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if(typeof namespace === "string") {
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["initNamespace", namespace]);
                  } else p(cal, ar);
                  return;
                }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            // Initialize 30min namespace
            Cal("init", "30min", {origin:"https://app.cal.com"});

            // Configure UI for 30min namespace
            Cal.ns["30min"]("ui", {
              theme: "dark",
              hideEventTypeDetails: false,
              layout: "month_view"
            });
          `,
        }}
      />
    </>
  );
}
