import { currentUser, friendUser } from '../data/mockLocations';
import { getDistanceMeters, formatDistance } from './distance';

const distanceMeters = getDistanceMeters(currentUser, friendUser);
const distanceText = formatDistance(distanceMeters);

console.log('Distance in meters:', distanceMeters);
console.log('Formatted distance:', distanceText);