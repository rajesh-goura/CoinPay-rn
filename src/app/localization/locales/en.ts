// src/localization/locales/en.ts
const en = {
    common: {
      appName: "Coinpay",
      success: "Success",
      error: "Error",
      back: "Back",
      continue: "Continue",
      confirm: "Confirm",
      cancel: "Cancel",
      next: "Next",
      getStarted: "Get Started",
      ok:"Ok",
      
    },
    onboarding: {
        slide1: "Trusted by millions of people, part of one part",
        slide2: "Spend money abroad, and track your expense",
        slide3: "Receive Money From Anywhere In The World",
    },
    registration: {
        title: "Create your Coinpay account",
        subtitle: "Coinpay is a powerful tool that allows you to easily send, receive, and track all your transactions.",
        signup: "Sign up",
        login: "Log in",
        termsAndPolicy: "By continuing you accept our {{terms}} and {{privacy}}",
        terms: "Terms of Service",
        privacy: "Privacy Policy"
      },
      createAccount: {
        title: "Create an Account",
        subtitle: "Enter your email and password to create your account",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        signupButton: "Sign up",
        modal: {
          title: "Verify your email address",
          subtext: "Is this correct? {{email}}",
          confirmButton: "Yes, send verification email",
          editButton: "No, edit email"
        },
        errors: {
          default: "Failed to create account",
          emailRequired: "Please enter a valid email address",
          passwordRequired: "Please enter a password",
          passwordLength: "Password should be at least 6 characters",
          emailInUse: "Email address is already in use",
          invalidEmail: "Email address is invalid",
          weakPassword: "Password is too weak"
        }
      },
      emailVerification: {
        title: "Verify your email",
        sentEmail: "We sent a verification email to {email}",
        instructions: "Please check your inbox and click the verification link to continue.",
        didNotReceive: "Didn't receive email?",
        resend: "Resend",
        resendIn: "Resend in {seconds}s",
        verifiedButton: "I've Verified My Email",
        success: "Success",
        resendSuccess: "Verification email has been resent",
        notVerifiedTitle: "Email not verified",
        notVerifiedMessage: "Please verify your email before continuing. If you've already verified, wait a few moments and try again.",
        errors: {
          resendFailed: "Failed to resend verification email. Please try again.",
          noUser: "No user found. Please try again.",
          verificationCheckFailed: "Failed to check verification status. Please try again."
        }
      },
      countrySelector: {
        title: "Country of Residence",
        instructions: "This info needs to be accurate with your ID document.",
        selectCountry: "Select your country",
        country: "Country",
        continue: "Continue",
        error: "Please select your country of residence.",
      },
      personalInfo: {
        title: "Add your personal info",
        instructions: "This info needs to be accurate with your ID document.",
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        username: "Username",
        usernamePlaceholder: "Choose a username",
        dateOfBirth: "Date of Birth",
        dateOfBirthPlaceholder: "MM/DD/YYYY",
        continue: "Continue",
        error: "Please fill in all fields.",
      },
      emailInfo: {
        title: "Add your Email",
        instructions: "This info needs to be accurate with your ID document.",
        emailLabel: "Email Address",
        emailPlaceholder: "name@example.com",
        continue: "Continue",
        error: "Please enter a valid email address.",
      },
      homeAddress: {
        title: "Home Address",
        instructions: "This info needs to be accurate with your ID document.",
        addressLabel: "Address",
        addressPlaceholder: "Address Line",
        cityLabel: "City",
        cityPlaceholder: "City, State",
        postCodeLabel: "Post Code",
        postCodePlaceholder: "Ex: 00000",
        completeRegistration: "Complete Registration",
        processing: "Processing...",
        error: {
          title: "Error",
          message: "Please fill in all address fields.",
          authError: "User not authenticated.",
          saveError: "Failed to save data. Please try again.",
        },
      },
      login: {
        title: "Log in to Coinpay",
        subtitle: "Enter your email and password to login",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forgot Password?",
        loginButton: "Login",
        error: {
          title: "Error",
          emptyFields: "Please enter both email and password.",
          emptyEmail: "Please enter your email first.",
          emailNotVerified: "Please verify your email first.",
        },
      },
      homePage: {
        searchPlaceholder: "Search Payments",
        availableBalance: "Available Balance",
        addMoney: "Add Money",
        actions: {
          send: "Send",
          request: "Request",
          bank: "Bank",
        },
        transactions: {
          title: "Transactions",
          spending: "Spending",
          income: "Income",
          bills: "Bills",
          savings: "Savings",
        },
      },
      accountSetup: {
        title: "Setting up your account",
        subtitle: "We are analyzing your data to verify",
        steps: {
          phone: "Phone verified",
          document: "Checking Document ID",
          photo: "Verifying Photo"
        },
        uploadButton: "Upload",
        continueButton: "Continue"
      },
      documentScan: {
        permissionMessage: "We need your permission to show the camera",
        grantPermission: "Grant Permission",
        scanInstruction: "Please scan front of your ID document",
        statusHeading: "ID Verification in progress",
        statusSubtext: "Hold tight, it won't take long",
        captureButton: "Capture Picture",
        saveButton: "Save Picture"
      },
      scanId: {
        title: "Scan ID document to verify your identity",
        subtitle: "Confirm your identity with a few taps on your phone"
      },
      selfieScreen: {
        title: "Take Selfie to verify your identity",
        subtitle: "Quick and easy identification verification using your phone's camera. Confirm your identity with a self-captured photo",
        buttonLabel: "Take a Selfie"
      },
      selfieScan: {
        permissionMessage: "We need your permission to show the camera",
        grantPermission: "Grant Permission",
        instructions: "Take a clear selfie for verification",
        retake: "Retake",
        confirm: "Confirm"
      },
      welcomeScreen: {
        congratulations: "Congratulations! , Welcome to Coinpay",
        welcomeMessage: "We are happy to have you , it's time to send, receive and track your expense",
        continue: "Continue"
      },
      passcode: {
        createTitle: "Create Passcode",
        createSubtitle: "This info needs to be accurate with your document ID",
        confirmTitle: "Confirm Passcode",
        confirmSubtitle: "Please re-enter your passcode for confirmation",
        mismatchError: "Passcodes do not match"
      },
      addCard: {
        title: "Let's add your Card",
        subtitle: "Experience the power of financial organization with our platform",
        addButton: "+ Add your Card",
        homeButton: "Go to HomePage"
      },
      cardDetails: {
        title: "Add your card details",
        subtitle: "Enter your Card details in the below box",
        accountHolderName: "Account Holder Name",
        email: "Email",
        cardNumber: "Card Number",
        expiryDate: "MM/YY",
        cvv: "CVV",
        verifyButton: "Verify",
        placeholders: {
          name: "Name as on card",
          email: "Your email",
          cardNumber: "1234 5678 9012 3456",
          expiryDate: "MM/YY",
          cvv: "123"
        },
        alerts: {
          fillAllFields: "Please fill in all fields correctly",
          error: "Error",
          noUser: "No user is currently logged in.",
          success: "Success",
          cardAdded: "Card added successfully!",
          emailMismatch: "Entered email is not correct",
          genericError: "An error occurred"
        }
      },
      cardList: {
        title: "Your Payment Methods",
        subtitle: "Select or add a payment method",
        noCards: "No cards added yet",
        expires: "Exp",
        addCardButton: "Add Another Card",
        continueButton: "Continue",
        alerts: {
          error: "Error",
          loadFailed: "Failed to load cards",
          deleteFailed: "Failed to delete card"
        }
      },
      updateMoney: {
        title: "Update Balance",
        subtitle: "Add or deduct money from your account",
        amountLabel: "Amount",
        addMoney: "Add Money",
        deductMoney: "Deduct Money",
        customAction: "Custom Transaction",
        adding: "Adding...",
        deducting: "Deducting...",
        success: {
          title: "Success",
          added: "Successfully added {{amount}} to your balance",
          deducted: "Successfully deducted {{amount}} from your balance"
        },
        error: {
          title: "Error",
          amountEmpty: "Please enter an amount",
          invalidAmount: "Please enter a valid positive amount",
          userNotLoggedIn: "You need to be logged in",
          general: "Failed to update balance"
        },
        confirm: {
          title: "Confirm",
          add: "Add {{amount}} to your balance?",
          deduct: "Deduct {{amount}} from your balance?"
        },
        settings: {
          title: "Settings",
          language: "Language",
          theme: "Appearance",
          themeDescription: "Change between light and dark mode",
          account: "Account",
          logout: "Log Out"
        }
      }
      
    
  };
  
  export default en;