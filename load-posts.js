const container = document.getElementById("listing-container");

async function loadPosts() {
  try {
    const snapshot = await db.collection("posts")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    container.innerHTML = ""; // clear loading text

    if (snapshot.empty) {
      container.innerHTML = "<p>No posts yet.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const item = doc.data();

      const div = document.createElement("div");
      div.classList.add("item-card");

      div.innerHTML = `
        <div class="item-img">
          <img src="${item.imageUrl || 'https://via.placeholder.com/300'}" alt="No Image">
        </div>
        <h3>${item.title}</h3>
        <p class="price">UGX ${item.price}</p>
        <p class="desc">${item.description}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Failed to load posts. Check your internet.</p>";
  }
}

loadPosts();
