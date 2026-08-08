import React from 'react';
import { CommonPrivacyImg } from '../assets/common';

const PrivacyPolicyPage = () => {

  return (
    <div className='w-full font-sans bg-white text-[#333333]'>
      <section className='space-y-6 text-[18px] leading-relaxed'>
        <section className='relative w-full h-64 bg-[#1e293b] overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:content-[""]'
            style={{
              backgroundImage: `url(${CommonPrivacyImg})`,
            }}
          ></div>
          <div className='relative container mx-auto px-6 h-full flex items-center justify-center'>
            <h1 className='text-4xl font-bold text-white text-center text-shadow-2xs w-full font-heading'>
              Privacy Policy
            </h1>
          </div>
        </section>

        <div className='container mx-auto py-10 space-y-6'>
          <p>
                This Privacy Policy describes how Shivansh International collects,
                uses, and shares your personal information when you visit or make a
                purchase from our website www.gigabull.in. We are committed to
                protecting your privacy and handling your data responsibly.
              </p>

              {/* Information We Collect */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Information We Collect
                </h2>
                <p>
                  When you visit the Site, we automatically collect certain
                  information about your device, including your IP address, web
                  browser, time zone, and some of the cookies that are installed on
                  your device. Additionally, when you make a purchase or attempt to
                  make a purchase, we collect information about you, including your
                  name, billing address, shipping address, email address, phone
                  number, and payment information. We may also collect information
                  you provide to us through forms on the Site, such as contact
                  forms.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to fulfill your orders,
                  communicate with you about your orders and our products,
                  personalize your experience on the Site, and improve our Site and
                  services. Specifically, we may use your information to:
                </p>
                <ul className='list-disc pl-6 mt-2 space-y-1'>
                  <li>Process and fulfill your orders.</li>
                  <li>Send you order confirmations and shipping updates.</li>
                  <li>Respond to your inquiries and requests.</li>
                  <li>Provide customer support.</li>
                  <li>
                    Send you marketing communications (if you have opted in to
                    receive them).
                  </li>
                  <li>
                    Improve the functionality and user experience of the Site.
                  </li>
                  <li>Analyze Site usage and trends.</li>
                  <li>Prevent and detect fraud.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </section>

              {/* Sharing Your Information */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Sharing Your Information
                </h2>
                <p>
                  We may share your information with third-party service providers
                  who help us operate our Site and fulfill your orders, such as
                  payment processors, shipping carriers, and marketing agencies. We
                  will never sell your personal information. We may also disclose
                  your information if required by law or legal process. We ensure
                  that our third-party service providers are contractually obligated
                  to protect your information and only use it for the purposes we
                  specify.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>Cookies</h2>
                <p>
                  We use cookies to collect information about your browsing activity
                  on the Site. Cookies are small text files that are stored on your
                  device. We use cookies to personalize your experience, remember
                  your preferences, and track Site usage. You can choose to disable
                  cookies in your browser settings, but this may affect the
                  functionality of the Site.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Data Retention
                </h2>
                <p>
                  We will retain your personal information for as long as necessary
                  to fulfill the purposes for which it was collected, including
                  fulfilling your orders, providing customer support, and complying
                  with legal obligations.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Your Rights
                </h2>
                <p>
                  You have the right to access, correct, and delete your personal
                  information. You also have the right to object to the processing
                  of your personal information. If you would like to exercise any of
                  these rights, please contact us at{' '}
                  <a href='mailto:admin@gigabull.in' className='text-blue-600'>
                    admin@gigabull.in
                  </a>{' '}
                  /{' '}
                  <a
                    href='mailto:admin.shivansh@gmail.com'
                    className='text-blue-600'
                  >
                    admin.shivansh@gmail.com
                  </a>
                  .
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Children’s Privacy
                </h2>
                <p>
                  Our Site is not intended for children under the age of 13. We do
                  not knowingly collect personal information from children under 13.
                  If you become aware that a child under 13 has provided us with
                  personal information, please contact us immediately.
                </p>
              </section>

              {/* Changes to this Privacy Policy */}
              <section>
                <h2 className='font-bold text-xl text-[#1e293b] mb-2'>
                  Changes to this Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes
                  will be posted on this page. We encourage you to review this
                  Privacy Policy periodically.
                </p>
              </section>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
