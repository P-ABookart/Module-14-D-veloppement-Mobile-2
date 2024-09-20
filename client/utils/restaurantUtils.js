export const getPriceSymbol = (priceRange) => {
  let priceSymbol = "";
  switch (priceRange) {
    case 1:
      priceSymbol = "($)";
      break;
    case 2:
      priceSymbol = "($$)";
      break;
    case 3:
      priceSymbol = "($$$)";
      break;
    default:
      priceSymbol = "($)";
  }
  return priceSymbol;
};

export const getRatingSymbol = (rating) => {
  let ratingSymbol = "";
  switch (rating) {
    case 1:
      ratingSymbol = "★";
      break;
    case 2:
      ratingSymbol = "★★";
      break;
    case 3:
      ratingSymbol = "★★★";
      break;
    case 4:
      ratingSymbol = "★★★★";
      break;
    case 5:
      ratingSymbol = "★★★★★";
      break;
    default:
      ratingSymbol = "★";
  }
  return ratingSymbol;
};
