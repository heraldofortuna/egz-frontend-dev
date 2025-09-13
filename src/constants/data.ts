import { DropdownData, MenuItem, MenuItems } from '@/types/components';

export const headerMainItem: MenuItem = {
  id: 'login',
  url: '/login',
  name: 'Ingresa',
  isUserAuth: false,
};

export const headerMenuItems: MenuItems = [
  {
    id: 'howToPlay',
    url: '/how-to-play',
    name: '¿Cómo jugar?',
    isUserAuth: false,
  },
  {
    id: 'about',
    url: '/about',
    name: 'Nosotros',
    isUserAuth: false,
  },
  {
    id: 'faq',
    url: '/faq',
    name: 'FAQ',
    isUserAuth: false,
  },
  {
    id: 'support',
    url: '/support',
    name: 'Soporte',
    isUserAuth: false,
  },
];

export const headerMenuMobileItems: MenuItems = [
  ...headerMenuItems,
  {
    id: 'termsAndConditions',
    url: '/terms-&-conditions',
    name: 'Términos y condiciones',
    isUserAuth: false,
  },
  {
    id: 'privatePolicies',
    url: '/private-policies',
    name: 'Políticas privadas',
    isUserAuth: false,
  },
];

export const footerMenuItems: MenuItems = [
  {
    id: 'termsAndConditions',
    url: '/terms-&-conditions',
    name: 'Términos y condiciones',
    isUserAuth: false,
  },
  {
    id: 'privatePolicies',
    url: '/private-policies',
    name: 'Políticas privadas',
    isUserAuth: false,
  },
  {
    id: 'joinUs',
    url: '/join-us',
    name: 'Únete a nosotros',
    isUserAuth: false,
  },
];

export const supportSubjectsList: DropdownData = [
  {
    id: 0,
    name: 'Seleccione un asunto',
  },
  {
    id: 1,
    name: 'Perdí mi teléfono',
  },
  {
    id: 2,
    name: 'Sobre el juego',
  },
  {
    id: 3,
    name: 'Otro',
  },
];
