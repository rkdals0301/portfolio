
    importScripts(
      'https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyDSTw8xqokcFAjOUD4-aNdTmVe_ivroNiI","authDomain":"portfolio-6ba9b.firebaseapp.com","projectId":"portfolio-6ba9b","storageBucket":"portfolio-6ba9b.appspot.com","messagingSenderId":"933434969739","appId":"1:933434969739:web:578a3dd196fab98a714e8e","measurementId":"G-TG4TCZXHXQ"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    