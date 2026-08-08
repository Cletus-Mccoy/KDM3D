import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Lightbulb, SearchCheck, Rocket } from 'lucide-react';

// TODO(content): confirm final service names/descriptions and swap in dedicated photos.
const services = [
  {
    icon: Lightbulb,
    number: '01',
    title: 'Technisch advies',
    desc: 'Onafhankelijke technische begeleiding bij productontwikkeling: van eerste concept tot ontwerpkeuzes en materiaalselectie.',
    image: '/images/service-design.jpg',
  },
  {
    icon: SearchCheck,
    number: '02',
    title: 'Design & haalbaarheidsreview',
    desc: 'Een kritische blik op je ontwerp of productieproces: haalbaarheid, kostprijs en risico’s in kaart voordat je investeert.',
    image: '/images/service-validate.jpg',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Prototyping & begeleiding',
    desc: 'Ondersteuning bij het bouwen en testen van prototypes, met praktijkervaring uit eigen 3D-printproductie.',
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
