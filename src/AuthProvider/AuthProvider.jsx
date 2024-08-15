

// import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// // import { auth } from "../firebase/firebase.init"
// // import axios from "axios";
// import { auth } from "../firebase/firebase.config";

// export const AuthContext = createContext(null)


// // eslint-disable-next-line react/prop-types
// const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     const googleProvider = new GoogleAuthProvider();
//     const githubProvider = new GithubAuthProvider();

//     const registerUser = (email, password) => {
//         setLoading(true)
//         return createUserWithEmailAndPassword(auth, email, password)
//         // .then(result => console.log(result.user))
//     }



//     const loginUser = (email, password) => {
//         setLoading(true)
//         return signInWithEmailAndPassword(auth, email, password)
//         //    .then(result => console.log(result.user))
//     }
//     const googleLogin = () => {
//         setLoading(true)
//         return signInWithPopup(auth, googleProvider)
//     }

//     const githubLogin = () => {
//         setLoading(true)
//         return signInWithPopup(auth, githubProvider)
//     }

//     const logOut = () => {
//         setLoading(true)
//         return signOut(auth)
//     }

//     // useEffect(() => {
//     //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
//     //         console.log('current value of the current user, ', currentUser);
//     //         const userEmail = currentUser?.email || user?.email;
//     //         const loggedUser = { email: userEmail }

//     //         setUser(currentUser)
//     //         setLoading(false)
//     //         // if user exits then issue token
//     //         if (currentUser) {

//     //             axios.post('https://volunteer-server-one.vercel.app/jwt', loggedUser, {
//     //                 withCredentials: true
//     //             })
//     //                 .then(res => {
//     //                     console.log('token reponse', res.data);
//     //                 })
//     //         }
//     //         else {
//     //             axios('https://volunteer-server-one.vercel.app/logOut', {}, {
//     //                 withCredentials: true
//     //             })
//     //             .then(res=>{
//     //                 console.log(res.data);
//     //             })
//     //         }
//     //     });
//     //     return () => {
//     //         unSubscribe()
//     //     }
//     // }, [])

//     const authInfo = {
//         registerUser,
//         loginUser,
//         googleLogin,
//         githubLogin,
//         user,
//         logOut,
//         loading

//     }

//     return (
//         <div>

//             <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//         </div>
//     );
// };

// export default AuthProvider;

import { 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; // Ensure this path is correct

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                setLoading(false);
            });
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);
                setLoading(false);
            });
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
                setLoading(false);
            });
    };

    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
            .then(result => {
                setUser(result.user);
                setLoading(false);
            });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth).then(() => {
            setUser(null);
            setLoading(false);
        });
    };

    const updateUserProfile = (displayName, photoURL) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, { displayName, photoURL })
                .then(() => {
                    setUser(auth.currentUser);
                });
        } else {
            return Promise.reject("No user is signed in");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        registerUser,
        loginUser,
        googleLogin,
        githubLogin,
        updateUserProfile, // Add this to context so it can be accessed in components
        logOut,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
