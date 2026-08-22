// Voltage Editorial design: calm recovery, navy ink, Zap cyan, amber wayfinding, and clear escape routes.
import { ArrowLeft, BookOpen, Home, SearchX } from "lucide-react";
import { Link } from "wouter";

type NotFoundProps = { requestedPath?: string };

export default function NotFound({ requestedPath }: NotFoundProps) {
  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-grid" aria-hidden="true" />
      <section className="not-found-card">
        <div className="not-found-mark" aria-hidden="true"><SearchX size={28} /></div>
        <p className="not-found-eyebrow">ZAP / ROUTE SIGNAL LOST</p>
        <p className="not-found-code">404</p>
        <h1 id="not-found-title">Page not found.</h1>
        <p className="not-found-copy">
          ဒီလမ်းကြောင်းကို မတွေ့ပါ။ URL ကို ပြန်စစ်ပါ သို့မဟုတ် အောက်ပါလမ်းကြောင်းများထဲမှ တစ်ခုကို ရွေးပါ။
          {requestedPath && <span className="not-found-path">Requested: {requestedPath}</span>}
        </p>
        <div className="not-found-actions">
          <Link href="/" className="not-found-primary"><Home size={16} /> Home</Link>
          <Link href="/docs/introduction" className="not-found-secondary"><BookOpen size={16} /> Start with Introduction</Link>
          <button className="not-found-back" type="button" onClick={() => window.history.back()}><ArrowLeft size={16} /> Go back</button>
        </div>
        <p className="not-found-note">If you followed an old link, use Search docs in the header to find the current lesson.</p>
      </section>
    </main>
  );
}
