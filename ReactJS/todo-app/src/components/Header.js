import { Avatar, Box, Image, Text } from '@shopify/polaris'
import React from 'react'

const Header = () => {
    return (
        <Box
            className="h-14 flex items-center justify-between px-4"
            width="full"
            style={{
                boxShadow: '0rem 0rem 1rem 0rem rgb(115 115 115 / 20%)',
            }}
        >
            <Image
                source="https://s3-alpha-sig.figma.com/img/5bd1/65de/35bf656c311ea87ee3304cd2f7e5b1be?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BS-IZvYhaNjzdEfjjh31-txxJ8p8yfVh7JCuNpnNnZpBiHPzuSL0WoRtZGmFpnaoZedp36-4TT-9Up4ppdAIlcJydJFGkI31YC8snoy~2RYxD8KvD2EzcfD-EEitUK4z1QXemxN4-5Jv6yiXkCs8daluqQXd0UFppYq-BzIIk8ZjhLcUcWO6VF84RoXW-PO0RUeAMOfe8xLDVBD~6aQqaE4lNFyAf3fU9Tps~ClEx~IEVGZUU3lOf9FmbH-xJgFu-RZF~0BrI5k7gZJhT~uq7A6FpcyA1i9X9fIox6i0UzTHPTvN4tV2hlVIlDIh53s7Mvp6qxMCZhg6UPOh~FiLvQ__"
                alt=""
                height={45}
                width={75}
                className="cursor-pointer"
            />

            <Box className="flex items-center gap-2">
                <Avatar customer name="DungPV - Avada" />
                <Text>DungPV - Avada</Text>
            </Box>
        </Box>
    )
}

export default Header
