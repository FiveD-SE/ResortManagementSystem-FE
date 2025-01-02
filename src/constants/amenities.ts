import {
  AirOutlined,
  BathroomOutlined,
  BathroomRounded,
  BeachAccessOutlined,
  BeachAccessRounded,
  BreakfastDiningOutlined,
  BreakfastDiningRounded,
  ChildFriendlyOutlined,
  ChildFriendlyRounded,
  Co2Outlined,
  Co2Rounded,
  DownhillSkiingOutlined,
  DownhillSkiingRounded,
  DryCleaningOutlined,
  DryOutlined,
  EvStationOutlined,
  EvStationRounded,
  FireplaceOutlined,
  FireplaceRounded,
  FitnessCenterOutlined,
  FitnessCenterRounded,
  HeatPumpOutlined,
  HotTubOutlined,
  HotTubRounded,
  IronOutlined,
  KingBedOutlined,
  KingBedRounded,
  KitchenOutlined,
  KitchenRounded,
  LocalParkingOutlined,
  LocalParkingRounded,
  OutdoorGrillOutlined,
  OutdoorGrillRounded,
  PoolOutlined,
  PoolRounded,
  SmokeFreeOutlined,
  SmokeFreeRounded,
  SmokingRoomsOutlined,
  SmokingRoomsRounded,
  SvgIconComponent,
  TvOutlined,
  WashOutlined,
  WaterOutlined,
  WaterRounded,
  WifiOutlined,
  WifiRounded,
  WorkspacePremiumOutlined,
} from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Amenity {
  title: string;
  icon: SvgIconComponent;
  category: string;
}

export const amenities: Record<string, Amenity> = {
  wifi: { title: 'Wifi', icon: WifiOutlined, category: 'essentials' },
  kitchen: { title: 'Kitchen', icon: KitchenOutlined, category: 'essentials' },
  washer: { title: 'Washer', icon: WashOutlined, category: 'essentials' },
  dryer: { title: 'Dryer', icon: DryCleaningOutlined, category: 'essentials' },
  air_conditioning: { title: 'Air conditioning', icon: AirOutlined, category: 'essentials' },
  heating: { title: 'Heating', icon: HeatPumpOutlined, category: 'essentials' },
  dedicated_workspace: { title: 'Dedicated workspace', icon: WorkspacePremiumOutlined, category: 'essentials' },
  tv: { title: 'TV', icon: TvOutlined, category: 'essentials' },
  iron: { title: 'Iron', icon: IronOutlined, category: 'essentials' },
  hair_dryer: { title: 'Hair dryer', icon: DryOutlined, category: 'essentials' },
  private_attached_bathroom: {
    title: 'Private attached bathroom',
    icon: BathroomOutlined,
    category: 'essentials',
  },
  pool: { title: 'Pool', icon: PoolOutlined, category: 'features' },
  hot_tub: { title: 'Hot tub', icon: HotTubOutlined, category: 'features' },
  free_parking: { title: 'Free parking', icon: LocalParkingOutlined, category: 'features' },
  ev_charger: { title: 'EV charger', icon: EvStationOutlined, category: 'features' },
  crib: { title: 'Crib', icon: ChildFriendlyOutlined, category: 'features' },
  king_bed: { title: 'King bed', icon: KingBedOutlined, category: 'features' },
  gym: { title: 'Gym', icon: FitnessCenterOutlined, category: 'features' },
  bbq_grill: { title: 'BBQ grill', icon: OutdoorGrillOutlined, category: 'features' },
  breakfast: { title: 'Breakfast', icon: BreakfastDiningOutlined, category: 'features' },
  indoor_fireplace: { title: 'Indoor fireplace', icon: FireplaceOutlined, category: 'features' },
  smoking_allowed: { title: 'Smoking allowed', icon: SmokingRoomsOutlined, category: 'features' },
  beachfront: { title: 'Beachfront', icon: BeachAccessOutlined, category: 'location' },
  waterfront: { title: 'Waterfront', icon: WaterOutlined, category: 'location' },
  ski_in_ski_out: { title: 'Ski in ski out', icon: DownhillSkiingOutlined, category: 'location' },
  smoke_alarm: { title: 'Smoke alarm', icon: SmokeFreeOutlined, category: 'safety' },
  carbon_monoxide_alarm: { title: 'Carbon monoxide alarm', icon: Co2Outlined, category: 'safety' },
};

const allAvailableIcons: (OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string;
})[] = [
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
  WaterRounded,
  WifiRounded,
];

export function getRandomIcon() {
  const randomIndex = Math.floor(Math.random() * allAvailableIcons.length);
  return allAvailableIcons[randomIndex];
}
