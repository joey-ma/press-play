import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

type GradientLayoutProps = {
  color?: string;
  children?: any;
  image?: string;
  subtitle?: string;
  title: string;
  description?: string;
  roundImage?: boolean;
};

export default function GradientLayout({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: GradientLayoutProps) {
  return (
    <Box
      height="calc(100vh - 100px)"
      overflow="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.700 15%, ${color}.900 40%, rgba(0,0,0,0.95) 75%)`}
      // borderRadius="10px"
    >
      <Flex bg={`${color}.600`} padding="40px" align="end" color="white">
        <Box boxSize="sm" display="flex" gap={25} height="100%" width="100vw">
          <Image
            borderRadius={roundImage ? 'full' : '3px'}
            boxSize="150px"
            src={image}
            alt={
              // check if title is null or undefined
              // null: not provided
              // undefined: invalid input
              title != undefined
                ? title.toLowerCase().split(' ').join('-')
                : 'null'
            }
            boxShadow="2xl"
          />
          <Box padding="20px">
            <Text fontSize="sm" fontWeight="bold" casing="uppercase">
              {subtitle}
            </Text>
            <Text fontSize="4xl">{title}</Text>
            <Text fontSize="sm" fontWeight="400">
              {description}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box padding="25px">{children}</Box>
    </Box>
  );
}
