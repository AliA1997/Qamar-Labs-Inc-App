"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { MailService } from '@genezio/email-service';

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [submitMessage, setSubmitMessage] = useState('');

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Name must be 50 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Message is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus('submitting');
      setSubmitMessage('');

      try {
        debugger;
        // Prepare email data
        const response = await MailService.sendMail({
          emailServiceToken: process.env.NEXT_PUBLIC_EMAIL_SERVICE_TOKEN,
          from: values.email,
          to: process.env.NEXT_PUBLIC_MY_EMAIL,
          subject: `Message from this person regarding Qamar Labs: ${values.name}`,
          text: values.message
        });

        if (response.success) {
          setSubmitStatus('success');
          setSubmitMessage('Message sent successfully! We will get back to you within 48 hours.');
          resetForm();
        } else {
          setSubmitStatus('error');
          setSubmitMessage('Failed to send message. Please try again later.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setSubmitStatus('error');
        setSubmitMessage('An error occurred. Please try again later.');
      }
    }
  });

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-xs bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Contact Us
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                We will try our best to respond in 48 hours
              </p>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-xs">
                  {submitMessage}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-xs">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  {/* Name Field */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className={`border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                          }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="mt-1 text-sm text-red-500">{formik.errors.name}</div>
                      ) : null}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className={`border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                          }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className={`border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none ${formik.touched.message && formik.errors.message ? 'border-red-500' : ''
                          }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                      ></textarea>
                      {formik.touched.message && formik.errors.message ? (
                        <div className="mt-1 text-sm text-red-500">{formik.errors.message}</div>
                      ) : null}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;