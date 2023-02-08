import {
  Box,
  Divider,
  Grid,
  Container,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import {
  ArticleListItem,
  TitleBox,
  PageTitleProps,
  Navbar,
  NextHead,
  Footer,
  InfoGrid,
  DappWarning,
  Pagination
} from '../components';
import { infoGrid } from '../config';
import { QueryAllArticlesResponseSDKType } from '@bze/bzejs/types/codegen/beezee/cointrunk/query';
import { useEffect, useState } from 'react';
import { buildLimitPagination, getAllArticles } from '../components/services';
import { PageRequest } from '@bze/bzejs/types/codegen/cosmos/base/query/v1beta1/pagination';

const pageTitleBox: PageTitleProps = {
  title: 'Articles',
  subTitle: 'View latest',
  subTitleHighlighted: 'CoinTrunk articles'
}

export async function getServerSideProps(ctx: any) {
  const page  = ctx.query.page ?? 1;
  return {
    props: {
      page,
    },
  };
}

export default function Home({page}: {page: number}) {
  const [ isLoading, setLoading ] = useState(true)
  const [ articlesListResponse, setArticlesListResponse ] = useState<QueryAllArticlesResponseSDKType|null>(null)
  const [ currentPage, setCurrentPage ] = useState(page);
  const [ hasNextPage, setHasNextPage] = useState(true);
  const articlesLimit = 10;

  const loadArticles = async (pagination: PageRequest) => {
    let articles = await getAllArticles(pagination);
    if (typeof articles === 'undefined') {
      setArticlesListResponse(null);
      setLoading(false);
      return;
    }
    
    setArticlesListResponse(articles)
    setHasNextPage(articles.article.length >= articlesLimit);
    setLoading(false)
  }

  const onSubmitArticleSuccess = () => {
    setLoading(true);
    loadArticles();
  }

  const onBackPage = () => {
    if (currentPage <= 1) {
      return;
    }

    setLoading(true);
    setCurrentPage(currentPage - 1);
    loadArticles(buildLimitPagination(articlesLimit, (currentPage - 2) * articlesLimit));
  }

  const onNextPage = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
    loadArticles(buildLimitPagination(articlesLimit, currentPage * articlesLimit));
  }

  useEffect(() => {
    let offset = (currentPage - 1) * articlesLimit;
    loadArticles(buildLimitPagination(articlesLimit, offset));
  }, [])

  return (
    <Container maxW="7xl" py={5}>
      <NextHead></NextHead>
      <Navbar current='Articles' onSubmitArticleSuccess={onSubmitArticleSuccess}></Navbar>
      <TitleBox key={pageTitleBox.title} {...pageTitleBox} ></TitleBox>
      <DappWarning/>
      <Grid
        templateColumns={{
          md: 'repeat(1, 1fr)',
          lg: 'repeat(1, 1fr)'
        }}
        gap={8}
        mb={5}
        mt={5}
      >
        {
          isLoading ?
          (<Flex justifyContent={'center'}><Spinner size='xl' /></Flex>) : 
          (
            articlesListResponse?.article.map((article, arrIndex) => (
              <ArticleListItem key={arrIndex} {...article}></ArticleListItem>)
            )
          )
        }
      </Grid>
      <Box>
        <Pagination
          currentPage={currentPage}
          onBack={onBackPage}
          onForward={onNextPage}
          hasNext={hasNextPage}
        />
      </Box>
      <InfoGrid key='info-art' info={infoGrid}></InfoGrid>
      <Box mb={3}>
        <Divider />
      </Box>
      <Footer/>
    </Container>
  );
}
