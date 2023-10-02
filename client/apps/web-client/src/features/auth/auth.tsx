import { FC, useCallback } from 'react';
import { Modal } from '@wr/ui';
import { useRecoilState } from 'recoil';
import { authModalState } from './auth.state';

export const Auth: FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const onClose = useCallback(() => {
    setModalState(() => ({ isOpen: false }));
  }, [setModalState]);

  return <Modal isOpen={modalState.isOpen} onClose={onClose}>hello</Modal>;
};
