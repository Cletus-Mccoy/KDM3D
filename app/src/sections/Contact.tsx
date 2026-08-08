import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, MapPin, Send, Linkedin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ContactProps {
  formId: string;
  /** Tags the inquiry so submissions are distinguishable by track in Formspree. */
  track: 'maker' | 'consulting';
  title?: string;
  description?: string;
}

export default function Contact({
  formId,
  track,
  title = 'Laten we samenwerken',
  description = 'Heb je een project in gedachten? Neem contact op en we bespreken de mogelijkheden. Ik reageer binnen 24 uur.',
}: ContactProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const formRef = useScrollReveal<HTMLDivElement>({ x: -40, opacity: 0 });
  const infoRef = useScrollReveal<HTMLDivElement>({ x: 40, opacity: 0, delay: 0.2 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, handleSubmit] = useForm(formId);
  const formElementRef = useRef<HTMLFormElement>(null);

  // Show success dialog when form submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      setDialogOpen(true);
      // Reset form after successful submission
      formElementRef.current?.reset();
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact"
      className="section-dark"
      style={{ padding: 'var(--section-py) var(--container-px)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="section-label">Contact</p>
          <h2 className="section-title" style={{ color: 'white' }}>
            {title}
          </h2>
          <p
            className="section-body mx-auto"
            style={{ color: 'rgba(255,232,214,0.7)', maxWidth: 550 }}
          >
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <form ref={formElementRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="track" value={track} />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="contact-label" style={{ color: 'rgba(255,232,214,0.8)' }}>
                    Naam
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Jouw naam"
                    className="contact-input"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                    }}
                    disabled={state.submitting}
                  />
                  <ValidationError field="name" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="email" className="contact-label" style={{ color: 'rgba(255,232,214,0.8)' }}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="jouw@email.be"
                    className="contact-input"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                    }}
                    disabled={state.submitting}
                  />
                  <ValidationError field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="contact-label" style={{ color: 'rgba(255,232,214,0.8)' }}>
                  Onderwerp
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="Waar gaat je project over?"
                  className="contact-input"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                  }}
                  disabled={state.submitting}
                />
                <ValidationError field="subject" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="contact-label" style={{ color: 'rgba(255,232,214,0.8)' }}>
                  Bericht
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Beschrijf je project zo gedetailleerd mogelijk..."
                  className="contact-input resize-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                  }}
                  disabled={state.submitting}
                />
                <ValidationError field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                className="hero-cta w-full sm:w-auto justify-center"
                disabled={state.submitting}
              >
                <Send size={16} />
                {state.submitting ? 'Verzenden...' : 'Verstuur bericht'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h4
                  className="font-bold text-lg mb-4"
                  style={{ color: 'var(--color-paper)' }}
                >
                  Contactgegevens
                </h4>
                <div className="space-y-4">
                  <a
                    href="mailto:kasper.daems@kadanskonsult.be"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: 'rgba(244,140,6,0.15)' }}
                    >
                      <Mail
                        size={18}
                        style={{ color: 'var(--color-orange)' }}
                      />
                    </div>
                    <span
                      className="group-hover:text-orange-400 transition-colors"
                      style={{ color: 'rgba(255,232,214,0.8)' }}
                    >
                      kasper.daems@kadanskonsult.be
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(244,140,6,0.15)' }}
                    >
                      <MapPin
                        size={18}
                        style={{ color: 'var(--color-orange)' }}
                      />
                    </div>
                    <span style={{ color: 'rgba(255,232,214,0.8)' }}>
                      Rotselaar, België — werkzaam in heel Vlaanderen
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  className="font-bold text-lg mb-4"
                  style={{ color: 'var(--color-paper)' }}
                >
                  Volg me
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://be.linkedin.com/in/kasper-daems-91b6a2132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} color="white" />
                  </a>
                </div>
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <p
                  className="font-mono text-xs tracking-wider uppercase mb-2"
                  style={{ color: 'var(--color-orange)' }}
                >
                  Reactietijd
                </p>
                <p style={{ color: 'rgba(255,232,214,0.7)' }}>
                  Ik streven ernaar om binnen 24 uur te reageren op alle
                  aanvragen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: 'var(--color-void)' }}>
              Bericht verstuurd!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Bedankt voor je aanvraag. Ik neem zo snel mogelijk contact met je op.
              Je hoort binnen 24 uur van me.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setDialogOpen(false)}
              className="hero-cta"
            >
              Begrepen
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
