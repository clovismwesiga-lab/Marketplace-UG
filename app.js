/* app.js — Marketplace UG client-side listing manager (localStorage) */
(() => {
  const KEY = 'marketplaceug_v1';
  // helpers
  const $ = id => document.getElementById(id);
  const q = sel => document.querySelector(sel);
  const qs = sel => Array.from(document.querySelectorAll(sel));
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY))||[] } catch(e){return[]} };
  const save = (a) => localStorage.setItem(KEY, JSON.stringify(a));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);
  const number = '+256748787964'; // owner WhatsApp

  // render marketplace listings
  function renderMarketplace() {
    const container = $('listings');
    const empty = $('empty');
    if(!container) return;
    const list = load();
    const qtxt = (q('searchInput')? q('searchInput').value.toLowerCase() : '');
    const cat = (q('#catFilter')? q('#catFilter').value : '');
    const filtered = list.filter(i => {
      if(cat && cat!=='all' && (i.category||'').toLowerCase() !== cat.toLowerCase()) return false;
      if(qtxt) {
        return ((i.title||'') + ' ' + (i.description||'') + ' ' + (i.location||'') ).toLowerCase().includes(qtxt);
      }
      return true;
    });
    container.innerHTML = '';
    if(!filtered.length) { empty.style.display='block'; return; } else empty.style.display='none';
    filtered.slice().reverse().forEach(item => {
      const div = document.createElement('div'); div.className='card listing';
      div.innerHTML = `<div class="title">${escapeHtml(item.title)}</div>
                       <div class="meta">${escapeHtml(item.category || '')} • ${escapeHtml(item.location || '')}</div>
                       <div class="price">UGX ${escapeHtml(item.price || '—')}</div>
                       <div class="desc small">${escapeHtml(item.description || '')}</div>
                       <div class="actions">
                         <button class="edit">Edit</button>
                         <button class="del">Delete</button>
                         <button class="wa">WhatsApp</button>
                       </div>`;
      const editBtn = div.querySelector('.edit');
      const delBtn = div.querySelector('.del');
      const waBtn = div.querySelector('.wa');
      editBtn.onclick = () => { location.href = 'add-listing.html?edit=' + item.id; };
      delBtn.onclick = () => {
        if(confirm('Delete this listing?')) {
          const arr = load().filter(x=>x.id!==item.id); save(arr); renderMarketplace();
        }
      };
      waBtn.onclick = () => {
        const text = encodeURIComponent(`${item.title} - UGX ${item.price || ''}. I want to buy/know more. Location: ${item.location || ''}`);
        window.open(`https://wa.me/${number.replace(/\+/,'') }?text=${text}`, '_blank');
      };
      container.appendChild(div);
    });
  }

  // escape html
  function escapeHtml(s='') {
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // handle add-listing form
  function handleForm() {
    const form = $('listingForm'); if(!form) return;
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    const title = $('title'), price = $('price'), category = $('category'), locationEl = $('location'), contact = $('contact'), description = $('description'), notice = $('notice');
    if(editId) {
      const item = load().find(i=>i.id===editId);
      if(item) {
        title.value = item.title||''; price.value = item.price||''; category.value = item.category||'';
        locationEl.value = item.location||''; contact.value = item.contact||''; description.value = item.description||'';
        notice.textContent = 'Editing listing — save to update';
      }
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const arr = load();
      if(!title.value.trim()){ notice.textContent='Title is required'; return; }
      if(editId) {
        const idx = arr.findIndex(x=>x.id===editId);
        if(idx>-1){
          arr[idx].title = title.value.trim();
          arr[idx].price = price.value.trim();
          arr[idx].category = category.value.trim();
          arr[idx].location = locationEl.value.trim();
          arr[idx].contact = contact.value.trim();
          arr[idx].description = description.value.trim();
        }
      } else {
        arr.push({
          id: uid(),
          title: title.value.trim(),
          price: price.value.trim(),
          category: category.value.trim(),
          location: locationEl.value.trim(),
          contact: contact.value.trim(),
          description: description.value.trim(),
          created: Date.now()
        });
      }
      save(arr);
      notice.textContent = 'Saved ✔';
      setTimeout(()=> location.href = 'marketplace.html', 600);
    });
    const clear = $('clearAll'); if(clear) clear.onclick = () => {
      if(confirm('Clear all listings?')) { localStorage.removeItem(KEY); renderMarketplace(); alert('Cleared'); }
    };
  }

  // setup controls (search, filter)
  function setupControls(){
    const s = $('searchInput'); if(s) s.oninput = () => renderMarketplace();
    const cat = $('catFilter'); if(cat) cat.onchange = () => renderMarketplace();
  }

  // on load
  document.addEventListener('DOMContentLoaded', ()=> {
    renderMarketplace();
    handleForm();
    setupControls();
  });

})();