import WelcomeScreen from "../../screens/welcome/WelcomeScreen";

const od = {
    onboarding: {
        slide1: "ଲକ୍ଷ ଲକ୍ଷ ଲୋକଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ, ଏକ ଅଂଶ",
        slide2: "ବିଦେଶରେ ଟଙ୍କା ଖର୍ଚ୍ଚ କରନ୍ତୁ, ଏବଂ ଆପଣଙ୍କର ଖର୍ଚ୍ଚକୁ ଟ୍ରାକ୍ କରନ୍ତୁ",
        slide3: "ବିଶ୍ୱର ଯେକ any ଣସି ସ୍ଥାନରୁ ଟଙ୍କା ଗ୍ରହଣ କରନ୍ତୁ",
      },
      common: {
        next: "ପରବର୍ତ୍ତୀ",
        getStarted: "ଆରମ୍ଭ କର",
         error: "ତ୍ରୁଟି"
      },
      registration: {
        title: "ଆପଣଙ୍କର Coinpay ଆକାଉଣ୍ଟ ସୃଷ୍ଟି କରନ୍ତୁ",
        subtitle: "Coinpay ଏକ ଶକ୍ତିଶାଳୀ ଉପକରଣ ଯାହା ଆପଣଙ୍କୁ ସହଜରେ ଟଙ୍କା ପଠାଇବା, ଗ୍ରହଣ କରିବା ଏବଂ ସମସ୍ତ କାରବାର ଟ୍ରାକ୍ କରିବାକୁ ଅନୁମତି ଦେଇଥାଏ |",
        signup: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ",
        login: "ଲଗଇନ୍ କରନ୍ତୁ",
        termsAndPolicy: "ଜାରି ରଖିବା ଦ୍ୱାରା ଆପଣ ଆମର {{terms}} ଏବଂ {{privacy}} ଗ୍ରହଣ କରନ୍ତି |",
        terms: "ସେବା ଷ୍ଟାର୍ଟ",
        privacy: "ଗୋପନୀୟତା ନୀତି"
      },
      createAccount: {
        title: "ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କର ଖାତା ସୃଷ୍ଟି କରିବାକୁ ଆପଣଙ୍କର ଇମେଲ ଏବଂ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
        emailLabel: "ଇମେଲ ଠିକଣା",
        emailPlaceholder: "ଆପଣଙ୍କର ଇମେଲ ପ୍ରବେଶ କରନ୍ତୁ",
        passwordLabel: "ପାସୱାର୍ଡ",
        passwordPlaceholder: "ଆପଣଙ୍କର ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
        signupButton: "ସାଇନ୍ ଅପ୍ କରନ୍ତୁ",
        modal: {
          title: "ଆପଣଙ୍କର ଇମେଲ ଠିକଣା ଯାଞ୍ଚ କରନ୍ତୁ",
          subtext: "ଏହା ସଠିକ୍ କି? {{email}}",
          confirmButton: "ହଁ, ଯାଞ୍ଚ ଇମେଲ ପଠାନ୍ତୁ",
          editButton: "ନାଁ, ଇମେଲ ସଂପାଦନ କରନ୍ତୁ"
        },
        errors: {
          default: "ଖାତା ସୃଷ୍ଟି କରିବାରେ ବିଫଳ",
          emailRequired: "ଦୟାକରି ଏକ ବୈଧ ଇମେଲ ଠିକଣା ପ୍ରବେଶ କରନ୍ତୁ",
          passwordRequired: "ଦୟାକରି ଏକ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
          passwordLength: "ପାସୱାର୍ଡ ଅତିକମରେ 6 ଅକ୍ଷରର ହେବା ଉଚିତ୍",
          emailInUse: "ଇମେଲ ଠିକଣା ପୂର୍ବରୁ ବ୍ୟବହୃତ ହୋଇଛି",
          invalidEmail: "ଇମେଲ ଠିକଣା ଅବୈଧ",
          weakPassword: "ପାସୱାର୍ଡ ଅତି ଦୁର୍ବଳ"
        }
      },

      emailVerification: {
        title: "ଆପଣଙ୍କର ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ",
        sentEmail: "ଆମେ {email} ରେ ଏକ ଯାଞ୍ଚ ଇମେଲ ପଠାଇଛୁ",
        instructions: "ଦୟାକରି ଆପଣଙ୍କର ଇନବକ୍ସ ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଜାରି ରଖିବାକୁ ଯାଞ୍ଚ ଲିଙ୍କ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ |",
        didNotReceive: "ଇମେଲ ଗ୍ରହଣ କରିନାହାଁନ୍ତି?",
        resend: "ପୁନର୍ବାର ପଠାନ୍ତୁ",
        resendIn: "{seconds} ସେକେଣ୍ଡରେ ପୁନର୍ବାର ପଠାନ୍ତୁ",
        verifiedButton: "ମୁଁ ମୋର ଇମେଲ ଯାଞ୍ଚ କରିଛି",
        success: "ସଫଳତା",
        resendSuccess: "ଯାଞ୍ଚ ଇମେଲ ପୁନର୍ବାର ପଠାଯାଇଛି",
        notVerifiedTitle: "ଇମେଲ ଯାଞ୍ଚ ହୋଇନାହିଁ",
        notVerifiedMessage: "ଜାରି ରଖିବା ପୂର୍ବରୁ ଦୟାକରି ଆପଣଙ୍କର ଇମେଲ ଯାଞ୍ଚ କରନ୍ତୁ | ଯଦି ଆପଣ ପୂର୍ବରୁ ଯାଞ୍ଚ କରିସାରିଛନ୍ତି, କିଛି ସମୟ ଅପେକ୍ଷା କରନ୍ତୁ ଏବଂ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |",
        errors: {
          resendFailed: "ଯାଞ୍ଚ ଇମେଲ ପୁନର୍ବାର ପଠାଇବାରେ ବିଫଳ | ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |",
          noUser: "କୌଣସି ଉପଯୋଗକର୍ତ୍ତା ମିଳିଲା ନାହିଁ | ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |",
          verificationCheckFailed: "ଯାଞ୍ଚ ସ୍ଥିତି ଯାଞ୍ଚ କରିବାରେ ବିଫଳ | ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |"
        }
      },
      countrySelector: {
        title: "ବସବାସ ସ୍ଥାନର ଦେଶ",
        instructions: "ଏହି ସୂଚନା ଆପଣଙ୍କର ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟ ସହିତ ମେଳିଥିବା ଦରକାର।",
        selectCountry: "ଆପଣଙ୍କର ଦେଶ ବାଛନ୍ତୁ",
        country: "ଦେଶ",
        continue: "ଅଗ୍ରଗତି କରନ୍ତୁ",
        error: "ଦୟାକରି ଆପଣଙ୍କର ବସବାସ ସ୍ଥାନର ଦେଶ ବାଛନ୍ତୁ।",
      },
      personalInfo: {
        title: "ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ସୂଚନା ଯୋଡନ୍ତୁ",
        instructions: "ଏହି ସୂଚନା ଆପଣଙ୍କର ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟ ସହିତ ମେଳିଥିବା ଦରକାର।",
        fullName: "ପ୍ରକୃତ ନାମ",
        fullNamePlaceholder: "ଆପଣଙ୍କ ପ୍ରକୃତ ନାମ ଲେଖନ୍ତୁ",
        username: "ଉପଯୋଗକର୍ତ୍ତା ନାମ",
        usernamePlaceholder: "ଏକ ଉପଯୋଗକର୍ତ୍ତା ନାମ ଚୟନ କରନ୍ତୁ",
        dateOfBirth: "ଜନ୍ମ ତାରିଖ",
        dateOfBirthPlaceholder: "ମାସ/ଦିନ/ବର୍ଷ",
        continue: "ଅଗ୍ରଗତି କରନ୍ତୁ",
        error: "ଦୟାକରି ସମସ୍ତ ଫିଲ୍ଡ ଭରନ୍ତୁ।",
      },
      emailInfo: {
        title: "ଆପଣଙ୍କର ଇମେଲ ଯୋଡନ୍ତୁ",
        instructions: "ଏହି ସୂଚନା ଆପଣଙ୍କର ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟ ସହିତ ମେଳିଥିବା ଦରକାର।",
        emailLabel: "ଇମେଲ ଠିକଣା",
        emailPlaceholder: "name@example.com",
        continue: "ଅଗ୍ରଗତି କରନ୍ତୁ",
        error: "ଦୟାକରି ଏକ ବୈଧ ଇମେଲ ଠିକଣା ଦାଖଲ କରନ୍ତୁ।",
      },
      homeAddress: {
        title: "ଗୃହ ଠିକଣା",
        instructions: "ଏହି ସୂଚନା ଆପଣଙ୍କର ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟ ସହିତ ମେଳିଥିବା ଦରକାର।",
        addressLabel: "ଠିକଣା",
        addressPlaceholder: "ଠିକଣା ଲାଇନ୍",
        cityLabel: "ସହର",
        cityPlaceholder: "ସହର, ରାଜ୍ୟ",
        postCodeLabel: "ପୋଷ୍ଟକୋଡ୍",
        postCodePlaceholder: "ଉଦାହରଣ: 00000",
        completeRegistration: "ପଞ୍ଜିକରଣ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ",
        processing: "ପ୍ରକ୍ରିୟାରେ...",
        error: {
          title: "ତ୍ରୁଟି",
          message: "ଦୟାକରି ସମସ୍ତ ଠିକଣା ଫିଲ୍ଡ ପୂରଣ କରନ୍ତୁ।",
          authError: "ବ୍ୟବହାରକାରୀ ପ୍ରମାଣିତ ନୁହେଁ।",
          saveError: "ଡାଟା ସଂରକ୍ଷଣରେ ବିଫଳ। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।",
        },
      },
      login: {
        title: "କୋଇନପେ ଲଗଇନ କରନ୍ତୁ",
        subtitle: "ଲଗଇନ କରିବା ପାଇଁ ଆପଣଙ୍କର ଇମେଲ ଏବଂ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
        emailLabel: "ଇମେଲ ଠିକଣା",
        emailPlaceholder: "ଆପଣଙ୍କର ଇମେଲ ପ୍ରବେଶ କରନ୍ତୁ",
        passwordLabel: "ପାସୱାର୍ଡ",
        passwordPlaceholder: "ଆପଣଙ୍କର ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
        forgotPassword: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ?",
        loginButton: "ଲଗଇନ",
        error: {
          title: "ତ୍ରୁଟି",
          emptyFields: "ଦୟାକରି ଦୁଇଟି ଇମେଲ ଏବଂ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ।",
          emptyEmail: "ଦୟାକରି ପ୍ରଥମେ ଆପଣଙ୍କର ଇମେଲ ପ୍ରବେଶ କରନ୍ତୁ।",
          emailNotVerified: "ଦୟାକରି ଆପଣଙ୍କର ଇମେଲ ପ୍ରଥମେ ସତ୍ୟାପିତ କରନ୍ତୁ।",
        },
      },
      homePage: {
        searchPlaceholder: "ପେମେଣ୍ଟ ଖୋଜନ୍ତୁ",
        availableBalance: "ଉପଲବ୍ଧ ବାଲାନ୍ସ",
        addMoney: "ଟଙ୍କା ଯୋଡନ୍ତୁ",
        actions: {
          send: "ପଠାନ୍ତୁ",
          request: "ଅନୁରୋଧ କରନ୍ତୁ",
          bank: "ବ୍ୟାଙ୍କ",
        },
        transactions: {
          title: "ଲେନଦେନ",
          spending: "ଖର୍ଚ୍ଚ",
          income: "ଆୟ",
          bills: "ବିଲ",
          savings: "ଉଦ୍ଧାର",
        },
      },
      accountSetup: {
        title: "ଆପଣଙ୍କର ଖାତା ସେଟଅପ୍ ହେଉଛି",
        subtitle: "ଆମେ ଯାଞ୍ଚ କରିବାକୁ ଆପଣଙ୍କର ତଥ୍ୟ ବିଶ୍ଳେଷଣ କରୁଛୁ",
        steps: {
          phone: "ଫୋନ୍ ଯାଞ୍ଚ ହୋଇଛି",
          document: "ଡକ୍ୟୁମେଣ୍ଟ୍ ଆଇଡି ଯାଞ୍ଚ କରୁଛି",
          photo: "ଫଟୋ ଯାଞ୍ଚ କରୁଛି"
        },
        uploadButton: "ଅପଲୋଡ୍ କରନ୍ତୁ",
        continueButton: "ଜାରି ରଖନ୍ତୁ"
      },
      documentScan: {
        permissionMessage: "କ୍ୟାମେରା ଦେଖାଇବା ପାଇଁ ଆମକୁ ଆପଣଙ୍କର ଅନୁମତି ଆବଶ୍ୟକ |",
        grantPermission: "ଅନୁମତି ଦିଅନ୍ତୁ",
        scanInstruction: "ଦୟାକରି ଆପଣଙ୍କର ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟର ସାମ୍ନା ଭାଗ ସ୍କାନ୍ କରନ୍ତୁ |",
        statusHeading: "ଆଇଡି ଯାଞ୍ଚ ଚାଲିଛି",
        statusSubtext: "ଅପେକ୍ଷା କରନ୍ତୁ, ଏହା ଅଧିକ ସମୟ ନେବ ନାହିଁ |",
        captureButton: "ଫଟୋ ଉଠାନ୍ତୁ",
        saveButton: "ଫଟୋ ସେଭ୍ କରନ୍ତୁ"
      },
      scanId: {
        title: "ଆପଣଙ୍କର ପରିଚୟ ଯାଞ୍ଚ କରିବାକୁ ଆଇଡି ଡକ୍ୟୁମେଣ୍ଟ ସ୍କାନ୍ କରନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କ ଫୋନ୍ ରେ କିଛି ଟ୍ୟାପ୍ ସହିତ ଆପଣଙ୍କର ପରିଚୟ ନିଶ୍ଚିତ କରନ୍ତୁ"
      },
      selfieScreen: {
        title: "ଆପଣଙ୍କର ପରିଚୟ ଯାଞ୍ଚ କରିବାକୁ ସେଲ୍ଫି ନିଅନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କ ଫୋନ୍ ର କ୍ୟାମେରା ବ୍ୟବହାର କରି ଶୀଘ୍ର ଏବଂ ସହଜ ପରିଚୟ ଯାଞ୍ଚ | ଏକ ସ୍ୱ-କ୍ୟାପଚର୍ ଫଟୋ ସହିତ ଆପଣଙ୍କର ପରିଚୟ ନିଶ୍ଚିତ କରନ୍ତୁ",
        buttonLabel: "ସେଲ୍ଫି ନିଅନ୍ତୁ"
      },
      selfieScan: {
        permissionMessage: "ଆମକୁ କ୍ୟାମେରା ଦେଖାଇବା ପାଇଁ ଆପଣଙ୍କର ଅନୁମତି ଆବଶ୍ୟକ",
        grantPermission: "ଅନୁମତି ଦିଅନ୍ତୁ",
        instructions: "ଯାଞ୍ଚ ପାଇଁ ଏକ ସ୍ପଷ୍ଟ ସେଲ୍ଫି ତିଆରି କରନ୍ତୁ",
        retake: "ପୁନର୍ବାର ନିଅନ୍ତୁ",
        confirm: "ନିଶ୍ଚିତ କରନ୍ତୁ"
      },
      welcomeScreen: {
        congratulations: "ଅଭିନନ୍ଦନ! , କଏନପେ ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
        welcomeMessage: "ଆପଣଙ୍କୁ ପାଇବା ପାଇଁ ଆମେ ଖୁସି, ଏବେ ଆପଣ ପଠାନ୍ତୁ, ଗ୍ରହଣ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ଖର୍ଚ୍ଚ ଟ୍ରାକ୍ କରନ୍ତୁ",
        continue: "ଜାରି ରଖନ୍ତୁ"
      },
      passcode: {
        createTitle: "ପାସକୋଡ୍ ସୃଷ୍ଟି କରନ୍ତୁ",
        createSubtitle: "ଏହି ସୂଚନା ଆପଣଙ୍କର ଡକ୍ୟୁମେଣ୍ଟ ଆଇଡି ସହିତ ସଠିକ୍ ହେବା ଆବଶ୍ୟକ",
        confirmTitle: "ପାସକୋଡ୍ ନିଶ୍ଚିତ କରନ୍ତୁ",
        confirmSubtitle: "ଦୟାକରି ନିଶ୍ଚିତକରଣ ପାଇଁ ଆପଣଙ୍କର ପାସକୋଡ୍ ପୁନର୍ବାର ପ୍ରବେଶ କରନ୍ତୁ",
        mismatchError: "ପାସକୋଡ୍ ମେଳ ଖାଉନାହିଁ"
      },
      addCard: {
        title: "ଆପଣଙ୍କର କାର୍ଡ ଯୋଡନ୍ତୁ",
        subtitle: "ଆମର ପ୍ଲାଟଫର୍ମ ସହିତ ଆର୍ଥିକ ସଂଗଠନର ଶକ୍ତି ଅନୁଭବ କରନ୍ତୁ",
        addButton: "+ ଆପଣଙ୍କର କାର୍ଡ ଯୋଡନ୍ତୁ",
        homeButton: "ମୂଳପୃଷ୍ଠାକୁ ଯାଆନ୍ତୁ"
      },
      cardDetails: {
        title: "ଆପଣଙ୍କର କାର୍ଡ ବିବରଣୀ ଯୋଡନ୍ତୁ",
        subtitle: "ନିମ୍ନରେ ଥିବା ବାକ୍ସରେ ଆପଣଙ୍କର କାର୍ଡ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ",
        accountHolderName: "ଆକାଉଣ୍ଟ ଧାରକର ନାମ",
        email: "ଇମେଲ",
        cardNumber: "କାର୍ଡ ନମ୍ବର",
        expiryDate: "ମାସ/ବର୍ଷ",
        cvv: "CVV",
        verifyButton: "ଯାଞ୍ଚ କରନ୍ତୁ",
        placeholders: {
          name: "କାର୍ଡରେ ନାମ",
          email: "ଆପଣଙ୍କର ଇମେଲ",
          cardNumber: "1234 5678 9012 3456",
          expiryDate: "ମାସ/ବର୍ଷ",
          cvv: "123"
        },
        alerts: {
          fillAllFields: "ଦୟାକରି ସମସ୍ତ କ୍ଷେତ୍ରଗୁଡିକୁ ସଠିକ୍ ଭାବରେ ପୂରଣ କରନ୍ତୁ",
          error: "ତ୍ରୁଟି",
          noUser: "ବର୍ତ୍ତମାନ କେହି ଉପଯୋଗକର୍ତ୍ତା ଲଗ୍ ଇନ୍ ହୋଇନାହାଁନ୍ତି",
          success: "ସଫଳତା",
          cardAdded: "କାର୍ଡ ସଫଳତାର ସହିତ ଯୋଡା ଯାଇଛି!",
          emailMismatch: "ପ୍ରବେଶ କରାଯାଇଥିବା ଇମେଲ ସଠିକ୍ ନୁହେଁ",
          genericError: "ଏକ ତ୍ରୁଟି ଘଟିଲା"
        }
      },
      cardList: {
        title: "ଆପଣଙ୍କର ଦେୟ ପଦ୍ଧତି",
        subtitle: "ଏକ ଦେୟ ପଦ୍ଧତି ବାଛନ୍ତୁ କିମ୍ବା ଯୋଡନ୍ତୁ",
        noCards: "ଏଯାବତ୍ କୌଣସି କାର୍ଡ ଯୋଡା ଯାଇନାହିଁ",
        expires: "ସମାପ୍ତି",
        addCardButton: "ଅନ୍ୟ ଏକ କାର୍ଡ ଯୋଡନ୍ତୁ",
        continueButton: "ଜାରି ରଖନ୍ତୁ",
        alerts: {
          error: "ତ୍ରୁଟି",
          loadFailed: "କାର୍ଡଗୁଡିକୁ ଲୋଡ୍ କରିବାରେ ବିଫଳ",
          deleteFailed: "କାର୍ଡ ଡିଲିଟ୍ କରିବାରେ ବିଫଳ"
        },
        settings: {
          title: "ସଂଯୋଜନା",
          language: "ଭାଷା",
          theme: "ଦୃଶ୍ୟ",
          themeDescription: "ଆଲୋକ ଏବଂ ଅନ୍ଧକାର ମୋଡ୍ ମଧ୍ୟରେ ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
          account: "ଖାତା",
          logout: "ପ୍ରସ୍ଥାନ କରନ୍ତୁ"
        },
        profileScreen: {
          title: "ମୋର ପ୍ରୋଫାଇଲ୍",
          lightMode: "ଆଲୋକ ମୋଡ୍",
          darkMode: "ଅନ୍ଧକାର ମୋଡ୍",
          personalInfo: "ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ",
          bankCards: "ବ୍ୟାଙ୍କ ଏବଂ କାର୍ଡଗୁଡିକ",
          transactions: "ବ୍ୟବସ୍ଥାପନା",
          settings: "ସେଟିଂସ୍",
          dataPrivacy: "ଡାଟା ଗୋପନୀୟତା",
          logout: "ଲଗଆଉଟ୍"
        }
      },
      sendMoney: {
        noName: "ନାମ ନାହିଁ",
        chooseRecipient: "ଗ୍ରହୀତା ଚୟନ କରନ୍ତୁ",
        selectRecipientMessage: "ଦୟାକରି ଟଙ୍କା ପଠାଇବା ପାଇଁ ଆପଣଙ୍କର ଗ୍ରହୀତା ଚୟନ କରନ୍ତୁ",
        searchPlaceholder: "ଗ୍ରହୀତା ଖୋଜନ୍ତୁ",
        mostRecent: "ସଦ୍ୟତମ",
        noRecipientsAvailable: "କୌଣସି ଗ୍ରହୀତା ଉପଲବ୍ଧ ନାହିଁ",
        noMatchingRecipients: "କୌଣସି ମେଳ ଖାଉଥିବା ଗ୍ରହୀତା ମିଳିଲା ନାହିଁ"
      },
      sendAmount: {
        title: "ପରିମାଣ ପ୍ରବେଶ କରନ୍ତୁ",
        subtitle: "ଆପଣ ପଠାଇବାକୁ ଚାହୁଁଥିବା ପରିମାଣ ପ୍ରବେଶ କରନ୍ତୁ",
        currencies: {
          usd: "ଆମେରିକୀୟ ଡଲାର",
          eur: "ୟୁରୋ",
          gbp: "ବ୍ରିଟିଶ୍ ପାଉଣ୍ଡ",
          jpy: "ଜାପାନୀ ୟେନ",
          aud: "ଅଷ୍ଟ୍ରେଲିଆନ୍ ଡଲାର"
        }
      },
      selectAccount: {
        title: "ଖାତା ଚୟନ କରନ୍ତୁ",
        chooseAccount: "ଖାତା ଚୟନ କରନ୍ତୁ",
        noCards: "କୌଣସି କାର୍ଡ ଉପଲବ୍ଧ ନାହିଁ। ଦୟାକରି ପ୍ରଥମେ ଏକ କାର୍ଡ ଯୋଡନ୍ତୁ।",
        payButton: "ଦେୟ ଦିଅନ୍ତୁ {{currency}} {{amount}}",
        processing: "ପ୍ରକ୍ରିୟାକରଣ...",
        cardTypes: {
          visa: "ଭିଜା",
          mastercard: "ମାଷ୍ଟରକାର୍ଡ",
          amex: "ଆମେକ୍ସ",
          other: "କାର୍ଡ"
        },
        cardNumber: "•••• •••• •••• {{lastFour}}",
        cardDetails: "{{name}} • ସମାପ୍ତି {{expiry}}",
        errors: {
          notLoggedIn: "ଦେୟ ଦେବା ପାଇଁ ଆପଣଙ୍କୁ ଲଗ୍ ଇନ୍ ହୋଇଥିବା ଆବଶ୍ୟକ",
          invalidAmount: "ଅବୈଧ ପରିମାଣ",
          paymentFailed: "ଦେୟ ପ୍ରକ୍ରିୟାକରଣ ବିଫଳ ହେଲା"
        }
      },
      purposeScreen: {
        title: "ଉଦ୍ଦେଶ୍ୟ ଚୟନ କରନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କର ଦେୟର ଉଦ୍ଦେଶ୍ୟ ଚୟନ କରନ୍ତୁ",
        purposes: {
          personal: {
            title: "ବ୍ୟକ୍ତିଗତ",
            subtitle: "ସାଙ୍ଗମାନଙ୍କୁ ଏବଂ ପରିବାରକୁ ଦେୟ ଦିଅନ୍ତୁ"
          },
          business: {
            title: "ବ୍ୟବସାୟ",
            subtitle: "କର୍ମଚାରୀମାନଙ୍କୁ ଦେୟ ଦିଅନ୍ତୁ"
          },
          payment: {
            title: "ଦେୟ",
            subtitle: "ବିଲ୍ ପାଇଁ ଦେୟ ଦିଅନ୍ତୁ"
          }
        }
      },
      paymentCompleted: {
        successMessage: "ଟ୍ରାନ୍ସାକ୍ସନ୍ ସମ୍ପୂର୍ଣ୍ଣ ହେଲା {{date}} ରେ {{time}}",
        processing: "ଦେୟ ପ୍ରକ୍ରିୟାକରଣ...",
        updating: "ଟ୍ରାନ୍ସାକ୍ସନ୍ ସମ୍ପୂର୍ଣ୍ଣ ହେଉଛି...",
        paymentMethod: "ଦେୟ ପଦ୍ଧତି",
        amount: "ପରିମାଣ",
        purpose: "ଉଦ୍ଦେଶ୍ୟ",
        backToHome: "ମୂଳପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
        anotherPayment: "ଅନ୍ୟ ଏକ ଦେୟ କରନ୍ତୁ",
        thankYouMessage: "ଟଙ୍କା ପଠାଇବା ପାଇଁ ଆମ ଆପ୍ ବ୍ୟବହାର କରିଥିବାରୁ ଧନ୍ୟବାଦ। ଯଦି ଆପଣଙ୍କର କୌଣସି ପ୍ରଶ୍ନ କିମ୍ବା ଚିନ୍ତା ଅଛି, ଦୟାକରି",
        contactUs: "ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ",
        contactEmail: "support@yourapp.com",
        errors: {
          transactionFailed: "ଟ୍ରାନ୍ସାକ୍ସନ୍ ସମ୍ପୂର୍ଣ୍ଣ କରିବାରେ ବିଫଳ। ଦୟାକରି ପରେ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।"
        }
      },
      scanQr: {
        title: "QR କୋଡ୍ ସ୍କାନ୍ କରନ୍ତୁ",
        instructions: "ସ୍କାନ୍ କରିବା ପାଇଁ QR କୋଡ୍ କୁ ଫ୍ରେମ୍ ଭିତରେ ସଜାଡନ୍ତୁ",
        requestingPermission: "କ୍ୟାମେରା ଅନୁମତି ପାଇଁ ଅନୁରୋଧ...",
        permissionRequired: "QR କୋଡ୍ ସ୍କାନ୍ କରିବା ପାଇଁ କ୍ୟାମେରା ଅନୁମତି ଆବଶ୍ୟକ।",
        enableCameraAccess: "ଜାରି ରଖିବା ପାଇଁ ଦୟାକରି ସେଟିଂସ୍ ରେ କ୍ୟାମେରା ପ୍ରବେଶ ସକ୍ଷମ କରନ୍ତୁ।",
        openSettings: "ସେଟିଂସ୍ ଖୋଲନ୍ତୁ",
        tryAgain: "ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ",
        troubleshooting: "ସ୍କାନ୍ କରିବାରେ ସମସ୍ୟା ହେଉଛି? ନିକଟରେ ଯାଇ କିମ୍ବା କୋଣ ସଂଯୋଜନ କରି ଚେଷ୍ଟା କରନ୍ତୁ।",
        invalidQr: {
          title: "ଅବୈଧ QR କୋଡ୍",
          message: "ସ୍କାନ୍ କରାଯାଇଥିବା QR କୋଡ୍ ରେ ବୈଧ ଗ୍ରହୀତା ସୂଚନା ନାହିଁ।"
        },
        permission: {
          title: "କ୍ୟାମେରା ଅନୁମତି",
          message: "QR କୋଡ୍ ସ୍କାନ୍ କରିବା ପାଇଁ ଏହି ଆପ୍ କୁ ଆପଣଙ୍କ କ୍ୟାମେରା ପ୍ରବେଶ ଆବଶ୍ୟକ।"
        },
        defaultRecipient: {
          name: "QR ଗ୍ରହୀତା"
        }
      },
      profile: {
        title: "ମୋର ପ୍ରୋଫାଇଲ୍",
        options: {
          darkMode: "ଡାର୍କ ମୋଡ୍",
          lightMode: "ଲାଇଟ୍ ମୋଡ୍",
          personalInfo: "ବ୍ୟକ୍ତିଗତ ସୂଚନା",
          bankCards: "ବ୍ୟାଙ୍କ ଏବଂ କାର୍ଡଗୁଡିକ",
          transactions: "ଟ୍ରାନ୍ସାକ୍ସନ୍‌ଗୁଡିକ",
          settings: "ସେଟିଂସ୍",
          dataPrivacy: "ଡାଟା ଗୋପନୀୟତା",
          logout: "ଲଗ୍ ଆଉଟ୍"
        }
      },
      sendRequest: {
        title: "ଅନୁରୋଧ ନିଶ୍ଚିତ କରନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କର ଅନୁରୋଧ ବିବରଣୀ ସମୀକ୍ଷା କରନ୍ତୁ",
        amountLabel: "ପରିମାଣ",
        purposeLabel: "ଉଦ୍ଦେଶ୍ୟ",
        requestButton: "{{amount}} {{currency}} ର ଅନୁରୋଧ କରନ୍ତୁ"
      },
      requestRecipient: {
        title: "ଗ୍ରହୀତା ଚୟନ କରନ୍ତୁ",
        subtitle: "ଦୟାକରି ଟଙ୍କା ମାଗିବା ପାଇଁ ଗ୍ରହୀତା ଚୟନ କରନ୍ତୁ",
        searchPlaceholder: "ଗ୍ରହୀତା ଖୋଜନ୍ତୁ",
        mostRecent: "ସଦ୍ୟତମ",
        noRecipients: "କୌଣସି ଗ୍ରହୀତା ଉପଲବ୍ଧ ନାହିଁ",
        noMatches: "କୌଣସି ମେଳ ଖାଉଥିବା ଗ୍ରହୀତା ମିଳିଲା ନାହିଁ"
      },
      requestPurpose: {
        title: "ଉଦ୍ଦେଶ୍ୟ ଚୟନ କରନ୍ତୁ",
        subtitle: "ଆପଣଙ୍କର ଅନୁରୋଧର ଉଦ୍ଦେଶ୍ୟ ଚୟନ କରନ୍ତୁ",
        purposes: {
          personal: {
            title: "ବ୍ୟକ୍ତିଗତ",
            subtitle: "ସାଙ୍ଗମାନଙ୍କ ଏବଂ ପରିବାରଠାରୁ ଅନୁରୋଧ କରନ୍ତୁ"
          },
          business: {
            title: "ବ୍ୟବସାୟ",
            subtitle: "କର୍ମଚାରୀ କିମ୍ବା ଗ୍ରାହକଙ୍କଠାରୁ ଅନୁରୋଧ କରନ୍ତୁ"
          }
        }
      },
      requestAmount: {
        title: "ପରିମାଣ ପ୍ରବେଶ କରନ୍ତୁ",
        subtitle: "ଆପଣ ମାଗିବାକୁ ଚାହୁଁଥିବା ପରିମାଣ ପ୍ରବେଶ କରନ୍ତୁ"
      },
      currencies: {
        usd: "ଆମେରିକୀୟ ଡଲାର",
        eur: "ୟୁରୋ",
        gbp: "ବ୍ରିଟିଶ୍ ପାଉଣ୍ଡ",
        jpy: "ଜାପାନୀ ୟେନ",
        aud: "ଅଷ୍ଟ୍ରେଲିଆନ୍ ଡଲାର"
      },
      months: {
        january: "ଜାନୁଆରୀ",
        february: "ଫେବୃଆରୀ",
        march: "ମାର୍ଚ୍ଚ",
        april: "ଅପ୍ରେଲ",
        may: "ମଇ",
        june: "ଜୁନ",
        july: "ଜୁଲାଇ",
        august: "ଅଗଷ୍ଟ",
        september: "ସେପ୍ଟେମ୍ବର",
        october: "ଅକ୍ଟୋବର",
        november: "ନଭେମ୍ବର",
        december: "ଡିସେମ୍ବର"
      },
      spending: {
        tabs: {
          spending: "ଖର୍ଚ୍ଚ",
          income: "ଆୟ",
          bills: "ବିଲ୍‌ଗୁଡିକ",
          savings: "ସଞ୍ଚୟ"
        },
        totalSpend: "ସର୍ବମୋଟ ଖର୍ଚ୍ଚ",
        totalIncome: "ସର୍ବମୋଟ ଆୟ",
        totalBills: "ସର୍ବମୋଟ ବିଲ୍‌",
        totalSavings: "ସର୍ବମୋଟ ସଞ୍ଚୟ",
        availableBalance: "ଉପଲବ୍ଧ ବାକି",
        list: "ତାଲିକା"
      },
      qrCode: {
        requestPayment: "ଦେୟ ଅନୁରୋଧ କରନ୍ତୁ",
        shareToReceive: "ଗ୍ରହଣ କରିବା ପାଇଁ ଅଂଶୀଦାର କରନ୍ତୁ"
      }
      
};
export default od;