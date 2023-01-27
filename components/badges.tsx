import { Badge } from "@chakra-ui/react"
import Long from "long";

export function respectBadgeParams({respect}: {respect: Long}): {text: string, color: string}|null {
    respect = Long.fromValue(respect);
    if (respect.lt(10000000000)) {
        return null;
    }
    let badgeColor = 'yellow'
    let badgeText = 'respected'
    if (respect.gte(100000000000)) {
        badgeColor = 'teal'
        badgeText = 'highly respected'
    }

    return {
        text: badgeText,
        color: badgeColor,
    }
}

export const PublisherRespectBadge = ({respect}: {respect: Long}): JSX.Element => {
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
        badgeText = '100 articles'
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