import {CodeMajor} from '@shopify/polaris-icons';

export const LOGO_ALI_REVIEWS = 'https://cdn1.avada.io/joy/alireview-logo.jpeg';
export const LOGO_RYVIU = 'https://cdn1.avada.io/joy/ryviu-logo.png';
export const LOGO_JUDGE_ME = 'https://cdn1.avada.io/joy/judgeme-logo.png';
export const LOGO_AVADA = 'https://cdn1.avada.io/joy/avada-logo.png';
export const LOGO_LOOX = 'https://cdn1.avada.io/joy/loox-logo.png';
export const LOGO_YOTPO = 'https://cdn1.avada.io/joy/yotpo-logo-v3.svg';
export const LOGO_STAMPED = 'https://cdn1.avada.io/joy/stamped-logo.svg';
export const LOGO_PAGE_FLY = 'https://cdn1.avada.io/joy/page_fly.webp';

export const INTEGRATION_CATEGORY_SAMPLE_1 = 'sample_1';
export const INTEGRATION_CATEGORY_SAMPLE_2 = 'sample_2';
export const INTEGRATION_CATEGORY_SAMPLE_3 = 'sample_3';
export const INTEGRATION_CATEGORY_SAMPLE_4 = 'sample_4';

export const integrationCategories = [
  {value: INTEGRATION_CATEGORY_SAMPLE_1, label: 'Sample 1'},
  {value: INTEGRATION_CATEGORY_SAMPLE_2, label: 'Sample 2'},
  {value: INTEGRATION_CATEGORY_SAMPLE_3, label: 'Sample 3'},
  {value: INTEGRATION_CATEGORY_SAMPLE_4, label: 'Sample 4'}
];

export const integrationApps = [
  {
    title: 'Sample title 1',
    description: `Sample description 1`,
    url: '/integrations/sample',
    icon: CodeMajor,
    button: 'Sample button 1 ',
    category: INTEGRATION_CATEGORY_SAMPLE_1,
    externalUrl: 'https://apps.shopify.com/partners/avada',
    usefulLinks: [
      {
        title: 'Integrate with Judge.me Product Reviews',
        url: 'https://help.avada.app/joy/how-to-connect-with-Judgeme'
      }
    ],
    tags: ['Product Reviews']
  },
  {
    title: 'Sample title 2',
    description: `Sample description 2`,
    url: '/integrations/avada',
    img: LOGO_AVADA,
    category: INTEGRATION_CATEGORY_SAMPLE_2
  },
  {
    title: 'Sample title 3',
    description: `Sample description 3`,
    url: '/integrations/judge-me',
    img: LOGO_JUDGE_ME,
    category: INTEGRATION_CATEGORY_SAMPLE_3
  },
  {
    title: 'Sample title 4',
    description: `Sample description 4`,
    url: '/integrations/ryviu',
    img: LOGO_RYVIU,
    category: INTEGRATION_CATEGORY_SAMPLE_4
  },
  {
    title: 'Sample title 5',
    description: `Sample description 5`,
    url: '/integrations/ali-reviews',
    img: LOGO_ALI_REVIEWS,
    category: INTEGRATION_CATEGORY_SAMPLE_1
  },
  {
    title: 'Sample title 6',
    description: `Sample description 6`,
    url: '/integrations/loox',
    img: LOGO_LOOX,
    category: INTEGRATION_CATEGORY_SAMPLE_2
  },
  {
    title: 'Sample title 7',
    description: `Sample description 7`,
    url: '/integrations/yotpo',
    img: LOGO_YOTPO,
    category: INTEGRATION_CATEGORY_SAMPLE_3
  },
  {
    title: 'Sample title 8',
    description: `Sample description 8`,
    url: '/integrations/stamped',
    img: LOGO_STAMPED,
    category: INTEGRATION_CATEGORY_SAMPLE_4
  },
  {
    title: 'Sample title 9',
    description: `Sample description 9`,
    url: '/integrations/page-fly',
    img: LOGO_PAGE_FLY,
    category: INTEGRATION_CATEGORY_SAMPLE_1
  }
]
  .filter(x => !x.disabled)
  .sort((a, b) => {
    if (!a.status && !b.status) if (!a.status) return 0;
    if (!a.status) return -1;
    if (!b.status) return 1;
    return 0;
  });

export const getIntAppByUrl = url => integrationApps.find(app => app.url === url);
