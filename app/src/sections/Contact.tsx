import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { contactFormRateLimiter, RateLimiter } from '@/lib/rateLimiter';

export default function Contact() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const formRef = useScrollReveal<HTMLDivElement>({ x: -40, opacity: 0 });
  const infoRef = useScrollReveal<HTMLDivElement>({ x: 40, opacity: 0, delay: 0.2 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rateLimitDialogOpen, setRateLimitDialogOpen] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState({ resetTime: 0, remainingAttempts: 0 });
  const [state, handleSubmit] = useForm('mnjybgrr');
  const formElementRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Show success dialog when form submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      setDialogOpen(true);
      // Reset form after successful submission
      formElementRef.current?.reset();
    }
  }, [state.succeeded]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check rate limit first
    const rateLimitCheck = contactFormRateLimiter.canSubmit();
    if (!rateLimitCheck.allowed) {
      setRateLimitInfo({
        resetTime: rateLimitCheck.resetTime || 0,
        remainingAttempts: rateLimitCheck.remainingAttempts,
      });
      setRateLimitDialogOpen(true);
      return;
    }

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    // Get reCAPTCHA token
    const token = await executeRecaptcha('contact_form');

    // Create a new FormData with the token included
    const formData = new FormData(e.currentTarget);
    formData.append('g-recaptcha-response', token);

    // Record the submission attempt
    contactFormRateLimiter.recordSubmission();

    // Submit to Formspree
    await handleSubmit(e);
  };

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
            Laten we samenwerken
          </h2>
          <p
            className="section-body mx-auto"
            style={{ color: 'rgba(255,232,214,0.7)', maxWidth: 550 }}
          >
            Heb je een project in gedachten? Neem contact op en we bespreken
            de mogelijkheden. Ik reageer binnen 24 uur.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <form ref={formElementRef} onSubmit={onSubmit} className="space-y-6">
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
                    href="mailto:kasper.daems@gmail.com"
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
                      kasper.daems@gmail.com
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(244,140,6,0.15)' }}
                    >
                      <Phone
                        size={18}
                        style={{ color: 'var(--color-orange)' }}
                      />
                    </div>
                    <span style={{ color: 'rgba(255,232,214,0.8)' }}>
                      +32 471 23 45 67
                    </span>
                  </div>

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
                      België — werkzaam in heel Vlaanderen
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
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    aria-label="Instagram"
                  >
                    <Instagram size={18} color="white" />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} color="white" />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={18} color="white" />
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

      <Dialog open={rateLimitDialogOpen} onOpenChange={setRateLimitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-orange-500" size={24} />
              <DialogTitle className="text-xl font-bold" style={{ color: 'var(--color-void)' }}>
                Te veel aanvragen
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600">
              Je hebt de limiet bereikt van 3 berichten per uur. Dit helpt ons spam te voorkomen.
              {rateLimitInfo.resetTime > 0 && (
                <span className="block mt-2 font-semibold text-gray-700">
                  Probeer opnieuw over: {RateLimiter.formatResetTime(rateLimitInfo.resetTime)}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setRateLimitDialogOpen(false)}
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
