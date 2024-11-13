export interface ICard {
  value: string;
  image: string;
}

const createCard = (card: ICard) => card;

export const Cards = {
  '1B': createCard({ value: 'b1', image: '1B.svg' }),
  '2D': createCard({ value: '2D', image: '2D.svg' }),
  '3C': createCard({ value: '3C', image: '3C.svg' }),
  '4C': createCard({ value: '4C', image: '4C.svg' }),
  '5C': createCard({ value: '5C', image: '5C.svg' }),
  '6C': createCard({ value: '6C', image: '6C.svg' }),
  '7C': createCard({ value: '7C', image: '7C.svg' }),
  '8C': createCard({ value: '8C', image: '8C.svg' }),
  '9C': createCard({ value: '9C', image: '9C.svg' }),
  AC: createCard({ value: 'AC', image: 'AC.svg' }),
  JC: createCard({ value: 'JC', image: 'JC.svg' }),
  KC: createCard({ value: 'KC', image: 'KC.svg' }),
  QC: createCard({ value: 'QC', image: 'QC.svg' }),
  TC: createCard({ value: 'TC', image: 'TC.svg' }),
  '1J': createCard({ value: '1J', image: '1J.svg' }),
  '2H': createCard({ value: '2H', image: '2H.svg' }),
  '3D': createCard({ value: '3D', image: '3D.svg' }),
  '4D': createCard({ value: '4D', image: '4D.svg' }),
  '5D': createCard({ value: '5D', image: '5D.svg' }),
  '6D': createCard({ value: '6D', image: '6D.svg' }),
  '7D': createCard({ value: '7D', image: '7D.svg' }),
  '8D': createCard({ value: '8D', image: '8D.svg' }),
  '9D': createCard({ value: '9D', image: '9D.svg' }),
  AD: createCard({ value: 'AD', image: 'AD.svg' }),
  JD: createCard({ value: 'JD', image: 'JD.svg' }),
  KD: createCard({ value: 'KD', image: 'KD.svg' }),
  QD: createCard({ value: 'QD', image: 'QD.svg' }),
  TD: createCard({ value: 'TD', image: 'TD.svg' }),
  '2B': createCard({ value: '2B', image: '2B.svg' }),
  '2J': createCard({ value: '2J', image: '2J.svg' }),
  '3H': createCard({ value: '3H', image: '3H.svg' }),
  '4H': createCard({ value: '4H', image: '4H.svg' }),
  '5H': createCard({ value: '5H', image: '5H.svg' }),
  '6H': createCard({ value: '6H', image: '6H.svg' }),
  '7H': createCard({ value: '7H', image: '7H.svg' }),
  '8H': createCard({ value: '8H', image: '8H.svg' }),
  '9H': createCard({ value: '9H', image: '9H.svg' }),
  AH: createCard({ value: 'AH', image: 'AH.svg' }),
  JH: createCard({ value: 'JH', image: 'JH.svg' }),
  KH: createCard({ value: 'KH', image: 'KH.svg' }),
  QH: createCard({ value: 'QH', image: 'QH.svg' }),
  TH: createCard({ value: 'TH', image: 'TH.svg' }),
  '2C': createCard({ value: '2C', image: '2C.svg' }),
  '2S': createCard({ value: '2S', image: '2S.svg' }),
  '3S': createCard({ value: '3S', image: '3S.svg' }),
  '4S': createCard({ value: '4S', image: '4S.svg' }),
  '5S': createCard({ value: '5S', image: '5S.svg' }),
  '6S': createCard({ value: '6S', image: '6S.svg' }),
  '7S': createCard({ value: '7S', image: '7S.svg' }),
  '8S': createCard({ value: '8S', image: '8S.svg' }),
  '9S': createCard({ value: '9S', image: '9S.svg' }),
  AS: createCard({ value: 'AS', image: 'AS.svg' }),
  JS: createCard({ value: 'JS', image: 'JS.svg' }),
  KS: createCard({ value: 'KS', image: 'KS.svg' }),
  QS: createCard({ value: 'QS', image: 'QS.svg' }),
  TS: createCard({ value: 'TS', image: 'TS.svg' }),
} as const;

Object.freeze(Cards);

export type CardType = keyof typeof Cards;
