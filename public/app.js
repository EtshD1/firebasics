(() => {
  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

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

  elements.buttons.signIn.addEventListener("click", () => {
    auth.signInWithPopup(provider);
  });

  elements.buttons.signOut.addEventListener("click", () => auth.signOut());

  auth.onAuthStateChanged((user) => {
    if (user) {
      elements.sections.signedIn.removeAttribute("hidden");
      elements.sections.signedOut.setAttribute("hidden", true);
      elements.username.textContent = user.displayName;
    } else {
      elements.sections.signedOut.removeAttribute("hidden");
      elements.sections.signedIn.setAttribute("hidden", true);
      elements.username.textContent = "";
    }
  })

  console.log(auth);
})();