import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Link,Redirect } from "react-router-dom";
import * as firebase from 'firebase';
let accepted_emails = ["guyhakim1@gmail.com", "shaike77@gmail.com", "arbel1992@gmail.com", "proj.t.talk@gmail.com"]
let LoggedUser = false
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
const firebaseConfig = {
    apiKey: "AIzaSyCJMG4k4d-wotIV-AGUSDuAqUscpDU_LMU",
    authDomain: "t-talk-game-1045a.firebaseapp.com",
    databaseURL: "https://t-talk-game-1045a.firebaseio.com",
    projectId: "t-talk-game",
    storageBucket: "t-talk-game.appspot.com",
    messagingSenderId: "215575410414",
    appId: "1:215575410414:web:ec69197d49f7cf2e7ce5ff"
  };
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({
    timestampsInSnapshots: true
})
const myFirestore = firebase.firestore()
const storage = firebase.storage();
document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app()
    console.log(app)
});

class HomePage extends Component {
    constructor() {
        super();
        this.state = {LoggedIn: false, FoundGame: false}
        LoggedUser = false
        this.googleLogin = this.googleLogin.bind(this)
        this.joinGame = this.joinGame.bind(this)
    }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (accepted_emails.includes(user.email)) {
                    console.log(user)
                    console.log("ACCEPTED")
                    LoggedUser = user
                    this.setState({LoggedIn: user})
                 }
                else {
                    console.log("DENIED");
                    console.log("TRY AGAIN");
                   
                 }
            })
            .catch(console.log)
    }
    joinGame() {
        let GamesRef = myFirestore.collection('Games');
        let query = GamesRef.get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log('No matching documents.');
              return;
            }  
            snapshot.forEach(doc => {
              let queryTime = new Date(doc.data().timeXstamp)
              console.log(queryTime)
              let now = new Date()
              let timedelta = (now - queryTime) / 1000
              console.log(timedelta)
              if (timedelta < 9999999999999 && doc.data().content == "Open Game") {
                  console.log(`Joining ${doc.data().name}'s game`)
                  this.setState({FoundGame: doc.data()})
              }
              else {
                  console.log("No recent game found")
              }
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    }
    render() {
            if (this.state.FoundGame) {
                return(<Redirect to={{pathname: "/User_Board", gamedata: this.state.FoundGame }}/>);
            }
            if (this.state.LoggedIn) {
                console.log("HERE")
                console.log(this.state.LoggedIn);
                return(<Redirect to="/ChooseTopic" />);
            }
            else {
            return (
                    <div id="home_page">
                        <Link to="">
                            <Button variant="primary" size="lg" id="start_game" onClick={this.joinGame}> התחל משחק </Button>
                        </Link>
                        <Link to="/">
                            <Button variant="primary" size="lg" id="connect" onClick={this.googleLogin} > התחבר </Button>
                        </Link>
                    </div>
            
            )
            }
    }
}

export default HomePage
export { storage, firebase, myFirestore, LoggedUser }