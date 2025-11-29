import { Badge } from "@chakra-ui/react"
import BigNumber from "bignumber.js";

export function respectBadgeParams({respect}: {respect: BigNumber}): {text: string, color: string}|null {
    if (respect.lt(50000000000)) {
        return null;
    }
    let badgeColor = 'yellow'
    let badgeText = 'respected'
    if (respect.gte(1000000000000)) {
        badgeColor = 'teal'
        badgeText = 'highly respected'
    }

    return {
        text: badgeText,
        color: badgeColor,
    }
}

export const PublisherRespectBadge = ({respect}: {respect: BigNumber}): JSX.Element => {
    const params = respectBadgeParams({respect: respect});
    if (!params) {
        return (<></>)
    }

    return (<Badge variant='solid' ml={1} colorScheme={params.color}>{params.text}</Badge>)
}

 export const PublisherArticlesCountBadge = ({articlesCount}: {articlesCount: number}): JSX.Element => {
    let badgeColor = 'gray'
    let badgeText = 'beginner'

    switch (true) {
      case articlesCount >= 100:
        badgeColor = 'green'
        badgeText = `${articlesCount} articles`
        break;
      case articlesCount >= 50:
        badgeColor = 'orange'
        badgeText = '50 articles'
        break;
      case articlesCount >= 10:
        badgeColor = 'yellow'
        badgeText = '10 articles'
        break;
    }

    return (<Badge variant='solid' ml={1} colorScheme={badgeColor}>{badgeText}</Badge>)
}

export const ArticleContentBadge = ({url}: {url: string}): JSX.Element => {
    const { hostname } = new URL(url);
    
    return (<Badge px='2' m={{base: 1}} colorScheme='orange'>{hostname} content</Badge>)
}

export const ArticleJustPublished = ({createdAt}: {createdAt: BigNumber}): JSX.Element => {
    let currentDate = new Date();
    let justPublishedAge = 24 * 60 * 60 * 1000;
    if ((currentDate.getTime() -  (createdAt.toNumber() * 1000)) > justPublishedAge ) {
        
        return (<></>)
    }

    return (<Badge px='2' m={{base: 1}} colorScheme='yellow'>published today</Badge>)
}