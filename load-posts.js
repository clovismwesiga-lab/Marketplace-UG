const container = document.getElementById("listing-container");

// Show skeleton loaders while waiting
container.innerHTML = `
  <div class="skeleton"></div>
  <div class="skeleton"></div>
  <div class="skeleton"></div>
`;

async function loadPosts() {
  try {
    const snapshot = await db.collection("posts")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    container.innerHTML = ""; // remove skeleton

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
          <img src="${item.imageUrl || 'https://via.placeholder.com/300'}">
        </div>
        <h3>${item.title}</h3>
        <p class="price">UGX ${item.price}</p>
        <p class="desc">${item.description}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Failed to load items. Check internet.</p>";
  }
}

loadPosts();
