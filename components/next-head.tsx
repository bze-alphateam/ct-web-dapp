import Head from 'next/head';

export const NextHead = () => {
  
    return (
        <Head>
          <title>CoinTrunk App</title>
          <meta name="description" content="CoinTrunk Decentralized App - serving decentralized content" />
          <link rel="icon" href="/cointrunk-16px.png" />
        </Head>
    );
}