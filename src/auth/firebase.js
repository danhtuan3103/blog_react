import Cookies from 'universal-cookie';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import axios from 'axios';

const cookies = new Cookies();

const firebaseConfig = {
    apiKey: 'AIzaSyCQb5F1TcYjqFXiJ0yie6DUVz1TJO0EpsM',
    authDomain: 'chatapp-auth-001.firebaseapp.com',
    projectId: 'chatapp-auth-001',
    storageBucket: 'chatapp-auth-001.appspot.com',
    messagingSenderId: '791015106962',
    appId: '1:791015106962:web:994278a4ec2c080b6f794b',
    measurementId: 'G-3YFSQVXQHK',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const providerGG = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
export const signInWithGoogle = (path) => {
    signInWithPopup(auth, providerGG)
        .then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const avatar = result.user.photoURL;
            cookies.set('USER_INFO', { name, email, avatar });
            window.location.href = path ? path : '/messenger';
        })
        .catch((error) => {
            console.log(error);
        });
};

export const signInWithFacebook = (path) => {
    signInWithPopup(auth, providerFB)
        .then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const avatar = result.user.photoURL;

            cookies.set('USER_INFO', { name, email, avatar });
            window.location.href = path ? path : '/messenger';
        })
        .catch((error) => {
            console.log(error);
        });
};
