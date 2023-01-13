import { ArticleProps, PublisherProps, Info } from '../components';

export const publishers: PublisherProps[] = [
  {
    name: "Gigi de la coltz",
    address: "testbz1w9vva0muctcrmd9xgret9x4wasw2rrflsdkwfc",
    active: false,
    articles_count: 1,
    created_at: "1672447133",
    respect: "991300000"
  },
  {
    name: "BZE Alpha Team",
    address: "testbz1w9vva0muctcrmd9xgret9x4wasw2rrflsdkwfa",
    active: true,
    articles_count: 13,
    created_at: "1672447133",
    respect: "1200000001000000"
  },
  {
    name: "Osmosis Publisher",
    address: "testbz1w9vva0muctcrmd9xgret9x4wasw2rrflsdkwfb",
    active: true,
    articles_count: 57,
    created_at: "1672447133",
    respect: "800001000000"
  },
  {
    name: "Cosmos News Hub",
    address: "testbz1w9vva0muctcrmd9xgret9x4wasw2rrflsdkwfs",
    active: true,
    articles_count: 1,
    created_at: "1672447133",
    respect: "11902000000"
  },
]

export const articles: ArticleProps[] = [
  {
    id: "7",
    title: 'Osmosis Ecosystem Spotlight: Phase Finance - building automated investing strategies for Osmosis users: Phase DCA strategy',
    url: 'https://medium.com/osmosis/osmosis-ecosystem-spotlight-phase-finance-b3d565efe531',
    picture: 'https://miro.medium.com/max/720/0*yJUm_Jd0iKbDTPC5.webp',
    publisher: "Osmosis Announcer",
    paid: true,
    created_at: "1673295916"
  },
  {
    id: "6",
    title: 'Osmosis Ecosystem Spotlight: Laika - a request builder for smart contract developers, similar to popular web2 tools like cURL, Postman, Hoppscotch, and Insomnia',
    url: 'https://medium.com/osmosis/osmosis-ecosystem-spotlight-laika-5570f5268f5e',
    picture: 'https://miro.medium.com/max/720/1*VrScVeHybgDjF7L8o_aSdg.webp',
    publisher: "Osmosis Announcer",
    paid: true,
    created_at: "1673293316"
  },
  {
    id: "5",
    title: 'Trust is a must!',
    url: 'https://medium.com/bzedge-community/trust-is-a-must-96cac5de30d6',
    picture: 'https://miro.medium.com/max/720/1*LOIBWo-TQvMuWbiXFDGmVQ.webp',
    publisher: "Bob",
    paid: false,
    created_at: "1672867506"
  },
  {
    id: "4",
    title: 'BZE v5 testnet is up and running',
    url: 'https://medium.com/bzedge-community/bze-v5-testnet-is-up-and-running-fa7bd7e0ab7a',
    picture: 'https://medium.com/bzedge-community/bze-v5-testnet-is-up-and-running-fa7bd7e0ab7a',
    publisher: "Bob",
    paid: false,
    created_at: "1672867242"
  },
  {
    id: "3",
    title: 'new article without paying for it',
    url: 'https://medium.com/bzedge-community/introducing-cointrunk-2ed357a9f22b',
    picture: 'https://miro.medium.com/max/640/1*n6e1zf47c_zkusQffo5BcA.webp',
    publisher: "BZE Alpha Team",
    paid: false,
    created_at: "1672474398"
  },
  {
    id: "2",
    title: 'Introducing CoinTrunk - A BZE Product for the Cosmos!',
    url: 'https://medium.com/bzedge-community/introducing-cointrunk-2ed357a9f22b',
    picture: 'https://miro.medium.com/max/720/1*4wk9rqFkGcS3G4w5zDXW-Q.webp',
    publisher: "testbz1w9vva0muctcrmd9xgret9x4wasw2rrflsdkwfs",
    paid: true,
    created_at: "1672474233"
  },
];

export const infoGrid: Info[] = [
  {
    title: 'CoinTrunk is a decentralized App governed by BZE community. All articles are published under BZE blockchain & community rules. Read more about CoinTrunk!',
    url: 'https://medium.com/bzedge-community/introducing-cointrunk-2ed357a9f22b',
  },
  {
    title: 'Stay up to date with BZE & CoinTrunk news. Give our Medium articles a few minutes to find out more.',
    url: 'https://medium.com/bzedge-community',
  },
];
