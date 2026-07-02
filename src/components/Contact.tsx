import React, { useState, useCallback } from 'react';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import ScrollReveal from './ui/ScrollReveal';
import { contactInfo } from '../data/siteData';

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Please enter your email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email.';
        return '';
      case 'message':
        if (!value.trim()) return 'Please enter a message.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      default:
        return '';
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [errors, validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: FormErrors = {
        name: validateField('name', formData.name),
        email: validateField('email', formData.email),
        message: validateField('message', formData.message),
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((err) => err)) {
        return;
      }

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    [formData, validateField]
  );

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <SectionHeader
          tag="Contact"
          title="Questions? We actually reply."
          subtitle="Our team usually replies within 6 hours during normal business hours."
        />
        <div className="contact-wrapper">
          <ScrollReveal>
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <div className="info-item" key={index}>
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-text">
                    <h4>{info.label}</h4>
                    <p>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name ? 'error' : ''}
                  required
                />
                <span className="error-msg">{errors.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email ? 'error' : ''}
                  required
                />
                <span className="error-msg">{errors.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What do you want to learn? What's your background?"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.message ? 'error' : ''}
                  required
                />
                <span className="error-msg">{errors.message}</span>
              </div>
              <Button type="submit" variant="primary" className="btn-full" isLoading={isSubmitting}>
                Send Message
              </Button>
              <div className={`form-success ${showSuccess ? 'show' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Message sent. We will be in touch soon.
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
