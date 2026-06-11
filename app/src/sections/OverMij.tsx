import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, Clock, Lightbulb, Wrench } from 'lucide-react';

const stats = [
  { icon: Clock, value: '5+', label: 'Jaar ervaring' },
  { icon: Award, value: '200+', label: 'Projecten afgerond' },
  { icon: Lightbulb, value: '100%', label: 'Maatwerk' },
  { icon: Wrench, value: '0.05mm', label: 'Precisie' },
];

const processSteps = [
  {
    step: '01',
    title: 'Idee',
    desc: 'We bespreken je concept en bekijken de mogelijkheden. Elk project begint met een goed gesprek.',
  },
  {
    step: '02',
    title: 'Ontwerp',
    desc: 'Ik werk je idee uit naar een gedetailleerd 3D-model, klaar voor printen.',
  },
  {
    step: '03',
    title: 'Print',
    desc: 'Met professionele printers zet ik je ontwerp om in een tastbaar object.',
  },
  {
    step: '04',
    title: 'Afwerking',
    desc: 'Nabewerking voor een perfecte afwerking: schuren, polijsten, schilderen.',
  },
];

export default function OverMij() {
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
          <h2 className="section-title">
            Kasper Daems
          </h2>
          <div className="divider-line mb-6" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div ref={imageRef}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/about-kasper.jpg"
                alt="Kasper Daems bij zijn 3D printer"
                className="w-full aspect-[3/4] object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: 'linear-gradient(transparent, rgba(43,45,66,0.8))',
                }}
              >
                <p className="font-mono text-xs tracking-widest text-white/70 uppercase">
                  3D Printservice
                </p>
              </div>
            </div>
          </div>

          <div ref={textRef}>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--color-void)' }}
            >
              Van idee tot tastbaar product
            </h3>
            <p className="section-body mb-6">
              Al meer dan 5 jaar ben ik actief in de wereld van 3D-printing en
              productontwikkeling. Wat begon als een passie is uitgegroeid tot een
              professionele service waarmee ik bedrijven en particulieren help hun
              ideeen werkelijkheid te maken.
            </p>
            <p className="section-body mb-6">
              Mijn focus ligt op maatwerk en precisiewerk. Of het nu gaat om een
              functioneel prototype, een uniek designobject of een technisch
              onderdeel — ik zorg voor een resultaat dat aan de hoogste eisen
              voldoet.
            </p>
            <p className="section-body">
              Betrouwbaar, creatief en oplossingsgericht. Dat is waar KDM 3D voor
              staat. Ik denk mee van het eerste concept tot de laatste laag.
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
              Van concept tot eindproduct
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
