import {
  BathroomRounded,
  BeachAccessRounded,
  BreakfastDiningRounded,
  ChildFriendlyRounded,
  Co2Rounded,
  DownhillSkiingRounded,
  EvStationRounded,
  FireplaceRounded,
  FitnessCenterRounded,
  HotTubRounded,
  KingBedRounded,
  KitchenRounded,
  LocalParkingRounded,
  OutdoorGrillRounded,
  PoolRounded,
  SmokeFreeRounded,
  SmokingRoomsRounded,
  SvgIconComponent,
  WaterRounded,
  WifiRounded,
} from '@mui/icons-material';

interface Amenity {
  title: string;
  icon: SvgIconComponent;
  category: string;
}

export const amenities: Record<string, Amenity> = {
  wifi: { title: 'Wifi', icon: WifiRounded, category: 'essentials' },
  kitchen: { title: 'Kitchen', icon: KitchenRounded, category: 'essentials' },
  washer: { title: 'Washer', icon: BathroomRounded, category: 'essentials' },
  dryer: { title: 'Dryer', icon: BathroomRounded, category: 'essentials' },
  air_conditioning: { title: 'Air conditioning', icon: BathroomRounded, category: 'essentials ' },
  heating: { title: 'Heating', icon: BathroomRounded, category: 'essentials' },
  dedicated_workspace: { title: 'Dedicated workspace', icon: BathroomRounded, category: 'essentials' },
  tv: { title: 'TV', icon: BathroomRounded, category: 'essentials' },
  iron: { title: 'Iron', icon: BathroomRounded, category: 'essentials' },
  hair_dryer: { title: 'Hair dryer', icon: BathroomRounded, category: 'essentials' },
  private_attached_bathroom: {
    title: 'Private attached bathroom',
    icon: BathroomRounded,
    category: 'essentials',
  },
  pool: { title: 'Pool', icon: PoolRounded, category: 'features' },
  hot_tub: { title: 'Hot tub', icon: HotTubRounded, category: 'features' },
  free_parking: { title: 'Free parking', icon: LocalParkingRounded, category: 'features' },
  ev_charger: { title: 'EV charger', icon: EvStationRounded, category: 'features' },
  crib: { title: 'Crib', icon: ChildFriendlyRounded, category: 'features' },
  king_bed: { title: 'King bed', icon: KingBedRounded, category: 'features' },
  gym: { title: 'Gym', icon: FitnessCenterRounded, category: 'features' },
  bbq_grill: { title: 'BBQ grill', icon: OutdoorGrillRounded, category: 'features' },
  breakfast: { title: 'Breakfast', icon: BreakfastDiningRounded, category: 'features' },
  indoor_fireplace: { title: 'Indoor fireplace', icon: FireplaceRounded, category: 'features' },
  smoking_allowed: { title: 'Smoking allowed', icon: SmokingRoomsRounded, category: 'features' },
  beachfront: { title: 'Beachfront', icon: BeachAccessRounded, category: 'location' },
  waterfront: { title: 'Waterfront', icon: WaterRounded, category: 'location' },
  ski_in_ski_out: { title: 'Ski in ski out', icon: DownhillSkiingRounded, category: 'location' },
  smoke_alarm: { title: 'Smoke alarm', icon: SmokeFreeRounded, category: 'safety' },
  carbon_monoxide_alarm: { title: 'Carbon monoxide alarm', icon: Co2Rounded, category: 'safety' },
};
