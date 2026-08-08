import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { AboutMainBanner, AboutSubBanner } from '../assets/about';
import FAQAccordion from '../component/about/FAQAccordion';

export default function AboutPage() {
  return (
    <div className='w-full bg-white font-sans'>
      {/* Hero Banner */}
      <div className='relative w-full h-64 bg-dark overflow-hidden before:absolute before:inset-0 before:bg-black/50 before:content-[""]'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `url(${AboutMainBanner})`,
            opacity: 0.7,
          }}
        ></div>
        <div className='relative container mx-auto px-6 h-full flex items-center'>
          <h1 className='text-4xl font-bold font-heading text-white'>
            About Our Company
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-12'>
        <div className='flex flex-col lg:flex-row gap-12'>
          {/* Left Column - Company Story */}
          <div className='w-full'>
            <h2 className='text-3xl font-heading font-bold text-dark mb-6'>
              Our story
            </h2>

            <p className='text-body mb-6'>
              GIGABULL Is Committed To Delivering Premium Genuine Leather Products That Blend Style, Durability, And Craftsmanship. We Take Pride In Offering Luxurious Leather Goods At Pocket- Friendly Prices. Whether You're Looking For Wallets, Clutches, Or Laptop Bags, Our Collection Is Designed To Meet Your Needs.
            </p>

            {/* Leather Products Image */}
            <div className='my-8'>
              <img
                src={AboutSubBanner}
                alt='GIGABULL Leather Products Collection'
                className='w-full h-auto rounded-md'
              />
            </div>

            {/* Bullet Points */}
            <div className='space-y-4 my-8'>
              {[
                'We use only genuine leather for a luxurious feel and long-lasting durability.',
                'Every product is handmade by skilled artisans with precision and care.',
                'Get high-quality leather products at pocket-friendly prices without compromise.',
              ].map((bp, i) => (
                <div key={i} className='flex items-start'>
                  <Check
                    className='text-primary mr-2 mt-1 flex-shrink-0'
                    size={20}
                  />
                  <p className='text-body'>{bp}</p>
                </div>
              ))}
            </div>

            {/* Key Features Section */}
            <div className='mt-12'>
              <h2 className='text-3xl font-heading font-bold text-dark mb-8'>
                Key Features of GIGABULL:
              </h2>

              {/* Features Table */}
              <div className='w-full'>
                <div className='flex flex-col space-y-4'>
                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Name of Business:
                    </div>
                    <div className='w-full  sm:w-3/5'>
                      Shivansh International
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Nature of Business:
                    </div>
                    <div className='w-full  sm:w-3/5'>
                      Manufacturer, Exporter And Supplier
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Year of Establishment:
                    </div>
                    <div className='w-full sm:w-3/5'>2022</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      No. of Employees:
                    </div>
                    <div className='w-full sm:w-3/5'>100</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      No. of Designers:
                    </div>
                    <div className='w-full sm:w-3/5'>02</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Monthly Production Capacity:
                    </div>
                    <div className='w-full sm:w-3/5'>
                      20000 To 50000 Pieces Of Every Product
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Working As Original Equipment:
                    </div>
                    <div className='w-full sm:w-3/5'>Yes</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Banker:
                    </div>
                    <div className='w-full sm:w-3/5'>HDFC Bank</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Legal Status of The Firm:
                    </div>
                    <div className='w-full sm:w-3/5'>Proprietorship Firm</div>
                  </div>

                  <div className='flex flex-col sm:flex-row border-b border-gray-200 pb-4'>
                    <div className='w-full sm:w-2/5 text-xl underline font-semibold'>
                      Export Percentage:
                    </div>
                    <div className='w-full sm:w-3/5'>100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
