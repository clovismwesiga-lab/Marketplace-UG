import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();

  try {
    await addDoc(collection(db, "posts"), {
      title,
      price,
      description,
      createdAt: serverTimestamp(),
    });

    alert("Item posted successfully!");
    document.getElementById("postForm").reset();
  } catch (err) {
    alert("Failed! Check your internet connection.");
    console.error(err);
  }
});
