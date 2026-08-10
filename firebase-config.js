(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAFPAWthtT97p4NIccpKmJOLWIzcNUJgxE",
    authDomain: "michael-otieno-96ffc.firebaseapp.com",
    projectId: "michael-otieno-96ffc",
    storageBucket: "michael-otieno-96ffc.firebasestorage.app",
    messagingSenderId: "188281307974",
    appId: "1:188281307974:web:e1bcc5cbf9cb6954129b47",
    measurementId: "G-JCHCZLX0GL"
  };

  if (typeof window !== 'undefined') {
    window.FIREBASE_CONFIG = firebaseConfig;
  }

  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    if (typeof window !== 'undefined') {
      window.db = window.db || firebase.firestore();
      window.storage = window.storage || firebase.storage();
      window.auth = window.auth || firebase.auth();
    }
  }
})();
