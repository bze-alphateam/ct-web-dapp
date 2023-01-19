import { Badge } from "@chakra-ui/react"

export const PublisherRespectBadge = ({respect}: {respect: string}): JSX.Element => {
    const intRespect = parseInt(respect)
    if (intRespect < 10000000000) {
        return (<></>)
    }
    let badgeColor = 'yellow'
    let badgeText = 'respected'
    if (intRespect > 100000000000) {
        badgeColor = 'teal'
        badgeText = 'highly respected'
    }

    return (<Badge variant='solid' ml={1} colorScheme={badgeColor}>{badgeText}</Badge>)
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