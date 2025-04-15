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
    
  };
  
  export default en;