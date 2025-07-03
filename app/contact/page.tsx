'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I&apos;ll get back to you soon.');
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section">
      <Toaster position="top-center" />
      <div className="grid-container">
        <div className="grid">
          {/* Left Column */}
          <div className="grid-cell span-5" style={{ background: 'transparent', border: 'none', padding: '16px' }}>
            <h2 className="text-heading-32" style={{ marginBottom: '32px' }}>Let&apos;s Build.</h2>
            <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
              Have a project in mind, a complex problem, or a bottleneck that needs a system-driven solution? I&apos;m available for new opportunities.
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-title">Current Status</span>
                <div className="code-dots"><div className="code-dot"></div><div className="code-dot"></div><div className="code-dot"></div></div>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                const danny = &#123;<br />
                &nbsp;&nbsp;status: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>&quot;available&quot;</span>,<br />
                &nbsp;&nbsp;focus: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>&quot;AI &amp; Automation&quot;</span>,<br />
                &nbsp;&nbsp;location: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>&quot;Calgary, AB&quot;</span>,<br />
                &#125;;
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-cell span-7">
            <h1 className="text-heading-32" style={{ marginBottom: '24px' }}>Get In Touch</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="name" className="text-label-14" style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.9)' }}>
                Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="form-input"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                }}
                placeholder="Your name"
              />
              {errors.name && (
                <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '4px' }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="email" className="text-label-14" style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.9)' }}>
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="form-input"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                }}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '4px' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="message" className="text-label-14" style={{ display: 'block', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.9)' }}>
                Message *
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  resize: 'vertical',
                  minHeight: '120px',
                }}
                placeholder="Tell me about your project, timeline, and any specific requirements..."
              />
              {errors.message && (
                <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '4px' }}>
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
