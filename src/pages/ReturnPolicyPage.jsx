import React from 'react';
import { CommonReturnImg } from '../assets/common';

const ReturnPolicyPage = () => {

  return (
    <div className='w-full font-sans bg-white text-[#333333]'>
      <section className='relative w-full h-64 bg-[#1e293b] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:content-[""]'
          style={{
            backgroundImage: `url(${CommonReturnImg})`,
          }}
        ></div>
        <div className='relative container mx-auto px-6 h-full flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-white text-center text-shadow-2xs w-full font-heading'>
            Return and Exchange Policy
          </h1>
        </div>
      </section>

      <section className='px-6 md:px-12 py-10 space-y-6 text-[18px] leading-relaxed'>
        <p className='font-extrabold text-lg text-[#1e293b]'>
          We want you to be happy with your products. Your satisfaction is our
          reward!
        </p>

        <p>
          Shivansh International accepts the return of products only restricted to
          order deals among merchant and customer. This solitary involves deals
          on the web, and not through retail outlets.
        </p>

        <p>
          Any item that has been hampered or harmed while transportation must be
          told by email within 48 hours of the item being delivered and returned
          back to our distribution center inside a precise time-frame of one
          week, else Shivansh International won’t be at risk to acknowledge the
          product. In such cases, the client should send an email to
          <a
            href='mailto:admin@gigabull.in'
            className='text-blue-600 font-medium ml-1'
          >
            admin@gigabull.in
          </a>{' '}
          /
          <a
            href='mailto:admin.shivansh@gmail.com'
            className='text-blue-600 font-medium ml-1'
          >
            admin.shivansh@gmail.com
          </a>{' '}
          and a quick response is ensured from our end. We will examine the harm
          from our end and fix the merchandise in its entirety.
        </p>

        <p>
          ALL dispatches of this nature will be borne by the actual client.
          Shivansh International will just bear the costs of the exchange after
          the maintenance of the product.
        </p>

        <p>
          In cases wherein due to usage of the merchandise, some part of the
          product is damaged, such as hardware – locks, studs, screws, buckles,
          straps, will only be repaired within a period of two weeks from the
          time of receipt of the merchandise after dispatch from our warehouse.
        </p>

        <p>
          Please note, damaged products specific to repair will have to be
          couriered back to our warehouse wherein all costs will be borne by the
          customer themselves. Shivansh International will only bear the expenses
          of the transaction after the repair of the merchandise.
        </p>

        <h2 className='font-extrabold text-lg text-[#1e293b]'>
          Exchange or Return Terms & Conditions
        </h2>

        <p>
          All exchanges and returns would need to be raised within one week of
          the invoice date for Indian orders, and 20 days for overseas orders.
        </p>

        <p>
          For whatever reason that you are not satisfied, we would be most happy
          to provide exchanges and returns for all items purchased from us if
          the following conditions are met:
        </p>

        <ul className='list-disc pl-6 space-y-1'>
          <li>
            All items must be in their original packaging with product tags
            intact
          </li>
          <li>
            All items must be unworn, unused, unwashed, and in the same original
            condition
          </li>
          <li>Leather Bags should have no scuff marks on same outside</li>
          <li>Original receipts would need to be included</li>
          <li>All items would need to be purchased originally from India</li>
        </ul>

        <p>
          If none of the above conditions are met, we regret to inform you that
          we are unable to process any claims for exchanges or refund regardless
          that the items have been mailed back to us.
        </p>

        <h2 className='font-extrabold text-lg text-[#1e293b]'>
          Exchange or Return Required Detail
        </h2>

        <p>
          You will need to include your original invoice together with the
          item(s) in its original condition and packaging.
        </p>

        <p>
          Kindly print and fill up the Exchange/Return Request Form here and
          follow the steps indicated in the form for your exchange.
        </p>

        <p className='font-extrabold text-lg'>
          Mail us your parcel via a traceable mode of postage.
        </p>

        <p>
          Wait for our email confirmation and you will be notified. Generally,
          the processing period is 5 working days upon receipt of your parcel.
        </p>

        <p>
          No refunds will be given for taxes, duties, tariffs and excise charges
          levied for overseas orders either for refunds or exchanged items.
        </p>

        <p>
          All returns and exchanges made via online portal at{' '}
          <a
            href='https://www.gigabull.in'
            target='_blank'
            className='text-blue-600 underline'
          >
            www.gigabull.in
          </a>{' '}
          would need to be shipped to:
        </p>

        <address className='space-y-4 text-[#1e293b] font-extrabold text-lg not-italic mt-6'>
          <p>Shivansh International</p>
          <p>
            P-68, Sector-A, Metropolitan, Co-Operative Housing Society Ltd,
            <br /> Canal South Road, Kolkata – 700105
          </p>
          <p>Tel: +91-9874525414</p>
          <p>
            Email:
            <a href='mailto:admin@gigabull.in' className='ml-1 text-blue-600'>
              admin@gigabull.in
            </a>{' '}
            /
            <a
              href='mailto:admin.shivansh@gmail.com'
              className='ml-1 text-blue-600'
            >
              admin.shivansh@gmail.com
            </a>
          </p>
        </address>
      </section>
    </div>
  );
};

export default ReturnPolicyPage;
