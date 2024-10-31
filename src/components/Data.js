import { VscAccount } from 'react-icons/vsc';
import {
  MdOutlineReviews,
  MdProductionQuantityLimits,
  MdPayment,
} from 'react-icons/md';
import { LuClipboardList } from 'react-icons/lu';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import {
  TbBrandRadixUi,
  TbTruckDelivery,
  TbCategoryPlus,
} from 'react-icons/tb';

export const adminMenuList = [
  {
    title: 'MANAGE_ACCOUNT',
    name: 'Manage Account',
    icon: VscAccount,
  },
  {
    title: 'ALL_ORDER',
    name: 'All Order',
    icon: LuClipboardList,
  },
  {
    title: 'MY_REVIEW',
    name: 'My Product Review',
    icon: MdOutlineReviews,
  },
  {
    title: 'PAYMENT_METHODS',
    name: 'Saved Payment Methods',
    icon: MdPayment,
  },
  {
    title: 'KNOWLEDGE',
    name: 'Help & Knowledge',
    icon: RiQuestionAnswerLine,
  },
  {
    title: 'CATEGORY',
    name: 'Create Category',
    icon: TbCategoryPlus,
  },
  {
    title: 'COMPANY',
    name: 'Create Company',
    icon: TbBrandRadixUi,
  },
  {
    title: 'PRODUCT',
    name: 'Create Product',
    icon: MdProductionQuantityLimits,
  },
  {
    title: 'DELIVERY_CHARGE',
    name: 'Delivery Charge',
    icon: TbTruckDelivery,
  },
];

export const productData = [
  {
    id: 1,
    name: 'Ray-Ban Wayfarer',
    price: 150,
    category: 'Sunglasses',
    company: 'Ray-Ban',
  },
  {
    id: 2,
    name: 'Oakley Holbrook',
    price: 130,
    category: 'Sunglasses',
    company: 'Oakley',
  },
  {
    id: 3,
    name: 'Essilor Eyezen',
    price: 200,
    category: 'Power Glasses',
    company: 'Essilor',
  },
  {
    id: 4,
    name: 'Zeiss DuraVision',
    price: 180,
    category: 'Power Glasses',
    company: 'Zeiss',
  },
  {
    id: 5,
    name: 'Baby Banz',
    price: 40,
    category: 'Baby Sunglasses',
    company: 'Baby Banz',
  },
  {
    id: 6,
    name: 'Babiators Sunglasses',
    price: 45,
    category: 'Baby Sunglasses',
    company: 'Babiators',
  },
  {
    id: 7,
    name: 'Fendi Cat-Eye',
    price: 300,
    category: 'Ladies Glasses',
    company: 'Fendi',
  },
  {
    id: 8,
    name: 'Chanel Oval',
    price: 280,
    category: 'Ladies Glasses',
    company: 'Chanel',
  },
  {
    id: 9,
    name: 'Acuvue Oasys',
    price: 50,
    category: 'Lenses',
    company: 'Acuvue',
  },
  {
    id: 10,
    name: 'Biofinity',
    price: 55,
    category: 'Lenses',
    company: 'Biofinity',
  },
];

export const SliderData = [
  {
    image: '1.jpg',
  },
  {
    image: '2.jpg',
  },
  {
    image: '3.jpg',
  },
  // Add more images as needed
];
export const footerMenu = [
  {
    title: '/about_us/#top',
    name: 'About Us',
  },
  {
    title: '/contact/#top',
    name: 'Contact',
  },
  {
    title: '/privacy_policy/#top',
    name: 'Privacy Policy',
  },
  {
    title: '/data_policy/#top',
    name: 'Data Policy',
  },
  {
    title: '/terms_and_condition',
    name: 'Terms & Condition',
  },
  {
    title: '/return_policy',
    name: 'Return Policy',
  },
  {
    title: '/faq',
    name: 'FAQ',
  },
  {
    title: '/help',
    name: 'Help',
  },
];
