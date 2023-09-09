'use client';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export interface HeaderLayoutProps {
  children?: ReactNode;
}

export const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  const navbarFilter = useColorModeValue(
    'none',
    'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))'
  );
  const navbarBackdrop = 'blur(21px)';
  const navbarShadow = useColorModeValue(
    '0px 7px 23px rgba(0, 0, 0, 0.05)',
    'none'
  );
  const navbarBg = useColorModeValue(
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)',
    'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
  );
  const navbarBorder = useColorModeValue(
    '#FFFFFF',
    'rgba(255, 255, 255, 0.31)'
  );
  const secondaryMargin = '0px';
  const paddingX = '15px';

  return (
    <Flex
      position={'fixed'}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={'30px'}
      px={{
        sm: paddingX,
        md: '30px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top="18px"
      w={{ sm: 'calc(100vw - 30px)', xl: 'calc(100vw - 60px)' }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
      >
        <Box mb={{ sm: '8px', md: '0px' }}>{children}</Box>
      </Flex>
    </Flex>
  );
};
