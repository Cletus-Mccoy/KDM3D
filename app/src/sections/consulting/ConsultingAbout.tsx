import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Award, Lightbulb, Users, Wrench } from 'lucide-react';

// TODO(content): confirm real stats for the consulting track (engagements, sectors, etc.)
const stats = [
  { icon: Wrench, value: '5+', label: 'Jaar technische ervaring' },
  { icon: Users, value: '—', label: 'Klanten begeleid' },
  { icon: Lightbulb, value: '100%', label: 'Onafhankelijk advies' },
  { icon: Award, value: '—', label: 'Sectoren' },
];

// TODO(content): confirm the consulting engagement process — placeholder mirrors the maker-service flow for now.
const processSteps = [
  {
    step: '01',
    title: 'Intake',
    desc: 'We bespreken je uitdaging, doelstellingen en huidige stand van zaken.',
  },
  {
    step: '02',
    title: 'Analyse',
    desc: 'Ik breng het technische vraagstuk in kaart en identificeer knelpunten en kansen.',
  },
  {
    step: '03',
    title: 'Advies',
    desc: 'Je krijgt een concreet, onderbouwd actieplan of ontwerpvoorstel.',
  },
  {
    step: '04',
    title: 'Begeleiding',
    desc: 'Op vraag begeleid ik de uitvoering, van prototype tot productie.',
  },
];

export default function ConsultingAbout() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const imageRef = useScrollReveal<HTMLDivElement>({ x: -60, opacity: 0 });
  const textRef = useScrollReveal<HTMLDivElement>({ x: 60, opacity: 0, delay: 0.2 });
  const statsRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
  const processRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.15 });

  return (
    <section
      id="over-mij"
      className="section-light"
      style={{ padding: 'var(--section-py) var(--container-px)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <p className="section-label">Over Mij</p>
          <h2 className="section-title">Kasper Daems</h2>
          <div className="divider-line mb-6" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div ref={imageRef}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/about-kasper.jpg"
                alt="Kasper Daems, engineering consultant"
                className="w-full aspect-[3/4] object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: 'linear-gradient(transparent, rgba(43,45,66,0.8))',
                }}
              >
                <p className="font-mono text-xs tracking-widest text-white/70 uppercase">
                  Engineering Consulting
                </p>
              </div>
            </div>
          </div>

          <div ref={textRef}>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--color-void)' }}
            >
              Technisch advies met hands-on ervaring
            </h3>
            <p className="section-body mb-6">
              Naast KDM 3D — mijn 3D-printservice — werk ik als freelance
              engineering consultant. Meer dan 5 jaar praktijkervaring in
              productontwikkeling en prototyping vertaal ik naar concreet,
              onafhankelijk advies voor bedrijven.
            </p>
            <p className="section-body mb-6">
              Of het nu gaat om een technische haalbaarheidsstudie, ontwerp­review
              of begeleiding van idee tot productieklaar product — ik denk mee op
              zowel technisch als praktisch niveau.
            </p>
            <p className="section-body">
              Betrouwbaar, creatief en oplossingsgericht. Ik combineer
              engineering-inzicht met de praktijkervaring van iemand die zelf
              dagelijks ontwerpt, print en produceert.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          data-stagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-child
              className="text-center p-6 rounded-lg"
              style={{ backgroundColor: 'white' }}
            >
              <stat.icon
                size={24}
                style={{ color: 'var(--color-orange)' }}
                className="mx-auto mb-3"
              />
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: 'var(--color-void)' }}
              >
                {stat.value}
              </p>
              <p className="font-mono text-xs tracking-wider text-gray-500 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Werkwijze</p>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--color-void)' }}>
              Van vraagstuk tot resultaat
            </h3>
          </div>

          <div ref={processRef} data-stagger className="space-y-8">
            {processSteps.map((s) => (
              <div
                key={s.step}
                data-reveal-child
                className="process-step"
                data-step={s.step}
              >
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: 'var(--color-void)' }}
                >
                  {s.title}
                </h4>
                <p className="section-body">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
