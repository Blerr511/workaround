import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ProfileIcon, SettingsIcon } from '@wr/ui';
import React from 'react';
import { Link } from '@chakra-ui/next-js';

export const HeaderContent = () => {
  let mainTeal = useColorModeValue('teal.300', 'teal.300');
  let inputBg = useColorModeValue('white', 'gray.800');
  let mainText = useColorModeValue('gray.700', 'gray.200');
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  let searchIcon = useColorModeValue('gray.700', 'gray.200');

  return (
    <Flex
      pe={{ sm: '0px', md: '16px' }}
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: '128px',
          md: '200px',
        }}
        me={{ sm: 'auto', md: '20px' }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              aria-label="search"
              bg="inherit"
              borderRadius="inherit"
              _hover={{}}
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>
      <Link href={'/auth/signin'}>
        <Button
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          }
        >
          <Text display={{ sm: 'none', md: 'flex' }}>Sign In</Text>
        </Button>
      </Link>
      <SettingsIcon
        cursor="pointer"
        ms={{ base: '16px', xl: '0px' }}
        me="16px"
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
      </Menu>
    </Flex>
  );
};
