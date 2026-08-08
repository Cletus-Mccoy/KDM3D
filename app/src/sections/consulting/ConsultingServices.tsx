import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Gauge, Cpu, Rocket } from 'lucide-react';

// TODO(content): swap in dedicated photos once available; reusing maker-service photos for now.
const services = [
  {
    icon: Gauge,
    number: '01',
    title: 'Lean & Operational Excellence',
    desc: 'Verspilling opsporen en wegwerken op de vloer: OEE-verbetering, centerlining en procesoptimalisatie, onderbouwd met Lean Six Sigma Green Belt en Lean Just-in-Time.',
    image: '/images/service-validate.jpg',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'Manufacturing & automatisering',
    desc: 'Procesautomatisering en reliability engineering voor productieomgevingen — van PLC-programmatie tot autonomous maintenance.',
    image: '/images/service-design.jpg',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Rapid prototyping & productontwikkeling',
    desc: 'Van eerste idee tot werkend prototype, met hands-on ervaring in additive & subtractive manufacturing en CAD (Fusion 360).',
    image: '/images/service-print.jpg',
  },
];

export default function ConsultingServices() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const cardsRef = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.15 });

  return (
    <section
      id="diensten"
      className="section-paper"
      style={{ padding: 'var(--section-py) var(--container-px)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="section-label">Diensten</p>
          <h2 className="section-title">Wat ik voor je kan doen</h2>
          <p
            className="section-body mx-auto"
            style={{ maxWidth: 550 }}
          >
            Onafhankelijk technisch advies, afgestemd op jouw vraagstuk —
            van eerste idee tot productieklaar resultaat.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          data-stagger
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <div
              key={service.number}
              data-reveal-child
              className="service-card group"
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-image"
                />
              </div>
              <div className="service-card-content">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(244, 140, 6, 0.1)' }}
                  >
                    <service.icon
                      size={18}
                      style={{ color: 'var(--color-orange)' }}
                    />
                  </div>
                  <p className="service-card-number">{service.number}</p>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
