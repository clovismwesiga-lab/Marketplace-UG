document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageFile = document.getElementById("image").files[0];

  try {
    let imageUrl = "";

    if (imageFile) {
      const storageRef = firebase.storage().ref("images/" + Date.now() + "-" + imageFile.name);
      const snapshot = await storageRef.put(imageFile);
      imageUrl = await snapshot.ref.getDownloadURL();
    }

    await db.collection("posts").add({
      title,
      price,
      description,
      imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert("Item posted successfully!");
    document.getElementById("postForm").reset();

  } catch (error) {
    console.error(error);
    alert("Failed to post. Check your internet connection.");
  }
});
