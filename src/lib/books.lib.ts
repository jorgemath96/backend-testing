export const checkPrice = (price: string) => {
  // Verify that price contains only numbers (price is intger or float)
  return /^\d+(\.\d+)?$/.test(price);
};

export const checkPhrase = (phrase: string) => {
  // Verify that phrase contains only letters
  return /^[a-zA-Z]+$/.test(phrase);
};

export const checkBook = (book: any) => {
  var keys: string[] = [
    "id",
    "title",
    "author",
    "price",
    "availability",
    "num_reviews",
    "stars",
    "description",
  ];
  let sum: number = 0
  for (let a in book) {
    if (keys.includes(a)) {
      sum = sum +1
    }
  }
  return keys.length === sum;
};

export const phraseSearch = async (phrase: string) => {
  console.log(phrase);
  return [];
};

export const pricesAverage = async (prices: number[]) => {
  const pricesSum = await prices.reduce((total, sum) => total + sum, 0);
  const division = pricesSum / prices.length;
  const average = Math.round(division * 100) / 100;
  return average;
};
