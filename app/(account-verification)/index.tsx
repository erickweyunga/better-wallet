import AppButton from "@/components/ui/app-button";
import AppIcon from "@/components/ui/app-icon";
import AppLink from "@/components/ui/app-link";
import AppPhoneInput from "@/components/ui/app-phone-input";
import AppScrollable from "@/components/ui/app-scrollable";
import AppText from "@/components/ui/app-text";
import AppView from "@/components/ui/app-view";
import { useTheme } from "@/hooks/use-theme";
import type PhoneInput from "@perttu/react-native-phone-number-input";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { z } from "zod";

const phoneSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export default function Page() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState<string | undefined>();
  const phoneInputRef = useRef<PhoneInput>(null);

  const handleNext = () => {
    const result = phoneSchema.safeParse({ phoneNumber });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const isValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    if (!isValid) {
      setError("Invalid phone number");
      return;
    }

    setError(undefined);
    console.log("Valid phone number:", formattedValue);
    router.push("/(account-verification)/verify-otp");
  };

  return (
    <AppScrollable
      contentContainerStyle={{ flex: 1 }}
      safeBottom
      paddingHorizontal="lg"
      keyboardAware
    >
      <AppView align="center" gap="sm">
        <AppText heading="s">Get started!</AppText>
        <AppText text="m" align="center" style={{ maxWidth: 280 }}>
          Please enter your mobile number to verify your account
        </AppText>
      </AppView>
      <AppView flex paddingVertical="huge">
        <AppPhoneInput
          ref={phoneInputRef}
          textVariant="l"
          placeholder="Enter phone number"
          defaultCode="TZ"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (error) setError(undefined);
          }}
          onChangeFormattedText={setFormattedValue}
          error={error}
        />
      </AppView>
      <AppView align="center" gap="xl">
        <AppText text="s" align="center" style={{ maxWidth: 240 }}>
          By clicking &ldquo;Next&rdquo; you agree to the{" "}
          <AppLink url="/" text="s">
            privacy policy
          </AppLink>{" "}
          and
          <AppLink url="/" text="s">
            terms of service
          </AppLink>{" "}
        </AppText>

        <AppButton
          fullWidth
          rightIcon={<AppIcon name="ArrowRight" color={theme.text.primary} />}
          onPress={handleNext}
        >
          Next
        </AppButton>
      </AppView>
    </AppScrollable>
  );
}
