import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation();
  const productName = location.state?.productName || '';
  const productSlug = location.state?.productSlug || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: productName ? `Enquiry about: ${productName}` : '',
    phone: '',
    message: productName
      ? `I'm interested in ${productName} (slug: ${productSlug}). Please provide more details.`
      : '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch(`http://localhost:8080/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus({ loading: false, success: result.message, error: null });
        setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      } else {
        throw new Error(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus({ loading: false, success: null, error: error.message });
    }
  };

  return (
    <div className='w-full lg:w-1/2'>
      <h2 className='text-3xl font-bold text-[#1e293b] mb-4'>Get in touch</h2>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder='Your name'
            className='w-full border border-gray-800 px-4 py-2 rounded focus:outline-none focus:border-dashed'
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='w-full border border-gray-800 px-4 py-2 rounded focus:outline-none focus:border-dashed'
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <input
          type='text'
          name='subject'
          value={form.subject}
          onChange={handleChange}
          placeholder='Your subject'
          className='w-full border border-gray-800 px-4 py-2 rounded focus:outline-none focus:border-dashed'
        />

        <input
          type='tel'
          name='phone'
          value={form.phone}
          onChange={handleChange}
          placeholder='Phone'
          className='w-full border border-gray-800 px-4 py-2 rounded focus:outline-none focus:border-dashed'
        />

        <div>
          <textarea
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder='Message'
            rows='5'
            className='w-full border border-gray-800 px-4 py-2 rounded resize-none focus:outline-none focus:ring-1'
          ></textarea>
          {errors.message && (
            <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={status.loading}
          className='bg-black text-white w-full text-xl font-semibold py-2 px-6 rounded hover:bg-[#333]'
        >
          {status.loading ? 'Sending...' : 'Send'}
        </button>

        {status.success && (
          <p className='text-green-600 mt-2'>{status.success}</p>
        )}
        {status.error && <p className='text-red-600 mt-2'>{status.error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;