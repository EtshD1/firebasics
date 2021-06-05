(() => {
  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  const db = firebase.firestore();

  const elements = {
    buttons: {
      signIn: document.querySelector("#signIn"),
      signOut: document.querySelector("#signOut"),
      createItem: document.querySelector("#createRandomItem")
    },
    containers: {
      signedIn: document.querySelector("#signedIn"),
      signedOut: document.querySelector("#signedOut"),
      itemList: document.querySelector("#itemList")
    },
    username: document.querySelector("#user-name")
  }

  const addToList = (text) => {
    const newLi = document.createElement("li");

    newLi.textContent = text;


    elements.containers.itemList.append(newLi);
  }

  elements.buttons.signIn.addEventListener("click", () => {
    auth.signInWithPopup(provider);
  });

  elements.buttons.signOut.addEventListener("click", () => auth.signOut());

  let thingsRef;
  let unsubscribe;

  auth.onAuthStateChanged((user) => {
    if (user) {
      elements.containers.signedIn.removeAttribute("hidden");
      elements.containers.signedOut.setAttribute("hidden", true);
      elements.username.textContent = user.displayName;

      thingsRef = db.collection("things");

      elements.buttons.createItem.addEventListener("click", () => {
        const { serverTimestamp } = firebase.firestore.FieldValue;
        thingsRef.add({
          uid: user.uid,
          name: faker.commerce.productName(),
          createdAt: serverTimestamp()
        });
      });
      unsubscribe = thingsRef.where('uid', '==', user.uid)
        .orderBy("createdAt")
        .onSnapshot(query => {
          elements.containers.itemList.querySelectorAll("li").forEach(ele => {
            ele.remove();
          });
          query.docs.map(item => {
            addToList(item.data().name);
          });
        });

    } else {
      elements.containers.signedOut.removeAttribute("hidden");
      elements.containers.signedIn.setAttribute("hidden", true);
      elements.username.textContent = "";
      unsubscribe ? unsubscribe() : null;
    }
  })
})();