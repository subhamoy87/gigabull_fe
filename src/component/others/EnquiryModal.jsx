import React, { useState } from 'react';
import { ENQUIRY_API_URL } from '../../config/config';

export default function EnquiryModal({
  productName,
  productSlug,
  isOpen,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: `I'm interested in the product: ${productName}`,
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      productName,
      productSlug,
      ...formData,
    };

    try {
      const response = await fetch(`${ENQUIRY_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send enquiry');

      setSubmitStatus('Thank you! Your enquiry has been sent.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
      }, 3000);
    } catch (error) {
      setSubmitStatus('Error sending enquiry. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg p-6 w-full max-w-md relative'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-bold mb-4'>
          Send Enquiry for {productName}
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-semibold mb-1' htmlFor='name'>
              Your Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              required
              value={formData.name}
              onChange={handleInputChange}
              className='w-full border px-3 py-2 rounded'
            />
          </div>

          <div>
            <label className='block font-semibold mb-1' htmlFor='email'>
              Your Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              value={formData.email}
              onChange={handleInputChange}
              className='w-full border px-3 py-2 rounded'
            />
          </div>

          <div>
            <label className='block font-semibold mb-1' htmlFor='message'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows='4'
              required
              value={formData.message}
              onChange={handleInputChange}
              className='w-full border px-3 py-2 rounded'
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 rounded border'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded bg-[#424EA3] text-white'
            >
              Send
            </button>
          </div>

          {submitStatus && (
            <p
              className={`mt-2 text-sm ${
                submitStatus.startsWith('Thank')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {submitStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
