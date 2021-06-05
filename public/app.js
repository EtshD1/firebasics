(() => {
  const auth = firebase.auth();

  const elements = {
    buttons: {
      signIn: document.querySelector("#signIn"),
      signOut: document.querySelector("#signOut"),
    },
    sections: {
      signedIn: document.querySelector("#signedIn"),
      signedOut: document.querySelector("#signedOut")
    },
    username: document.querySelector("#user-name")
  }

  console.log(auth);
})();