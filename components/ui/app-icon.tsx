import { iconRegistry, type IconName } from "@/assets/icons/icons";
import { useTheme } from "@/hooks/use-theme";
import { TextStyle, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";

import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

type ExpoIconPack =
  | "Ionicons"
  | "Feather"
  | "MaterialIcons"
  | "AntDesign"
  | "FontAwesome"
  | "MaterialCommunityIcons"
  | "Entypo";

interface BaseAppIconProps {
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
}

interface CustomSvgIconProps extends BaseAppIconProps {
  name: IconName;
  expoIconName?: never;
  expoIconPack?: never;
}

interface ExpoVectorIconProps extends BaseAppIconProps {
  name?: never;
  expoIconName: string;
  expoIconPack?: ExpoIconPack;
}

export type AppIconProps = CustomSvgIconProps | ExpoVectorIconProps;

const expoIconPacks = {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} as const;

export default function AppIcon({
  size = 24,
  color,
  style,
  ...props
}: AppIconProps) {
  const theme = useTheme();
  const finalColor = color ?? theme.text.primary;

  if ("name" in props && props.name) {
    const iconSet = iconRegistry[props.name];
    if (!iconSet) {
      __DEV__ &&
        console.warn(`[AppIcon] Custom icon "${props.name}" not found`);
      return null;
    }

    return (
      <SvgXml
        xml={iconSet.icon}
        width={size}
        height={size}
        color={finalColor}
        style={style as any}
      />
    );
  }

  if ("expoIconName" in props && props.expoIconName) {
    const packName = props.expoIconPack ?? "Feather";
    const IconComponent = expoIconPacks[packName];

    if (!IconComponent) {
      __DEV__ && console.warn(`[AppIcon] Unsupported pack: ${packName}`);
      return null;
    }

    return (
      <IconComponent
        name={props.expoIconName as any}
        size={size}
        color={finalColor}
        style={style as TextStyle}
      />
    );
  }

  return null;
}
