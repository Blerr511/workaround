import { atom, selector } from 'recoil';

export const authModalState = atom({
  key: 'auth_modal_state',
  default: {
    isOpen: false,
  },
});

export const authModalSelectorIsOpen = selector({
  key: 'auth_modal_is_open_selector',
  get({ get }) {
    return get(authModalState).isOpen;
  },
});
