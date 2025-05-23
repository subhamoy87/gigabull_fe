// Mens Products
import LaptopBag1 from '../assets/category/mens-products/Laptop-Bag-1.webp';
import LaptopBag2 from '../assets/category/mens-products/Laptop-Bag-2.webp';
import LaptopBag3 from '../assets/category/mens-products/Laptop-Bag-3.webp';

// Womens Products
import WomensWallet1 from '../assets/category/womens-products/Womens-Wallet-1.webp';
import WomensWallet2 from '../assets/category/womens-products/Womens-Wallet-2.webp';
import WomensWallet3 from '../assets/category/womens-products/Womens-Wallet-3.webp';

//  Accessories Products
import LeatherLuggageBag1 from '../assets/category/accessories-products/Leather-Luggage-Bag-1.webp';
import LeatherLuggageBag2 from '../assets/category/accessories-products/Leather-Luggage-Bag-2.webp';
import LeatherLuggageBag3 from '../assets/category/accessories-products/Leather-Luggage-Bag-3.webp';
import LeatherLuggageBag4 from '../assets/category/accessories-products/Leather-Luggage-Bag-4.webp';

const productsData = [
  {
    category: "Men's Collection",
    products: [
      {
        name: 'Lion Embossed Leather Wallet',
        slug: 'lion-embossed-leather-wallet',
        tags: ['wallet', 'lion', 'embossed', 'leather'],
        images: [LaptopBag1, LaptopBag2, LaptopBag3],
        details: {
          model_no: 'GB-1113',
          pattern: 'Animal Print',
          card_slots: 9,
          cash_compartments: 2,
          material: 'Genuine Oily Hunter Leather',
          color: 'Dark Brown',
          dimension: '12.5 x 9.5 x 2 cm',
          lining: 'Poly Drill',
          description:
            'This wallet is a premium blend of elegance and durability, crafted from genuine oily hunter leather in a rich dark brown shade. Its striking animal print pattern adds a unique, rugged charm, making it a standout accessory for those who value both style and function. The high-quality leather ensures a soft yet sturdy feel, promising long-lasting use with a refined touch. Designed for efficiency, this wallet features 9 dedicated card slots and 2 spacious cash compartments, offering ample storage while maintaining a sleek profile. With dimensions of 12.5 x 9.5 x 2 cm and a durable poly drill lining, it is the perfect everyday wallet for modern individuals.',
        },
      },
    ],
  },

  {
    category: "Women's Collection",
    products: [
      {
        name: 'Multicolor Women’s Genuine Leather Wallet',
        slug: 'multicolor-womens-genuine-leather-wallet',
        tags: [
          'wallet',
          'genuine leather',
          'multicolor',
          'women',
          'soft texture',
        ],
        images: [WomensWallet1, WomensWallet2, WomensWallet3],
        details: {
          model_name: 'Women Genuine Leather Wallet',
          features:
            'Leather with nice and smooth texture, really soft to touch. It is a decent basic wallet, without bulk. This classic wallet will show your style every time you pull it out.',
          card_slots: 10,
          material: 'Genuine Leather',
          color: 'Multicolor',
          description:
            'Crafted from premium genuine leather, this stylish wallet boasts a smooth, soft texture for a luxurious feel. Designed for both elegance and convenience, it features a sleek, non-bulky design while offering ample storage. With 10 card slots, it keeps your essentials neatly organized. The refreshing sky blue color adds a touch of sophistication, making it a perfect everyday accessory. Timeless and versatile, this classic wallet enhances your style with effortless charm.',
        },
      },
    ],
  },
  {
    category: 'Accessories',
    products: [
      {
        name: 'Brown Genuine Leather Luggage Bag',
        slug: 'brown-genuine-leather-luggage-bag',
        tags: [
          'luggage',
          'genuine leather',
          'brown',
          'GIGABULL',
          'travel',
          'bag',
        ],
        images: [
          LeatherLuggageBag1,
          LeatherLuggageBag2,
          LeatherLuggageBag3,
          LeatherLuggageBag4,
        ],
        details: {
          model_no: 'GB-1505',
          pattern: 'Solid',
          material: 'Genuine Leather',
          color: 'Brown',
          description:
            'Crafted from premium genuine leather, the GIGABULL GB-1505 luggage bag is designed for durability, style, and practicality. Its solid pattern and rich brown color give it a timeless and sophisticated look, making it ideal for both business and leisure travel. Built for convenience, this spacious bag offers ample room for all your essentials while maintaining a sleek and elegant profile. Whether you’re heading for a weekend getaway or a business trip, this leather luggage bag ensures a perfect blend of luxury and functionality.',
        },
      },
    ],
  },
];

export default productsData;
