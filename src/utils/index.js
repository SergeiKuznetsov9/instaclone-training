export const getCardFromArrayById = (cardsArray, cardId) => {
  const targetPhoto = cardsArray.find((card) => card.id === cardId);

  return {
    ...targetPhoto,
    author: { ...targetPhoto.author },
    comments: [...targetPhoto.comments],
    likes: [...targetPhoto.likes],
  };
};

export const buildCardsArrayForDispatch = (actualCardArray, changedElement) => {
  const newCardArray = [...actualCardArray];
  const indexOfChangedElement = newCardArray.findIndex(
    (card) => card.id === changedElement.id
  );
  newCardArray[indexOfChangedElement] = changedElement;
  return newCardArray;
};
