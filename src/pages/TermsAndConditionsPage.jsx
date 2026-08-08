import React from 'react';
import { CommonTermsConditionsImg } from '../assets/common';

const TermsAndConditionsPage = () => {

  return (
    <div className='w-full bg-white text-[#2d2d2d] font-sans'>
      <section className='relative w-full h-64 bg-[#1e293b] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:content-[""]'
          style={{
            backgroundImage: `url(${CommonTermsConditionsImg})`,
          }}
        ></div>
        <div className='relative container mx-auto px-6 h-full flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-white text-center text-shadow-2xs w-full font-heading'>
            Terms and Conditions
          </h1>
        </div>
      </section>

      <section className='container mx-auto py-10 px-6 space-y-6 text-[18px] leading-loose'>
        <p>
          This website is operated by Shivansh International. Throughout the site,
          the terms “we”, “us” and “our” refer to Shivansh International. Shivansh
          International offers this website, including all information, products
          and services available from this site to you, the user, conditioned
          upon your acceptance of all terms, conditions, policies and notices
          stated here.
        </p>

        <p>
          By visiting our site and/or purchasing something from us, you engage
          in our “Service” and agree to be bound by the following terms and
          conditions (“Terms of Service”, “Terms”), including those additional
          terms and conditions and policies referenced herein and/or available
          by hyperlink. These Terms of Service apply to all users of the site,
          including without limitation users who are browsers, vendors,
          customers, merchants, and/or contributors of content.
        </p>

        <p>
          Please read these Terms of Service carefully before accessing or using
          our website. By accessing or using any part of the site, you agree to
          be bound by these Terms of Service. If you do not agree to all the
          terms and conditions of this agreement, then you may not access the
          website or use any services. If these Terms of Service are considered
          an offer, acceptance is expressly limited to these Terms of Service.
        </p>

        <p>
          Privacy Policy, and our Returns Policy (collectively our “Website
          Conditions”), as well as any other laws or regulations which apply to
          this website. In addition, when you make an enquiry or order any
          products or services through this website, you will do so subject to
          the terms and conditions on this page, as set out in our online
          customer terms & conditions, subject to all our other website
          conditions and such further terms and conditions as may be notified to
          you. By using this website, you acknowledge that you have read and
          understood all of the website conditions and agree to be bound by
          them. However, if you do not or cannot accept our website conditions
          in totality and without modification, you must stop using our website
          immediately. We may revise and update our website conditions at any
          time and your continued usage of this website means you accept those
          changes. While Shivansh International aims to ensure that the
          information in this website is correct, sometimes errors do occur for
          which we apologize. Please refer back to these website terms &
          conditions of use from time to time so that you are aware of the
          revised and current terms and conditions. The User certifies that
          he/she is at least 18 (eighteen) years of age or has the consent of a
          parent or legal guardian. All prices, unless indicated otherwise are
          in Indian Rupees.
        </p>
        <p>
          By indicating user’s acceptance to purchase any product or service
          offered on the site, the user is obligated to complete such
          transactions. Users shall prohibit from indicating its acceptance to
          purchase products and services where it does not intend to complete
          such transactions.
        </p>
        <p>
          In a credit card transaction, you must use your own credit card.
          Shivansh International will not be liable for any credit card fraud. The
          liability to use a card fraudulently will be on the user and the onus
          to ‘prove otherwise’ shall be exclusively on the user.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>Product Prices</h2>
        <p>
          All references to the Rupee on this website are in Indian currency.
          Prices are subject to change at any time, without any notifications.
          Prices of products available at retail outlets are only available
          within India.
        </p>
        <p>
          Prices of products available at retail outlets are only available
          within India.
          <br />
          No product can be sold for Indian prices outside the country.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Shipping & Delivery
        </h2>
        <p>
          Shipping costs are calculated based on the cumulative weight of the
          entire order and are different for domestic and international
          delivery.
        </p>
        <p>
          In the event that a non-delivery occurs on account of a mistake by you
          (i.e. wrong name, address, or contact number) any extra cost towards
          re-delivery shall be claimed by the user placing the order.
        </p>
        <p>
          Shipment/delivery time, of the order processing starts from the day of
          receipt of the payment confirmed against the order placed with
          Shivansh International. The shipment /delivery time is an approximate
          time mentioned by the vendor against each product. Shivansh
          International shall not be liable for any delay / non-delivery of
          purchased goods by flood, fire, wars, acts of God or any cause that is
          beyond the control of Shivansh International.
        </p>
        <p>
          The user must agree to provide authentic and true information, to
          avoid any kind of delay or loss of merchandise. Shivansh International
          reserves the right to confirm and validate the information and other
          details provided by the user at any point in time. If upon
          confirmation, such user details are found not true (wholly or partly),
          Shivansh International has the right in its sole discretion to reject
          the registration and debar the user from using the services available
          at this website, and/or other affiliated websites without prior
          intimation whatsoever.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Returns & Exchanges
        </h2>
        <p>
          Shivansh International acknowledges return of products only limited to
          direct sale between vendor and consumer. This only entails sales
          online, and not through retail outlets.
          <br />
          Any product that has been hampered or damaged while transportation
          must be notified by email within 48 hours of the product being
          delivered and returned to our warehouse within a strict time period of
          one week, else Shivansh International will not be liable to accept the
          merchandise. In such cases, the customer will have to write into
          admin@gigabull.in/admin.shivansh@gmail.com and a prompt response
          is guaranteed from our end. We will investigate the damage from our
          end and repair the merchandise in its entirety.
          <br />
          ALL couriers of this nature will be borne by the customer themselves.
          Shivansh International will only bear the expenses of the transaction
          after the repair of the merchandise.
        </p>
        <p>
          In cases wherein due to usage of the merchandise, some part of the
          product is damaged, such as hardware – locks, studs, screws, buckles,
          straps, will only be repaired within a period of two weeks from the
          time of receipt of the merchandise after dispatch from our warehouse.
          <br />
          Please note, damaged products specific to repair will have to be
          couriered back to our warehouse wherein all costs will be borne by the
          customer themselves. Shivansh International will only bear the expenses
          of the transaction after the repair of the merchandise.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>Cancellation</h2>
        <p>
          After having placed their order, customers may cancel their order only
          if the order has not been dispatched yet. We do not accept any
          cancellation on orders after the product has been dispatched from our
          warehouse.
          <br />
          In case of cancellation, there is no credit refund given on the
          purchase amount, but you may exchange it for another product(s) of the
          same or higher value by paying the remainder. You may also opt for
          store credit to be added to your account against the returned order,
          which you can use to shop online, within the duration of validity of
          the store credit. The store credit can also be redeemed at any of the
          Shivansh International brick & mortar stores.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Color Variations / Wear & Tear
        </h2>
        <p>
          <span className='font-extrabold text-lg'>Leather :</span> Reproduction
          of colors is as accurate as possible, although please note, colors
          available at the stores may vary slightly from what is displayed on
          your monitor. Also, leather is a natural material and a slight
          variation is bound to appear in each item.
        </p>
        <p>
          <span className='font-extrabold text-lg'>
            Digital Printing on leather :
          </span>
          Some of our items such as wallets and small leather products have
          digital printing on leather . As the inks used for printing react
          differently on each skin , slight variations might occur. Also
          hairline cracks might be visible over time due to general use . These
          are not defects but enhance the look and feel of our products over
          time.
        </p>
        <p>
          <span className='font-extrabold text-lg'>Fabric : </span>
          Some products have digital printing on fabric on which slight
          variation might occur in different parts or patches. This is a general
          property of the fabric which cannot be controlled.
        </p>
        <p>
          <span className='font-extrabold text-lg'>Powder Coating : </span>
          Some products in our range would have the use of powder coating on
          them , mainly luggage and trunks. Powder coated products are
          susceptible to scratches and chipping over time. These products are
          not meant for heavy use.
        </p>
        <p>
          <span className='font-extrabold text-lg'>Hardware Color : </span>
          Some of the products with metal hardware might tarnish or lose its
          shine over time due to weather conditions and usage. These are changes
          which occur due to the varied use and handling of the product by the
          customer and cannot be held against the manufacturers.
        </p>
        <p>
          <span className='font-extrabold text-lg'>Scratches and Marks : </span>
          Scratches and marks on the leather surface are a part of the
          characteristics of the material. They do not qualify as defects. This
          can happen due to use over a period of time which enhances the look
          and feel of the product, adding to its vintage appeal. Some types of
          leather might have a slight patina on the surface due to usage and is
          the quality of the leather. Products are only designed seeing and
          keeping in mind all the above mentioned factors. Marks are common on
          leather as each skin is different to the other, as no two skins are
          the same. Please note, these are NOT considered as defects or rejects.
          Scratches and marks on the leather surface are a part of the
          characteristics of the material. They do not qualify as defects. This
          can happen due to use over a period of time which enhances the look
          and feel of the product, adding to its vintage appeal. Some types of
          leather might have a slight patina on the surface due to usage and is
          the quality of the leather. Products are only designed seeing and
          keeping in mind all the above mentioned factors. Marks are common on
          leather as each skin is different to the other, as no two skins are
          the same. Please note, these are NOT considered as defects or rejects.
        </p>

        <p className='font-extrabold text-lg'>
          NOTE : Color variation cannot be subject to rejection of goods or
          merchandise.
        </p>
        <p>
          All Shivansh International Products are dyed in Natural Vegetable Dyes,
          in accordance to International Standards.
        </p>

        <p>
          <span className='font-extrabold text-lg'>
            Defects and Scratches :{' '}
          </span>
          All Shivansh International products are hand crafted , hence no two
          products are identical in their absolute measurements. There might be
          a slight change, but minimal to the eye which therefore would not
          change the essence of the design.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Product Availability & Assembly
        </h2>
        <p>
          Due to popularity or short interruption of supply, some items may be
          unavailable or out of stock. Also at present, only a selection of our
          goods are available for online orders. We intend to extend this in the
          future to a much wider range. As our retail outlets vary in size, it
          is possible that not all items are displayed in all stores. Some items
          may require self-assembly. It may be necessary to make changes to
          product specifications. We reserve the right to make these changes at
          any time and without notice.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Warranty Disclaimer
        </h2>
        <p>
          This site and the materials and products on this site are provided “as
          is” and without warranty of any kind, whether express or implied. To
          the fullest extent permissible pursuant to applicable law, Shivansh
          International disclaims all warranties, express or implied, including,
          but not limited to, implied warranties of merchantability and fitness
          for a particular purpose and non-infringement. Shivansh International
          does not represent or warrant that the functions contained in the site
          will be uninterrupted or error-free, that the defects will be
          corrected, or that this site or the server that makes the site
          available are free of viruses or other harmful components. Shivansh
          International does not make any warranties or representations regarding
          the use of the materials in this site in terms of their correctness,
          accuracy, adequacy, usefulness, timeliness, reliability, or otherwise.
          Some states do not permit limitations or exclusions on warranties, so
          the above limitations may not apply to you.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>
          Liability of Shivansh International
        </h2>
        <p>
          Your use of this website or any information on this website is
          entirely at your own risk. Shivansh International makes no
          representation or warranty with respect to the accuracy, completeness,
          suitability, performance, or timeliness of the information provided on
          this website. Shivansh International excludes liability for any such
          inaccuracies or errors to the fullest extent permitted by law.
          <br />
          This website may contain links to other internet sites provided by
          third parties. The provision of any of these links does not represent
          an endorsement by Shivansh International of those internet sites, nor
          does Shivansh International make any representations or warranties as to
          the accuracy, completeness, performance, or timeliness of any aspect
          of information contained in those third party internet sites.
        </p>

        <h2 className='font-extrabold text-lg uppercase'>Copyright</h2>
        <p>
          This website and its contents are the property of Shivansh International
          and are subject to copyright. The contents of our website and the
          website as a whole are intended solely for your personal,
          non-commercial use. Any use of our website and its content for
          purposes other than personal and non-commercial use, or for any other
          use, including the modification, reproduction, distribution,
          transmission, republication, display, or performance, of the content
          and any such case or person can be prosecuted by law.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
