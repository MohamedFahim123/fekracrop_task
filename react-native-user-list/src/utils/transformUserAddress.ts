/**
 * Transforms a user address object into a single string: "street, city, zipcode"
 */
export const transformUserAddress = (address: { street: string; city: string; zipcode: string }): string => {
  const { street, city, zipcode } = address;
  return `${street}, ${city}, ${zipcode}`;
};
