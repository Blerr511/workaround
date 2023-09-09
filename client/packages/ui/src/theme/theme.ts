import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';

const theme = extendTheme(
  { breakpoints },
  globalStyles,
  buttonStyles,
  badgeStyles,
  linkStyles,
  drawerStyles
);

export default theme;
