
export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
export const ValidateRegister = (user) => {
  const { firstName, lastName, phoneNumber, password } = user;
  return ValidateData({ firstName, lastName, phoneNumber, password });
};
export const ValidateLogin = (user) => {
  const { phoneNumber, password } = user;
  return ValidateData({ phoneNumber, password });
};
export const ValidateUpdateUser = (user) => {
  const { firstName, lastName } = user;
  return ValidateData({ firstName, lastName });
};
export const ValidateBanner = (banner) => {
  const { name, detail, image } = banner;
  return ValidateData({ name, detail, image });
};
export const ValidateUpdateBanner = (banner) => {
  const { name, detail } = banner;
  return ValidateData({ name, detail });
};
export const ValidateUpdateBannerImage = (banner) => {
  const { image, oldImage } = banner;
  return ValidateData({ image, oldImage });
};

export const ValidateUpdateUserProfile = (user) => {
  const { image } = user;
  return ValidateData({ image });
};
export const ValidateVehicle = (vehicle) => {
  const { vehicleType, name, image } = vehicle;
  return ValidateData({ vehicleType, name, image });
};
export const ValidateUpdateVehicle = (vehicle) => {
  const { vehicleType, name } = vehicle;
  return ValidateData({ vehicleType, name });
};
export const ValidateUpdateVehicleImage = (vehicle) => {
  const { image, oldImage } = vehicle;
  return ValidateData({ image, oldImage });
};
export const ValidateParts = (parts) => {
  const { vehicleId, name, image, detail,price } = parts;
  return ValidateData({ vehicleId, name, image, detail,price });
};
export const ValidateUpdateParts = (parts) => {
  const { vehicleId, name, detail, price } = parts;
  return ValidateData({ vehicleId, name, detail, price });
};
export const ValidateUpdatePartsImage = (parts) => {
  const { image, oldImage } = parts;
  return ValidateData({ image, oldImage });
};
export const ValidateOrder = async (order) => {
  const { userId, partsId, priceTotal } = order;

  return ValidateData({ userId, partsId, priceTotal });
};
