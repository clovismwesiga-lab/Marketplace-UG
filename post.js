// Firebase imports (compat mode)
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").files[0];

  try {
    let imageURL = "";

    if (image) {
      const storageRef = firebase.storage().ref("images/" + Date.now() + "_" + image.name);
      await storageRef.put(image);
      imageURL = await storageRef.getDownloadURL();
    }

    await db.collection("items").add({
      title,
      price,
      description,
      imageURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert("Item posted successfully!");
    document.getElementById("postForm").reset();
  } catch (err) {
    alert("Failed! Check your internet connection.");
    console.error(err);
  }
});
