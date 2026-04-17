import type { Coordinate } from "@/utils/distance";

// combine the type with new feature
export type UserLocation = Coordinate &{
  id: string;
  name: string;
};
export const currentUser: UserLocation = {
  id: 'user1',
  name: 'Iris',
  latitude: 32.528181,
  longitude: -92.647235,
};

export const friendUser: UserLocation = {
  id: 'user2',
  name: 'Cameron',
  latitude: 32.533261,
  longitude: -92.650785,
};