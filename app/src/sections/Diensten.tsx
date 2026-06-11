import { useScrollReveal } from '../hooks/useScrollReveal';
import { Printer, PenTool, ClipboardCheck } from 'lucide-react';

const services = [
  {
    icon: Printer,
    number: '01',
    title: '3D-printen op maat',
    desc: 'Van kleine precisie-onderdelen tot middelgrote objecten. Ik print in verschillende materialen zoals PLA, PETG en resin, afhankelijk van jouw specifieke wensen en toepassing.',
    image: '/images/service-print.jpg',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Design ondersteuning',
    desc: 'Heb je een idee maar nog geen 3D-model? Ik help je bij het uitwerken van je concept naar een printbaar ontwerp. Samen brengen we je visie tot leven.',
    image: '/images/service-design.jpg',
  },
  {
    icon: ClipboardCheck,
    number: '03',
    title: 'Design validatie',
    desc: 'Voordat we printen controleer ik of je ontwerp technisch haalbaar is. Ik controleer op printbaarheid, structuur en functionaliteit om problemen vroegtijdig te voorkomen.',
    image: '/images/service-validate.jpg',
  },
];

export default function Diensten() {
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
            Van concept tot afwerking — ik begeleid je door het hele proces
            voor een perfect resultaat.
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
