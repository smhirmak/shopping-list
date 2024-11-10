import Enums from './Enums';

const Constants = {
  ProductTypeOptionlist: [
    {
      value: Enums.QuantityType.Kg,
      content: Enums.QuantityTypeLabel[1],
    },
    {
      value: Enums.QuantityType.Litre,
      content: Enums.QuantityTypeLabel[2],
    },
    {
      value: Enums.QuantityType.Piece,
      content: Enums.QuantityTypeLabel[3],
    },
  ],
};

export default Constants;
