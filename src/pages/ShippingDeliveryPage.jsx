import React from 'react';
import { CommonShippingDeliveryImg } from '../assets/common';

const ShippingDeliveryPage = () => {

  return (
    <div className='w-full font-sans bg-white text-[#2d2d2d]'>
      <section className='relative w-full h-64 bg-[#1e293b] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:content-[""]'
          style={{
            backgroundImage: `url(${CommonShippingDeliveryImg})`,
          }}
        ></div>
        <div className='relative container mx-auto px-6 h-full flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-white text-center text-shadow-2xs w-full font-heading'>
            Shipping & Delivery
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className='container mx-auto py-10 px-6 text-[18px] leading-relaxed space-y-6'>
        <p>
              Shipment or Delivery charges being calculated based on the additive
              weight of the whole order and are different for domestic and
              international delivery. Delivery charges may be nil for certain
              products or some nominal charges are levied.
            </p>
            <p>
              Due to any miscommunication or event that a non-delivery occurs on
              account of a mistake by you (i.e. wrong name, address, or contact
              number), any extra cost towards re-delivery shall be claimed by the
              user placing the order.
            </p>
            <p>
              Shipment/delivery time, of the order processing, starts from the day
              of receipt of the payment confirmed against the order placed with
              Shivansh International.
            </p>
            <p>
              Shipment/delivery time for a product depends on the time taken to
              procure the item, time taken to ship the item by courier service,
              location of the product, and location of the customer. Depending on
              all this an estimated delivery time frame will be given to the
              customer. Shivansh International shall not be liable for any delay /
              non-delivery of purchased goods by flood, fire, wars, acts of God or
              any cause that is beyond the control of Shivansh International.
            </p>
            <p>
              The client should consent to give valid and genuine data, to stay away
              from any sort of postponement or loss of merchandise. Shivansh
              International reserves the right to confirm and validate the information
              and other details provided by the user at any point of time. If upon
              confirmation, such user details are found not true (wholly or partly),
              Shivansh International has the right in its sole discretion to reject
              the registration and debar the user from using the services available
              at this website, and/or other affiliated websites without prior
              intimation whatsoever.
            </p>
            <p className='font-bold text-[#1f1f1f]'>
              All Duties and taxes for international shipping shall be ensured by
              the customer. Shivansh International is not liable to pay any Duties or
              Taxes for International Shipping.
            </p>
      </section>
    </div>
  );
};

export default ShippingDeliveryPage;
