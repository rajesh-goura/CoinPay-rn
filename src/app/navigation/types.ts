export type RootStackParamList = {
    Onboarding1: undefined;
    Signup: undefined;
    CreateAccount: undefined;
    ConfirmPhone: {
      phoneNumber: string;
      callingCode: string;
    };
    // Add other screens as needed
  };
  
  // Extend the RootParamList for useNavigation hook
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }