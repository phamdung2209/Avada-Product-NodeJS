import { Avatar, Box, Image, InlineStack, Text } from '@shopify/polaris'
import React from 'react'
import { useThemeMode } from '~/context/ThemeMode'

const Header = () => {
    const { toggleThemeMode } = useThemeMode()
    console.log('render header')
    return (
        <Box shadow="200" paddingInline={400} position="fixed" width="100%" background="bg-surface" zIndex="1">
            <InlineStack align="space-between" blockAlign="center">
                <Image
                    source="https://s3-alpha-sig.figma.com/img/5bd1/65de/35bf656c311ea87ee3304cd2f7e5b1be?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BS-IZvYhaNjzdEfjjh31-txxJ8p8yfVh7JCuNpnNnZpBiHPzuSL0WoRtZGmFpnaoZedp36-4TT-9Up4ppdAIlcJydJFGkI31YC8snoy~2RYxD8KvD2EzcfD-EEitUK4z1QXemxN4-5Jv6yiXkCs8daluqQXd0UFppYq-BzIIk8ZjhLcUcWO6VF84RoXW-PO0RUeAMOfe8xLDVBD~6aQqaE4lNFyAf3fU9Tps~ClEx~IEVGZUU3lOf9FmbH-xJgFu-RZF~0BrI5k7gZJhT~uq7A6FpcyA1i9X9fIox6i0UzTHPTvN4tV2hlVIlDIh53s7Mvp6qxMCZhg6UPOh~FiLvQ__"
                    alt=""
                    height={45}
                    width={75}
                    className="cursor-pointer"
                    onClick={toggleThemeMode}
                />
                <InlineStack align="center" blockAlign="center" gap={300}>
                    <Avatar customer name="DungPV - Avada" />
                    <Text>DungPV - Avada</Text>
                </InlineStack>
            </InlineStack>
        </Box>
    )
}

export default Header
