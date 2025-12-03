import AppButton from "@/components/ui/app-button";
import AppDivider from "@/components/ui/app-divider";
import AppIcon from "@/components/ui/app-icon";
import AppText from "@/components/ui/app-text";
import AppView from "@/components/ui/app-view";
import { useTheme } from "@/hooks/use-theme";
import { useSessionStore } from "@/stores/auth.store";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ViewToken,
} from "react-native";

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Manage your finances.",
    description:
      "Forget everything you know about the chaotic world of finance. It can be easy.",
    image: require("@assets/images/illustration-index.png"),
  },
  {
    id: "2",
    title: "Control your savings.",
    description:
      "Forget everything you know about the chaotic world of finance. It can be easy.",
    image: require("@assets/images/illustration-one.png"),
  },
  {
    id: "3",
    title: "Easy banking.",
    description:
      "Forget everything you know about the chaotic world of finance. It can be easy.",
    image: require("@assets/images/illustration-two.png"),
  },
];

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { complete_onboarding } = useSessionStore();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      complete_onboarding();
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <AppView style={{ width }} flex padding="lg">
      <AppView flex justify="center" align="center" paddingTop="huge">
        <Image source={item.image} />
      </AppView>
      <AppView paddingVertical="xl" gap="md">
        <AppText heading="m">{item.title}</AppText>
        <AppText text="m">{item.description}</AppText>
      </AppView>
    </AppView>
  );

  return (
    <AppView background="background" flex>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <AppView padding="lg" paddingBottom="huge">
        <AppView row align="center" justify="space-between">
          <AppView row align="center" gap="xs">
            {slides.map((_, index) => (
              <AppDivider
                key={index}
                thickness={10}
                color={currentIndex === index ? "primary" : undefined}
                style={{
                  width: currentIndex === index ? 50 : 20,
                  borderRadius: 100,
                }}
              />
            ))}
          </AppView>
          {currentIndex === slides.length - 1 ? (
            <AppButton style={{ height: 44 }} onPress={handleNext}>
              Continue
            </AppButton>
          ) : (
            <AppButton style={{ height: 44, width: 44 }} onPress={handleNext}>
              <AppIcon name="ChevronForward" color={theme.text.primary} />
            </AppButton>
          )}
        </AppView>
      </AppView>
    </AppView>
  );
}
