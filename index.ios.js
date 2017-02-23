/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Navigator,
    AppRegistry,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import Signup from './src/pages/Signup';
import Account from './src/pages/Account';

import Login from './src/pages/Login';
import styles from './src/styles/baseStyles.js';



import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC-yI7KXBNllNRFCXb1kjoRzvvNgLXTkkA",
    authDomain: "testauthen-72897.firebaseapp.com",
    databaseURL: "https://testauthen-72897.firebaseio.com",
    storageBucket: "testauthen-72897.appspot.com",
    messagingSenderId: "431623415174"
};
// Initialize the firebase app here and pass it to other components as needed. Only initialize on startup.
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class testAuthen extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the page is the screen we want to show the user, we will determine that
            // based on what user the firebase api returns to us.
            page: null
        };
    }

    render() {
       /* return (
            // For now our navigator will always take us to the signup page.
            // We will use a transition where the new page will slide in from the right.
            <Navigator
                initialRoute={{component: Login}}
                configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
                renderScene={(route, navigator) => {
          if(route.component){
            // Pass the navigator the the component so it can navigate as well.
            // Pass firebaseApp so it can make calls to firebase.
            return React.createElement(route.component, { navigator, firebaseApp});
          }
      }} />
        );
    }*/

            if (this.state.page) {
                return (
                    // Take the user to whatever page we set the state to.
                    // We will use a transition where the new page will slide in from the right.
                    <Navigator
                        initialRoute={{component: this.state.page}}
                        configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
                        renderScene={(route, navigator) => {
            if(route.component){
              // Pass the navigator the the page so it can navigate as well.
              // Pass firebaseApp so it can make calls to firebase.
              return React.createElement(route.component, { navigator, firebaseApp});
            }
        }} />
                );
            } else {
                return (
                    // Our default loading view while waiting to hear back from firebase
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <ActivityIndicator size="large" />
                        </View>
                    </View>
                );
            }
        }

    componentWillMount(){
        // We must asynchronously get the auth state, if we use currentUser here, it'll be null
        const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
            // If the user is logged in take them to the accounts screen
            if (user != null) {
                this.setState({page: Account});
                return;
            }
            // otherwise have them login
            this.setState({page: Login});
            // unsubscribe this observer
            unsubscribe();
        });
    }

}

AppRegistry.registerComponent('testAuthen', () => testAuthen);
