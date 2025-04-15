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
      
};
export default hi;