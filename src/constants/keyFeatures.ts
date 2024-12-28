import {
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
    MeetingRoomRounded,
    OutdoorGrillRounded,
    PoolRounded,
    WaterRounded,
    WifiRounded,
} from '@mui/icons-material';

export interface KeyFeature {
    title: string;
    icon: React.ElementType;
    description: string;
}

export const keyFeatures: Record<string, KeyFeature> = {
    oceanView: {
        title: "Stunning Ocean View",
        icon: BeachAccessRounded,
        description: "Enjoy breathtaking views of the ocean from the comfort of your room.",
    },
    infinityPool: {
        title: "Infinity Pool",
        icon: PoolRounded,
        description: "Relax in our luxurious infinity pool with panoramic views.",
    },
    spaAndWellness: {
        title: "Spa & Wellness Center",
        icon: HotTubRounded,
        description: "Unwind with our rejuvenating spa treatments and wellness facilities.",
    },
    fineDining: {
        title: "Fine Dining",
        icon: BreakfastDiningRounded,
        description: "Indulge in gourmet cuisine crafted by world-class chefs.",
    },
    kidsClub: {
        title: "Kids' Club",
        icon: ChildFriendlyRounded,
        description: "Fun and engaging activities for the little ones to enjoy.",
    },
    fitnessCenter: {
        title: "State-of-the-Art Fitness Center",
        icon: FitnessCenterRounded,
        description: "Stay fit with our modern gym equipment and personal training services.",
    },
    privateBeach: {
        title: "Exclusive Private Beach",
        icon: BeachAccessRounded,
        description: "Relax on our pristine private beach with crystal-clear waters.",
    },
    waterSports: {
        title: "Exciting Water Sports",
        icon: DownhillSkiingRounded,
        description: "Experience thrilling activities like jet skiing and parasailing.",
    },
    ecoFriendly: {
        title: "Eco-Friendly Practices",
        icon: Co2Rounded,
        description: "Committed to sustainable practices for a greener future.",
    },
    luxurySuites: {
        title: "Luxury Suites",
        icon: KingBedRounded,
        description: "Stay in spacious and elegantly designed suites with premium amenities.",
    },
    outdoorGrill: {
        title: "Outdoor Grill Area",
        icon: OutdoorGrillRounded,
        description: "Host a BBQ party in our well-equipped outdoor grill space.",
    },
    fireplace: {
        title: "Cozy Fireplace",
        icon: FireplaceRounded,
        description: "Gather around the warm and inviting fireplace during chilly evenings.",
    },
    localParking: {
        title: "Convenient Local Parking",
        icon: LocalParkingRounded,
        description: "Ample parking space for all our guests, just steps away from the property.",
    },
    freeWifi: {
        title: "High-Speed Free Wifi",
        icon: WifiRounded,
        description: "Stay connected with fast and reliable internet access.",
    },
    fullyEquippedKitchen: {
        title: "Fully Equipped Kitchen",
        icon: KitchenRounded,
        description: "Prepare your own meals with our complete set of kitchen appliances.",
    },
    waterActivities: {
        title: "Adventurous Water Activities",
        icon: WaterRounded,
        description: "Explore kayaking, snorkeling, and other exciting water adventures.",
    },
    evStation: {
        title: "EV Charging Station",
        icon: EvStationRounded,
        description: "Convenient electric vehicle charging stations available on-site.",
    },
    seftCheckIn: {
        title: "Self Check-In",
        icon: MeetingRoomRounded,
        description: "Hassle-free self check-in process for a seamless arrival experience.",
    }
};
