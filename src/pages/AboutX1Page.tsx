import { BookOpen, ShieldCheck, Sparkles, Target } from 'lucide-react';

export function AboutX1Page() {
  return (
    <section className="about-x1 space-y-6">
      <header className="about-x1-hero glass rounded-3xl p-6 md:p-8">
        <p className="about-x1-kicker">About X1 / About Me</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">A premium knowledge and cybersecurity strategy platform.</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted md:text-base">
          X1 is built as a modern knowledge platform connecting Technology & Innovation, Curiosities & Philosophy,
          Security Map, and Compliance Frameworks. It simplifies complex knowledge through structured summaries,
          practical insights, personal reflections, and professional experience.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="glass about-card rounded-2xl p-5">
          <h2 className="about-card-title"><Sparkles size={18} /> X1 platform purpose</h2>
          <p>
            X1 exists to make technology, cybersecurity, innovation, governance, compliance, science, books, anime,
            philosophy, and personal growth easier to understand for all audiences regardless of generation,
            background, or technical level.
          </p>
          <p>
            It is designed as a space where curiosity, creativity, learning, and expertise meet together to make
            complex knowledge open, inspiring, useful, and accessible to all.
          </p>
        </article>

        <article className="glass about-card rounded-2xl p-5">
          <h2 className="about-card-title"><ShieldCheck size={18} /> Professional positioning</h2>
          <p>
            I specialize in cybersecurity strategy, governance, risk management, privacy, business resilience,
            identity and access management, and AI security within highly regulated and business-critical
            environments.
          </p>
          <p>
            I help organizations translate complex security, regulatory, operational, and technology challenges into
            clear risk-based decisions that protect business value, enable growth, strengthen resilience, and
            withstand regulatory scrutiny.
          </p>
        </article>

        <article className="glass about-card rounded-2xl p-5">
          <h2 className="about-card-title"><Target size={18} /> Information security management</h2>
          <p>
            My focus is centered on Governance, Risk, and Compliance, complemented by Business Continuity and Disaster
            Recovery, Privacy, IAM, and Cybersecurity for AI systems.
          </p>
          <p>
            I position myself as a cybersecurity and information security management professional able to connect
            governance, risk, compliance, privacy, identity, operational resilience, and AI security into a coherent
            security operating model.
          </p>
          <p>
            My objective is to help organizations move from fragmented security activities to structured, measurable,
            audit-ready, and business-aligned security management practices.
          </p>
        </article>

        <article className="glass about-card rounded-2xl p-5">
          <h2 className="about-card-title"><BookOpen size={18} /> Value proposition</h2>
          <ul className="about-list">
            <li>Turning cybersecurity, privacy, IAM, resilience, and AI security requirements into clear business decisions.</li>
            <li>Connecting governance, risk, compliance, technical insight, and operational resilience.</li>
            <li>Supporting environments where trust, regulation, availability, transformation, and innovation must coexist.</li>
            <li>Building audit-ready, risk-based, and executive-readable security practices.</li>
            <li>Growing toward CISO-level leadership and high-value cybersecurity advisory capabilities.</li>
          </ul>
        </article>
      </div>

      <article className="glass about-quote rounded-2xl p-5 md:p-6">
        <h2 className="about-card-title">Philosophy</h2>
        <blockquote>
          “Attack is the secret of defense; defense is the planning of an attack.”
        </blockquote>
        <p className="text-sm text-muted">— Sun Tzu, The Art of War</p>
      </article>
    </section>
  );
}
