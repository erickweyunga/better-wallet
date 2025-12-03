import {
  Bell,
  CheckMark,
  ChevronBackward,
  ChevronForward,
  Envelope,
  EyeOff,
  EyeOpen,
  handBag,
  Home,
  HomeFill,
  InfoCircle,
  InfoTriangle,
  Lock,
  MapPin,
  MenuIcon,
  OutGoingPhoneCall,
  Person,
  XMark,
} from "@/assets/icons/icon-svg";
import type { StyleProp, ViewStyle } from "react-native";

//------------------------ ICONS ------------------------//
//
//
//------------------------ ICONS ------------------------//

export const iconRegistry = {
  InfoCircle: { icon: InfoCircle },
  InfoTriangle: { icon: InfoTriangle },
  ChevronForward: { icon: ChevronForward },
  ChevronBackward: { icon: ChevronBackward },
  Envelope: { icon: Envelope },
  MapPin: { icon: MapPin },
  OutGoingPhoneCall: { icon: OutGoingPhoneCall },
  MenuIcon: { icon: MenuIcon },
  handBag: { icon: handBag },
  XMark: { icon: XMark },
  CheckMark: { icon: CheckMark },
  Bell: { icon: Bell },
  EyeOpen: { icon: EyeOpen },
  EyeOff: { icon: EyeOff },
  Person: { icon: Person },
  Lock: { icon: Lock },
  HomeFill: { icon: HomeFill },
  Home: { icon: Home },
} as const satisfies Record<string, IconSet>;

//------------------------ Types ------------------------//
//
//
//------------------------ Types ------------------------//
export type IconName = keyof typeof iconRegistry;

export interface IconSet {
  icon: string;
}

export type IconVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "default";

export interface AppIconProps {
  name: IconName;
  focused?: boolean;
  size?: number;
  variant?: IconVariant;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
