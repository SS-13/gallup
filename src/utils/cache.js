const CARD_LIST = 'CARDS_LIST';

export const getCardList = () => {
  const temp = localStorage.getItem(CARD_LIST);
  if (temp) {
    return JSON.parse(temp);
  }
  return [];
};

export const setCardList = (list) => {
  localStorage.setItem(CARD_LIST, JSON.stringify(list));
};

export default {};
