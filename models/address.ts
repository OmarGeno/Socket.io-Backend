export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  apartmentOrSuite?: string; // optional
  deliveryInstructions?: string; // optional, like "Leave at the door"
}
