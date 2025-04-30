import WelcomeScreen from "../../screens/welcome/WelcomeScreen";

const hi ={
    onboarding: {
        slide1: "लाखों लोगों द्वारा विश्वसनीय, एक हिस्सा",
        slide2: "विदेश में पैसा खर्च करें, और अपने खर्च को ट्रैक करें",
        slide3: "दुनिया में कहीं से भी पैसा प्राप्त करें",
      },
      common: {
        next: "अगला",
        getStarted: "शुरू हो जाओ",
        error: "त्रुटि"
      },
      registration: {
        title: "अपना Coinpay अकाउंट बनाएं",
        subtitle: "Coinpay एक शक्तिशाली उपकरण है जो आपको आसानी से पैसा भेजने, प्राप्त करने और सभी लेनदेन को ट्रैक करने की अनुमति देता है।",
        signup: "साइन अप करें",
        login: "लॉग इन करें",
        termsAndPolicy: "जारी रखने पर आप हमारी {{terms}} और {{privacy}} स्वीकार करते हैं",
        terms: "सेवा की शर्तें",
        privacy: "गोपनीयता नीति"
      },
      createAccount: {
        title: "खाता बनाएं",
        subtitle: "अपना खाता बनाने के लिए अपना ईमेल और पासवर्ड दर्ज करें",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
        signupButton: "साइन अप करें",
        modal: {
          title: "अपना ईमेल पता सत्यापित करें",
          subtext: "क्या यह सही है? {{email}}",
          confirmButton: "हां, सत्यापन ईमेल भेजें",
          editButton: "नहीं, ईमेल संपादित करें"
        },
        errors: {
          default: "खाता बनाने में विफल",
          emailRequired: "कृपया एक वैध ईमेल पता दर्ज करें",
          passwordRequired: "कृपया एक पासवर्ड दर्ज करें",
          passwordLength: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए",
          emailInUse: "ईमेल पता पहले से ही उपयोग में है",
          invalidEmail: "ईमेल पता अमान्य है",
          weakPassword: "पासवर्ड बहुत कमजोर है"
        }
      },
      emailVerification: {
        title: "अपना ईमेल सत्यापित करें",
        sentEmail: "हमने {email} पर एक सत्यापन ईमेल भेजा है",
        instructions: "कृपया अपने इनबॉक्स की जांच करें और जारी रखने के लिए सत्यापन लिंक पर क्लिक करें।",
        didNotReceive: "ईमेल प्राप्त नहीं हुआ?",
        resend: "पुनः भेजें",
        resendIn: "{seconds} सेकंड में पुनः भेजें",
        verifiedButton: "मैंने अपना ईमेल सत्यापित कर लिया है",
        success: "सफलता",
        resendSuccess: "सत्यापन ईमेल पुनः भेज दिया गया है",
        notVerifiedTitle: "ईमेल सत्यापित नहीं हुआ",
        notVerifiedMessage: "जारी रखने से पहले कृपया अपना ईमेल सत्यापित करें। यदि आप पहले ही सत्यापित कर चुके हैं, तो कुछ क्षण प्रतीक्षा करें और पुनः प्रयास करें।",
        errors: {
          resendFailed: "सत्यापन ईमेल पुनः भेजने में विफल। कृपया पुनः प्रयास करें।",
          noUser: "कोई उपयोगकर्ता नहीं मिला। कृपया पुनः प्रयास करें।",
          verificationCheckFailed: "सत्यापन स्थिति की जांच करने में विफल। कृपया पुनः प्रयास करें।"
        }
      },
      countrySelector: {
        title: "निवास का देश",
        instructions: "यह जानकारी आपके आईडी दस्तावेज़ से मेल खानी चाहिए।",
        selectCountry: "अपना देश चुनें",
        country: "देश",
        continue: "जारी रखें",
        error: "कृपया अपना निवास देश चुनें।",
      },
      personalInfo: {
        title: "अपनी व्यक्तिगत जानकारी जोड़ें",
        instructions: "यह जानकारी आपके आईडी दस्तावेज़ से मेल खानी चाहिए।",
        fullName: "पूरा नाम",
        fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
        username: "उपयोगकर्ता नाम",
        usernamePlaceholder: "उपयोगकर्ता नाम चुनें",
        dateOfBirth: "जन्म तिथि",
        dateOfBirthPlaceholder: "महीना/दिन/वर्ष",
        continue: "जारी रखें",
        error: "कृपया सभी फ़ील्ड भरें।",
      },
      emailInfo: {
        title: "अपना ईमेल जोड़ें",
        instructions: "यह जानकारी आपके आईडी दस्तावेज़ से मेल खानी चाहिए।",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "name@example.com",
        continue: "जारी रखें",
        error: "कृपया एक वैध ईमेल पता दर्ज करें।",
      },
      homeAddress: {
        title: "घर का पता",
        instructions: "यह जानकारी आपके आईडी दस्तावेज़ से मेल खानी चाहिए।",
        addressLabel: "पता",
        addressPlaceholder: "पता रेखा",
        cityLabel: "शहर",
        cityPlaceholder: "शहर, राज्य",
        postCodeLabel: "पिन कोड",
        postCodePlaceholder: "उदाहरण: 00000",
        completeRegistration: "पंजीकरण पूरा करें",
        processing: "प्रोसेसिंग...",
        error: {
          title: "त्रुटि",
          message: "कृपया सभी पता फ़ील्ड भरें।",
          authError: "उपयोगकर्ता प्रमाणीकृत नहीं है।",
          saveError: "डेटा सहेजने में विफल। कृपया पुनः प्रयास करें।",
        },
      },
      login: {
        title: "कॉइनपे में लॉगिन करें",
        subtitle: "लॉगिन करने के लिए अपना ईमेल और पासवर्ड दर्ज करें",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
        forgotPassword: "पासवर्ड भूल गए?",
        loginButton: "लॉगिन",
        error: {
          title: "त्रुटि",
          emptyFields: "कृपया दोनों ईमेल और पासवर्ड दर्ज करें।",
          emptyEmail: "कृपया पहले अपना ईमेल दर्ज करें।",
          emailNotVerified: "कृपया पहले अपना ईमेल सत्यापित करें।",
        },
      },
      homePage: {
        searchPlaceholder: "भुगतान खोजें",
        availableBalance: "उपलब्ध शेष राशि",
        addMoney: "पैसे जोड़ें",
        actions: {
          send: "भेजें",
          request: "अनुरोध करें",
          bank: "बैंक",
        },
        transactions: {
          title: "लेनदेन",
          spending: "खर्च",
          income: "आय",
          bills: "बिल",
          savings: "बचत",
        },
      },
      accountSetup: {
        title: "आपका खाता सेटअप हो रहा है",
        subtitle: "हम आपके डेटा को सत्यापित करने के लिए विश्लेषण कर रहे हैं",
        steps: {
          phone: "फोन सत्यापित",
          document: "दस्तावेज़ आईडी की जाँच",
          photo: "फोटो सत्यापित किया जा रहा है"
        },
        uploadButton: "अपलोड",
        continueButton: "जारी रखें"
      },
      documentScan: {
        permissionMessage: "हमें कैमरा दिखाने के लिए आपकी अनुमति चाहिए",
        grantPermission: "अनुमति दें",
        scanInstruction: "कृपया अपने आईडी दस्तावेज़ का सामने का हिस्सा स्कैन करें",
        statusHeading: "आईडी सत्यापन प्रगति पर है",
        statusSubtext: "कृपया प्रतीक्षा करें, इसमें ज्यादा समय नहीं लगेगा",
        captureButton: "तस्वीर लें",
        saveButton: "तस्वीर सहेजें"
      },
      scanId: {
        title: "अपनी पहचान सत्यापित करने के लिए आईडी दस्तावेज़ स्कैन करें",
        subtitle: "अपने फोन पर कुछ टैप के साथ अपनी पहचान की पुष्टि करें"
      },
      selfieScreen: {
        title: "अपनी पहचान सत्यापित करने के लिए सेल्फी लें",
        subtitle: "अपने फोन के कैमरे का उपयोग करके त्वरित और आसान पहचान सत्यापन। एक स्व-कैप्चर की गई फोटो के साथ अपनी पहचान की पुष्टि करें",
        buttonLabel: "सेल्फी लें"
      },
      selfieScan: {
        permissionMessage: "हमें कैमरा दिखाने के लिए आपकी अनुमति चाहिए",
        grantPermission: "अनुमति दें",
        instructions: "सत्यापन के लिए एक स्पष्ट सेल्फी लें",
        retake: "फिर से लें",
        confirm: "पुष्टि करें"
      },
      welcomeScreen: {
        congratulations: "बधाई हो! , कॉइनपे में आपका स्वागत है",
        welcomeMessage: "आपको हमारे साथ पाकर हमें खुशी हुई, अब आप भेजने, प्राप्त करने और अपने खर्चों को ट्रैक करने के लिए तैयार हैं",
        continue: "जारी रखें"
      },
      passcode: {
        createTitle: "पासकोड बनाएं",
        createSubtitle: "यह जानकारी आपके दस्तावेज़ आईडी से सटीक होनी चाहिए",
        confirmTitle: "पासकोड की पुष्टि करें",
        confirmSubtitle: "पुष्टि के लिए कृपया अपना पासकोड फिर से दर्ज करें",
        mismatchError: "पासकोड मेल नहीं खाते"
      },
      addCard: {
        title: "अपना कार्ड जोड़ें",
        subtitle: "हमारे प्लेटफॉर्म के साथ वित्तीय संगठन की शक्ति का अनुभव करें",
        addButton: "+ अपना कार्ड जोड़ें",
        homeButton: "होमपेज पर जाएं"
      },
      cardDetails: {
        title: "अपने कार्ड का विवरण जोड़ें",
        subtitle: "नीचे दिए गए बॉक्स में अपने कार्ड का विवरण दर्ज करें",
        accountHolderName: "खाता धारक का नाम",
        email: "ईमेल",
        cardNumber: "कार्ड नंबर",
        expiryDate: "महीना/साल",
        cvv: "सीवीवी",
        verifyButton: "सत्यापित करें",
        placeholders: {
          name: "कार्ड पर नाम",
          email: "आपका ईमेल",
          cardNumber: "1234 5678 9012 3456",
          expiryDate: "महीना/साल",
          cvv: "123"
        },
        alerts: {
          fillAllFields: "कृपया सभी फ़ील्ड सही ढंग से भरें",
          error: "त्रुटि",
          noUser: "कोई उपयोगकर्ता वर्तमान में लॉग इन नहीं है",
          success: "सफलता",
          cardAdded: "कार्ड सफलतापूर्वक जोड़ा गया!",
          emailMismatch: "दर्ज किया गया ईमेल सही नहीं है",
          genericError: "एक त्रुटि हुई"
        }
      },
      cardList: {
        title: "आपके भुगतान तरीके",
        subtitle: "एक भुगतान विधि चुनें या जोड़ें",
        noCards: "अभी तक कोई कार्ड नहीं जोड़ा गया",
        expires: "समाप्ति",
        addCardButton: "एक और कार्ड जोड़ें",
        continueButton: "जारी रखें",
        alerts: {
          error: "त्रुटि",
          loadFailed: "कार्ड लोड करने में विफल",
          deleteFailed: "कार्ड हटाने में विफल"
        },
        settings: {
          title: "सेटिंग्स",
          language: "भाषा",
          theme: "प्रकटन",
          themeDescription: "लाइट और डार्क मोड के बीच बदलें",
          account: "खाता",
          logout: "लॉग आउट करें"
        },
        profileScreen: {
          title: "मेरी प्रोफाइल",
          lightMode: "लाइट मोड",
          darkMode: "डार्क मोड",
          personalInfo: "व्यक्तिगत जानकारी",
          bankCards: "बैंक और कार्ड",
          transactions: "लेन-देन",
          settings: "सेटिंग्स",
          dataPrivacy: "डेटा गोपनीयता",
          logout: "लॉगआउट"
        }
      }
      
};
export default hi;