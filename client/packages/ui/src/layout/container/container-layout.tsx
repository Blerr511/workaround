'use client';

import { Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export const ContainerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Container maxW="container.lg">{children}</Container>;
};
