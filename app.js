// app.js
const db = window._marketplace_db; // from firebase-config.js (if present)
const itemsNode = document.getElementById('items');
const statusNode = document.getElementById('status');
const postForm = document.getElementById('postForm');

function renderCard(item){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `<h3>${escapeHtml(item.title)}</h3>
                   <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
                   <p><strong>Price:</strong> UGX ${escapeHtml(item.price)}</p>
                   <p>${escapeHtml(item.desc||'')}</p>`;
  return div;
}

function escapeHtml(s){
  if(!s) return '';
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

async function loadListings(){
  if(!itemsNode) return;
  itemsNode.innerHTML = 'Loading...';
  try{
    if(db){
      const snap = await db.collection('listings').orderBy('createdAt','desc').limit(50).get();
      itemsNode.innerHTML = '';
      if(snap.empty){ itemsNode.innerHTML = '<p>No items yet. Post yours now!</p>'; return; }
      snap.forEach(doc=>{
        const data = doc.data();
        itemsNode.appendChild(renderCard(data));
      });
    } else {
      // fallback: read localStorage
      const saved = JSON.parse(localStorage.getItem('marketplace_items') || '[]');
      itemsNode.innerHTML = '';
      if(saved.length===0){ itemsNode.innerHTML = '<p>No items yet. Post yours now!</p>'; return; }
      saved.reverse().forEach(i => itemsNode.appendChild(renderCard(i)));
    }
  } catch(e){
    itemsNode.innerHTML = '<p>Error loading listings</p>';
    console.error(e);
  }
}

if(postForm){
  postForm.addEventListener('submit', async function(ev){
    ev.preventDefault();
    statusNode.textContent = 'Posting…';
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('desc').value.trim();
    const item = {title, category, price, desc, createdAt: new Date()};

    try{
      if(db){
        await db.collection('listings').add({
          title, category, price, desc, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        statusNode.textContent = 'Posted successfully!';
        postForm.reset();
      } else {
        // fallback: save locally
        const arr = JSON.parse(localStorage.getItem('marketplace_items') || '[]');
        arr.push(item);
        localStorage.setItem('marketplace_items', JSON.stringify(arr));
        statusNode.textContent = 'Saved locally (offline).';
        postForm.reset();
      }
      await loadListings();
    } catch(err){
      console.error(err);
      statusNode.textContent = 'Error posting (see console).';
    }
  });
}

// run on load
document.addEventListener('DOMContentLoaded', loadListings);
