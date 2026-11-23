var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      var PENCIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>';
      var TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>';
      function hearts(n){
        var s = '<span class="hearts" aria-hidden="true">';
        for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= n ? 'on' : 'off') + '">' + HEART + '</span>';
        return s + '</span>';
      }
      var WANT_LABELS = {5:'The one I want most', 4:'Really want it', 3:'Would love it', 2:'Nice to have', 1:'Only if it\u2019s on sale'};

      var CATEGORIES = [
        { id:'all', label:'All types' },
        { id:'clothes', label:'Clothes' },
        { id:'shoes', label:'Shoes' },
        { id:'jewellery', label:'Jewellery' },
        { id:'makeup', label:'Makeup & Beauty' },
        { id:'home', label:'Home' },
        { id:'stationery', label:'Stationery' },
        { id:'books', label:'Books' },
        { id:'fun', label:'Fun & Knick-knacks' },
        { id:'food', label:'Little Foods' },
        { id:'other', label:'Other' }
      ];

// All wishlist content lives in data.json so it can be edited without touching code.
// Edits made in the page save to this browser only (localStorage), like the hosted version.
fetch('data.json')
  .then(function (response) {
    if (!response.ok) throw new Error('Could not load data.json');
    return response.json();
  })
  .then(function (data) {
    var items = data.items;
    var giftCards = data.giftCards;
    var foods = data.foods;
    var sizeBlocks = data.sizeBlocks;
    var vibeImages = data.vibeImages;
    /* Page headings, intros, and brand chips live in data.json under
       pageText, so a GitHub save publishes them too. The HTML still
       carries the same defaults, so an older data.json without pageText
       keeps working as before. Local edits in this browser still win:
       loadSaved() below applies them over these values. */
    var pageText = data.pageText || null;
    if (pageText && typeof pageText === 'object'){
      document.querySelectorAll('[data-edit]').forEach(function(el){
        var k = el.getAttribute('data-edit');
        if (Object.prototype.hasOwnProperty.call(pageText, k)) el.innerHTML = pageText[k];
      });
      if (Array.isArray(pageText.brands)){
        var brandWrap = document.getElementById('brandChips');
        if (brandWrap){
          brandWrap.innerHTML = '';
          pageText.brands.forEach(function(n){
            var chip = document.createElement('span'); chip.className = 'chip'; chip.textContent = n; brandWrap.appendChild(chip);
          });
        }
      }
    }
function catLabel(id){
        for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i].label;
        return 'Other';
      }
      function itemCat(it){ return it.category || 'other'; }

      var SETS = {
        'nail-kit': { name:'At-home nail kit', pieces:11 },
        'hunger-games': { name:'Hunger Games books', pieces:4 },
        'garage-set': { name:'Garage UltraFleece set', pieces:2 },
        'yara-set': { name:'Lattafa Yara set', pieces:2 },
        'gaqqi-lash-set': { name:'GAQQI lash set', pieces:2 },
        'nyx-duck-plump-set': { name:'NYX Duck Plump liners', pieces:3 }
      };
      var ITEM_SET = {
        'nail-kit-cuccio':'nail-kit',
        'nail-lamp-sunuv':'nail-kit',
        'nail-dust-collector':'nail-kit',
        'nail-tips-gelx':'nail-kit',
        'nail-polish-beetles':'nail-kit',
        'nail-dehydrator-gelish':'nail-kit',
        'nail-wipes-silkline':'nail-kit',
        'nail-oil-cnd':'nail-kit',
        'nail-buffer-dixon':'nail-kit',
        'nail-pusher-diane':'nail-kit',
        'nail-acetone-quo':'nail-kit',
        'hunger-games-catching-fire':'hunger-games',
        'hunger-games-mockingjay':'hunger-games',
        'hunger-games-songbirds-snakes':'hunger-games',
        'hunger-games-sunrise-reaping':'hunger-games',
        'sweatpants':'garage-set',
        'hoodie':'garage-set',
        'lattafa-yara-perfume':'yara-set',
        'lattafa-yara-hair-mist':'yara-set',
        'gaqqi-lash-bond-seal':'gaqqi-lash-set',
        'gaqqi-lash-clusters':'gaqqi-lash-set',
        'nyx-duck-plump-liner-nude-flip':'nyx-duck-plump-set',
        'nyx-duck-plump-liner-dash-of-cocoa':'nyx-duck-plump-set',
        'nyx-duck-plump-liner-pinkjection':'nyx-duck-plump-set'
      };
      function setOf(it){
        if (!it) return null;
        if (it.set && SETS[it.set]) return it.set;
        return ITEM_SET[it.id] || null;
      }
      var SET_TAG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.59 13.41 11 3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.83z"/><circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none"/></svg>';
      function setTagHTML(it, extraClass){
        var sid = setOf(it);
        if (!sid) return '';
        var s = SETS[sid];
        return '<button type="button" class="set-tag' + (extraClass ? ' ' + extraClass : '') + '" data-set="' + sid + '" aria-label="Show only the ' + s.name + ' set, ' + s.pieces + ' pieces">' + SET_TAG_ICON + esc(s.name) + ' \u00b7 ' + s.pieces + ' pieces</button>';
      }

      

      /* Date added order, oldest first. This is the real order items were put
         on the list; it is NOT the order of the array above, which groups
         similar things together (clothes, shoes, fun, books, beauty).
         Higher addedSeq means added later. When a new item is added to the
         page, give it the next number here, wherever it sits in the array. */
      var ADDED_ORDER = {
        'sweatpants': 1, 'hoodie': 2, 'alpiine': 3, 'lowmel': 4, 'tazzelle': 5, 'ultramini': 6,
        'djungelskog': 7, 'smiski-blindbox': 8, 'smiski-keychain': 9, 'smiski-lamp': 10,
        'aftonsparv': 11, 'skullpanda-mlp': 12, 'tokidoki-unicorno': 13, 'adidas-cny-jacket': 14,
        'javvy-french-vanilla': 15, 'javvy-banana-bread': 16,
        'mlp-trading-cards': 17, 'mlp-moon3-pack': 18, 'daft-punk-ram-cd': 19,
        'hunger-games-catching-fire': 20, 'hunger-games-mockingjay': 21,
        'hunger-games-songbirds-snakes': 22, 'hunger-games-sunrise-reaping': 23,
        'sixth-faction-book': 24,
        'nail-kit-cuccio': 25, 'nail-lamp-sunuv': 26, 'nail-dust-collector': 27,
        'nail-tips-gelx': 28, 'nail-polish-beetles': 29, 'nail-dehydrator-gelish': 30,
        'nail-wipes-silkline': 31, 'nail-oil-cnd': 32, 'nail-buffer-dixon': 33,
        'nail-pusher-diane': 34, 'nail-acetone-quo': 35,
        'starface-hydro-stars': 36, 'artkal-mini-beads': 37, 'nyx-butter-gloss-creme-brulee': 38,
        'too-faced-lip-injection-gloss': 39, 'owala-freesip-25oz-pink': 40,
        'tooth-gem-kit-butterfly': 42,
        'bailey-nelson-patti': 43,
        'valentino-green-stravaganza': 44, 'kayali-freedom-musk-latte': 45,
        'billie-eilish-perfume': 46, 'lattafa-yara-perfume': 47,
        'lattafa-yara-hair-mist': 48, 'gaqqi-lash-bond-seal': 49,
        'gaqqi-lash-clusters': 50, 'kiko-lip-volume-tutu-rose': 51,
        'nyx-duck-plump-liner-nude-flip': 52, 'nyx-duck-plump-liner-dash-of-cocoa': 53,
        'nyx-duck-plump-liner-pinkjection': 54, 'framar-claw-clips': 55,
        'grandelash-serum': 56, 'num-noms-lipgloss-truck': 57,
        'olaplex-no4-shampoo': 58, 'rare-beauty-powder-blush-happy': 59,
        'fenty-match-stix-amber': 60, 'huda-lip-contour-stain-rosy-mauve': 61,
        'huda-easy-bake-powder-kunafa': 62,
        'lego-lucky-bamboo': 63, 'elenco-solder-kit': 64, 'creality-pla-white': 65,
        'sunlu-tpu-grey': 66, 'just-dance-2025-switch': 67, 'domatcha-ceremonial': 68,
        'house-of-leaves-book': 69, 'calico-critters-keychain': 70,
        'monster-high-frankie-stein': 71, 'monster-high-clawdeen-wolf': 72,
        'blythe-custom-doll': 73, 'leuchtturm-bullet-journal': 74,
        'aritzia-cozy-sweatpant-black': 75, 'aritzia-bloor-sweater-burgundy': 76,
        'skullpanda-lazypanda-pendant': 77, 'skullpanda-tell-me-what-you-want': 78,
        'aritzia-super-puff-white': 79, 'lululemon-align-pants-black': 80,
        'grey-oodie-original': 81, 'cartman-heated-weighted-blanket': 82,
        'canon-selphy-cp1500': 83, 'apple-watch-series-12': 84,
        'hexbug-nano-5-pack': 85, 'peach-riot-blind-box': 86, 'pla75-keyboard-kit': 87,
        'custom-heart-star-grillz': 88, 'coming-age-star-open-face': 89
      };
      items.forEach(function(it, i){ it.addedSeq = ADDED_ORDER[it.id] || (1000 + i); });
      function nextAddedSeq(){
        var m = 0;
        items.forEach(function(it){ if (typeof it.addedSeq === 'number' && it.addedSeq > m) m = it.addedSeq; });
        return m + 1;
      }
var currentView = 'wishlist';
      var shahdMode = false;
      function isShahd(){ return shahdMode; }
      function editText(key, fallback){
        var el = document.querySelector('[data-edit="' + key + '"]');
        return el ? el.textContent.trim() : (fallback || '');
      }

      var RANGES = [
        { id:'all', label:'All items', test:function(p){ return true; } },
        { id:'u50', label:'Under $50', test:function(p){ return p < 50; } },
        { id:'5099', label:'$50 – $99', test:function(p){ return p >= 50 && p < 100; } },
        { id:'100149', label:'$100 – $149', test:function(p){ return p >= 100 && p < 150; } },
        { id:'150p', label:'$150 & up', test:function(p){ return p >= 150; } }
      ];
      var activeRange = 'all';
      var activeCategory = 'all';
      var activeSet = null;
      var managing = false;

      function money(p){ return '$' + p.toFixed(2); }
      function currencyOf(it){ return (it && it.currency) || (it && it.id && it.id.indexOf('javvy-') === 0 ? 'USD' : 'CAD'); }
      function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
      function byId(id){ for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i]; return null; }
      function activeItems(){ return items.filter(function(it){ return !it.received; }); }

      /* ---------- saved edits: kept in this browser so they survive closing the page ---------- */
      var STORE_KEY = 'shahd-wishlist-github-v1';
      var seededIds = {};
      items.forEach(function(it){ seededIds[it.id] = true; });
      /* The current page text: every editable heading and description,
         plus the brand chips, read from the page as it is now. This is
         what the GitHub save and the data.json download publish, so
         heading, description, footer, and brand edits go public too. */
      function currentTexts(){
        var texts = {};
        document.querySelectorAll('[data-edit]').forEach(function(el){ texts[el.getAttribute('data-edit')] = el.innerHTML; });
        return texts;
      }
      function currentPageText(){
        var pt = currentTexts();
        pt.brands = brandNames();
        return pt;
      }
      function persist(){
        try {
          var texts = currentTexts();
          var brands = [];
          document.querySelectorAll('#brandChips .chip-name').forEach(function(s){ brands.push(s.textContent.trim()); });
          localStorage.setItem(STORE_KEY, JSON.stringify({
            items: items, giftCards: giftCards, foods: foods, sizeBlocks: sizeBlocks, vibeImages: vibeImages,
            removedSeeded: Object.keys(seededIds).filter(function(id){ return !byId(id); }),
            texts: texts, brands: brands
          }));
        } catch (err) { /* storage unavailable in this browser: edits still apply for this visit */ }
        /* Every edit goes through here, so this is also where auto-save
           starts: a few seconds after the last change, the edit publishes
           itself to GitHub. See scheduleGhAutoSave in the GitHub section. */
        scheduleGhAutoSave();
      }
      function loadSaved(){
        var raw = null;
        try { raw = localStorage.getItem(STORE_KEY); } catch (err) { raw = null; }
        if (!raw) return;
        var s = null;
        try { s = JSON.parse(raw); } catch (err) { return; }
        if (!s) return;
        if (Array.isArray(s.items) && s.items.length){
          var savedById = {};
          s.items.forEach(function(si){ if (si && si.id) savedById[si.id] = si; });
          var removed = {};
          (s.removedSeeded || []).forEach(function(id){ removed[id] = true; });
          var merged = [];
          items.forEach(function(seed){
            if (removed[seed.id]) return;
            merged.push(savedById[seed.id] || seed);
          });
          s.items.forEach(function(si){ if (si && si.id && !seededIds[si.id] && si.id !== 'custom-grills-plain-perm-cut') merged.push(si); });
          items = merged;
        }
        if (Array.isArray(s.giftCards)) giftCards = s.giftCards;
        if (Array.isArray(s.foods)) foods = s.foods;
        if (Array.isArray(s.sizeBlocks)) sizeBlocks = s.sizeBlocks;
        if (Array.isArray(s.vibeImages)) vibeImages = s.vibeImages;
        if (s.texts){
          document.querySelectorAll('[data-edit]').forEach(function(el){
            var k = el.getAttribute('data-edit');
            if (Object.prototype.hasOwnProperty.call(s.texts, k)) el.innerHTML = s.texts[k];
          });
        }
        if (Array.isArray(s.brands) && s.brands.length){
          var wrap = document.getElementById('brandChips');
          if (wrap){
            wrap.innerHTML = '';
            s.brands.forEach(function(n){
              var chip = document.createElement('span'); chip.className = 'chip';
              chip.innerHTML = '<span class="chip-name dyn-edit">' + esc(n) + '</span><button type="button" class="chip-remove" aria-label="Remove ' + esc(n) + '">&times;</button>';
              wrap.appendChild(chip);
            });
          }
        }
      }
      loadSaved();
      /* A saved copy in this browser can carry addedSeq numbers from an older
         build, when they were just positions in the list above, and those do
         not match the real order items were added. Seeded items always take
         the canonical ADDED_ORDER value; only items Shahd added herself keep
         the number they were given. Then fill any gaps and clear collisions. */
      (function(){
        var maxSeq = 0;
        items.forEach(function(it){
          if (ADDED_ORDER[it.id]) it.addedSeq = ADDED_ORDER[it.id];
          if (typeof it.addedSeq === 'number' && it.addedSeq > maxSeq) maxSeq = it.addedSeq;
        });
        items.forEach(function(it){ if (typeof it.addedSeq !== 'number') it.addedSeq = ++maxSeq; });
        var seen = {};
        items.forEach(function(it){
          while (seen[it.addedSeq]) it.addedSeq = ++maxSeq;
          seen[it.addedSeq] = true;
        });
      })();
      document.querySelectorAll('[data-edit]').forEach(function(el){ el.addEventListener('blur', persist); });

      /* ---------- undo ---------- */
      var undoState = null, undoTimer = null;
      function showUndo(msg, restore){
        undoState = restore;
        document.getElementById('undoMsg').textContent = msg;
        var t = document.getElementById('undoToast'); t.classList.add('show');
        clearTimeout(undoTimer);
        undoTimer = setTimeout(hideUndo, 6000);
      }
      function hideUndo(){ document.getElementById('undoToast').classList.remove('show'); undoState = null; clearTimeout(undoTimer); }
      document.getElementById('undoBtn').addEventListener('click', function(){
        if (undoState) undoState();
        hideUndo(); render(); renderReceived(); renderGiftCards(); renderFoods(); renderVibe(); renderSpecs(); persist();
      });

      function removeItem(id){
        var idx = -1;
        for (var i = 0; i < items.length; i++) if (items[i].id === id) idx = i;
        if (idx < 0) return;
        var removed = items.splice(idx, 1)[0];
        render(); renderReceived(); persist();
        showUndo('Removed \u201C' + removed.name + '\u201D.', function(){ items.splice(Math.min(idx, items.length), 0, removed); });
      }
      function removeGiftCard(idx){
        var removed = giftCards.splice(idx, 1)[0];
        renderGiftCards(); persist();
        showUndo('Removed the ' + removed.name + ' gift card.', function(){ giftCards.splice(Math.min(idx, giftCards.length), 0, removed); renderGiftCards(); });
      }
      function removeFood(idx){
        var removed = foods.splice(idx, 1)[0];
        renderFoods(); persist();
        showUndo('Removed \u201C' + removed.name + '\u201D from Little foods.', function(){ foods.splice(Math.min(idx, foods.length), 0, removed); renderFoods(); });
      }
      function removeSizeBlock(idx){
        var removed = sizeBlocks.splice(idx, 1)[0];
        renderSpecs(); persist();
        showUndo('Removed the \u201C' + removed.k + '\u201D size block.', function(){ sizeBlocks.splice(Math.min(idx, sizeBlocks.length), 0, removed); renderSpecs(); });
      }
      function addSizeBlock(k, v, n){
        k = (k || '').trim(); v = (v || '').trim(); if (!k || !v) return false;
        sizeBlocks.push({ k:k, v:v, n:(n || '').trim() });
        renderSpecs(); applyEditable(); persist();
        return true;
      }
      function removeVibe(id){
        var idx = -1;
        for (var i = 0; i < vibeImages.length; i++) if (vibeImages[i].id === id) idx = i;
        if (idx < 0) return;
        var removed = vibeImages.splice(idx, 1)[0];
        renderVibe(); persist();
        showUndo('Removed \u201C' + removed.caption + '\u201D from the Vibe board.', function(){ vibeImages.splice(Math.min(idx, vibeImages.length), 0, removed); renderVibe(); });
      }

      /* ---------- edit dialog ---------- */
      var editingId = null, editWant = 3;
      function renderEditHearts(){
        var s = '';
        for (var i = 1; i <= 5; i++) s += '<button type="button" class="hbtn" data-w="' + i + '" aria-label="Set want level to ' + i + '"><span class="' + (i <= editWant ? 'on' : 'off') + '">' + HEART + '</span></button>';
        var el = document.getElementById('editHearts'); el.innerHTML = s;
        el.querySelectorAll('.hbtn').forEach(function(b){
          b.addEventListener('click', function(){ editWant = parseInt(b.getAttribute('data-w'), 10); renderEditHearts(); });
        });
        document.getElementById('editWantText').textContent = editWant + '/5 · ' + (WANT_LABELS[editWant] || '');
      }
      function openEdit(id){
        var it = byId(id); if (!it) return;
        editingId = id; editWant = it.want;
        var f = document.getElementById('editForm');
        f.elements['name'].value = it.name || '';
        f.elements['price'].value = it.price;
        f.elements['store'].value = it.store || '';
        if (f.elements['category']) f.elements['category'].value = itemCat(it);
        f.elements['variant'].value = it.variant || '';
        f.elements['url'].value = it.url || '';
        initPhotoChoice(document.querySelector('#editForm [data-photo-choice]'), it);
        f.elements['note'].value = it.note || '';
        renderEditHearts();
        document.getElementById('editOverlay').classList.add('open');
      }
      function closeEdit(){ document.getElementById('editOverlay').classList.remove('open'); editingId = null; }
      document.getElementById('editCancel').addEventListener('click', closeEdit);
      document.getElementById('editOverlay').addEventListener('click', function(e){ if (e.target === this) closeEdit(); });
      document.getElementById('detailClose').addEventListener('click', closeDetail);
      document.getElementById('detailOverlay').addEventListener('click', function(e){ if (e.target === this) closeDetail(); });
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeEdit(); closeDetail(); } });
      document.getElementById('editForm').addEventListener('submit', function(e){
        e.preventDefault();
        var it = byId(editingId); if (!it) { closeEdit(); return; }
        var f = new FormData(e.target);
        it.name = (f.get('name') || 'Untitled item').toString().trim();
        it.price = parseFloat(f.get('price')) || 0;
        it.store = (f.get('store') || '').toString().trim();
        it.variant = (f.get('variant') || '').toString().trim();
        it.category = (f.get('category') || 'other').toString().trim() || 'other';
        it.url = (f.get('url') || '').toString().trim();
        it.note = (f.get('note') || '').toString().trim();
        it.want = editWant;
        var pc = e.target.querySelector('[data-photo-choice]');
        readPhotoChoice(pc, e.target, function(photo){
          it.img = photo.img;
          it.imgNote = photo.imgNote;
          closeEdit(); render(); renderReceived(); persist();
        });
      });

      /* ---------- rendering ---------- */
      function renderTabs(){
        var t = document.getElementById('tabs'); t.innerHTML = '';
        RANGES.forEach(function(r){
          var n = activeItems().filter(function(it){ return r.test(it.price) && (activeCategory === 'all' || itemCat(it) === activeCategory) && (!activeSet || setOf(it) === activeSet); }).length;
          var b = document.createElement('button');
          b.className = 'tab'; b.setAttribute('role','tab');
          b.setAttribute('aria-selected', r.id === activeRange ? 'true' : 'false');
          b.innerHTML = esc(r.label) + '<span class="count">' + n + '</span>';
          b.addEventListener('click', function(){ activeRange = r.id; render(); });
          t.appendChild(b);
        });
        renderCatTabs();
      }
      function renderCatTabs(){
        var el = document.getElementById('catTabs'); if (!el) return; el.innerHTML = '';
        CATEGORIES.forEach(function(c){
          var n = c.id === 'all' ? activeItems().filter(function(it){ var r = RANGES.filter(function(x){ return x.id === activeRange; })[0]; return r.test(it.price) && (!activeSet || setOf(it) === activeSet); }).length : activeItems().filter(function(it){ var r = RANGES.filter(function(x){ return x.id === activeRange; })[0]; return itemCat(it) === c.id && r.test(it.price) && (!activeSet || setOf(it) === activeSet); }).length;
          if (c.id !== 'all' && n === 0 && c.id !== activeCategory) return;
          var b = document.createElement('button');
          b.className = 'tab'; b.setAttribute('role','tab');
          b.setAttribute('aria-selected', c.id === activeCategory ? 'true' : 'false');
          b.innerHTML = esc(c.label) + '<span class="count">' + n + '</span>';
          b.addEventListener('click', function(){ activeCategory = c.id; render(); });
          el.appendChild(b);
        });
      }
      /* ---------- detail view: shows the extra info and edits in place ---------- */
      var detailWant = 3;
      function openDetail(id){
        var it = byId(id); if (!it) return;
        detailWant = it.want;
        var photo = it.img
          ? '<div class="detail-photo"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" /></div>'
          : '<div class="detail-photo noimg photo-note"><span>' + esc(photoNoteText(it)) + '</span></div>';
        var catOptions = '';
        CATEGORIES.forEach(function(c){
          if (c.id === 'all') return;
          catOptions += '<option value="' + esc(c.id) + '"' + (itemCat(it) === c.id ? ' selected' : '') + '>' + esc(c.label) + '</option>';
        });
        var html = photo + '<div class="detail-body">' +
          '<div class="detail-meta"><span class="chip cat">' + esc(catLabel(itemCat(it))) + '</span>' + (it.store ? '<span class="chip">' + esc(it.store) + '</span>' : '') + (it.added ? '<span class="chip alt">Added by Shahd</span>' : '') + (it.received ? '<span class="chip received-badge">Received</span>' : '') + setTagHTML(it, 'detail-set-tag') + '</div>' +
          '<h2 id="detailTitle"' + (it.received ? ' class="detail-title-received"' : '') + ' style="font-size:1.9rem;line-height:1.1;">' + esc(it.name) + '</h2>' +
          '<p class="sub" style="margin:6px 0 4px;">Edit anything here and save. Your changes stay saved in this browser.</p>' +
          '<form id="detailForm">' +
          '<label class="f">Item name<input name="name" required value="' + esc(it.name) + '" /></label>' +
          '<div class="row">' +
            '<label class="f">Price (' + esc(currencyOf(it)) + ')<input name="price" type="number" min="0" step="0.01" required value="' + esc(it.price) + '" /></label>' +
            '<label class="f">Store<input name="store" value="' + esc(it.store || '') + '" /></label>' +
          '</div>' +
          '<label class="f">Category<select name="category">' + catOptions + '</select></label>' +
          '<div style="font-size:.85rem;font-weight:600;">How much do you want it?</div>' +
          '<div class="wantpick"><span class="hearts" id="detailHearts"></span><span class="wp-text" id="detailWantText"></span></div>' +
          '<div class="detail-section"><h3>The exact one I want</h3><label class="f" style="margin:0;">Size / version / colour<input name="variant" value="' + esc(it.variant || '') + '" /></label></div>' +
          '<div class="detail-section detail-feel"><h3>How I feel about it</h3><label class="f" style="margin:0;"><textarea name="note" rows="3" placeholder="The colour or style you want, if there is one">' + esc(it.note || '') + '</textarea></label></div>' +
          '<div class="detail-section"><h3>Good to know</h3><label class="f" style="margin:0;"><textarea name="gtk" rows="3" placeholder="The facts: edition, size, colour, store, availability">' + esc(it.gtk || '') + '</textarea></label>' +
            '<label class="f" style="margin-top:10px;">Link to buy it<input name="url" type="text" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://" value="' + esc(it.url || '') + '" /></label>' +
            '<div class="photo-choice" data-photo-choice>' +
              '<div class="pc-label">Photo</div>' +
              '<div class="pc-modes">' +
                '<label class="pc-mode"><input type="radio" name="photoMode" value="upload" /> Upload a photo</label>' +
                '<label class="pc-mode"><input type="radio" name="photoMode" value="link" checked /> Photo link</label>' +
                '<label class="pc-mode"><input type="radio" name="photoMode" value="note" /> Note instead</label>' +
              '</div>' +
              '<div class="pc-panel" data-pc-panel="upload" hidden>' +
                '<label class="f">Pick a photo<input name="imgFile" type="file" accept="image/*" /></label>' +
                '<div class="pc-preview" hidden><img alt="Picked photo preview" /><span></span></div>' +
                '<p class="fineprint" style="margin-top:4px;">The photo is shrunk to at most 1200px wide before it is saved.</p>' +
              '</div>' +
              '<div class="pc-panel" data-pc-panel="link">' +
                '<label class="f" style="margin-bottom:0;">Image link<input name="img" type="text" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://" /></label>' +
              '</div>' +
              '<div class="pc-panel" data-pc-panel="note" hidden>' +
                '<label class="f" style="margin-bottom:0;">Note to show instead of a photo<input name="imgNote" type="text" placeholder="Shown when there is no photo" /></label>' +
              '</div>' +
            '</div></div>' +
          '<label class="received-check"><input type="checkbox" id="detailReceived"' + (it.received ? ' checked' : '') + ' /><span class="rc-text"><strong>Received</strong><span>Tick this once it has been given to me. It crosses off the wishlist and moves to the Received section, not deleted.</span></span></label>' +
          '<div class="detail-buy"><button type="submit" class="btn detail-save-btn">Save changes</button>' + (it.url ? '<a href="' + esc(it.url) + '" target="_blank" rel="noopener">Buy this at ' + esc(it.store || 'the store') + '</a>' : '') + '<button type="button" class="btn detail-delete-btn" id="detailDeleteBtn">Delete this item</button><button type="button" class="btn ghost" id="detailCloseBtn" style="width:auto;margin-top:0;">Close</button></div>' +
          '</form></div>';
        document.getElementById('detailContent').innerHTML = html;
        document.getElementById('detailOverlay').classList.add('open');
        var dpc = document.querySelector('#detailContent [data-photo-choice]');
        if (dpc) initPhotoChoice(dpc, it);
        var dimg = document.querySelector('#detailContent .detail-photo img');
        if (dimg) dimg.addEventListener('error', function(){
          var wrap = dimg.closest('.detail-photo'); if (!wrap) return;
          wrap.classList.add('noimg', 'photo-note');
          wrap.innerHTML = '<span>' + esc(photoNoteText(it)) + '</span>';
        });
        function paintDetailHearts(){
          var s = '';
          for (var i = 1; i <= 5; i++) s += '<button type="button" class="hbtn" data-w="' + i + '" aria-label="Set want level to ' + i + '"><span class="' + (i <= detailWant ? 'on' : 'off') + '">' + HEART + '</span></button>';
          var hel = document.getElementById('detailHearts'); if (!hel) return;
          hel.innerHTML = s;
          hel.querySelectorAll('.hbtn').forEach(function(b){ b.addEventListener('click', function(){ detailWant = parseInt(b.getAttribute('data-w'), 10); paintDetailHearts(); }); });
          document.getElementById('detailWantText').textContent = detailWant + '/5 \u00b7 ' + (WANT_LABELS[detailWant] || '');
        }
        paintDetailHearts();
        var dst = document.querySelector('.detail-set-tag');
        if (dst) dst.addEventListener('click', function(){
          var sid = dst.getAttribute('data-set');
          if (!sid) return;
          activeSet = sid;
          activeRange = 'all';
          activeCategory = 'all';
          closeDetail();
          render();
          var g = document.getElementById('grid');
          if (g) g.scrollIntoView({ behavior:'smooth', block:'start' });
        });
        var dform = document.getElementById('detailForm');
        dform.addEventListener('submit', function(e){
          e.preventDefault();
          var f = new FormData(dform);
          it.name = (f.get('name') || 'Untitled item').toString().trim();
          it.price = parseFloat(f.get('price')) || 0;
          it.store = (f.get('store') || '').toString().trim();
          it.variant = (f.get('variant') || '').toString().trim();
          it.category = (f.get('category') || 'other').toString().trim() || 'other';
          it.url = (f.get('url') || '').toString().trim();
          it.note = (f.get('note') || '').toString().trim();
          it.gtk = (f.get('gtk') || '').toString().trim();
          it.want = detailWant;
          var dpc2 = dform.querySelector('[data-photo-choice]');
          readPhotoChoice(dpc2, dform, function(photo){
            it.img = photo.img;
            it.imgNote = photo.imgNote;
            closeDetail(); render(); renderReceived(); persist();
          });
        });
        var rcCheck = document.getElementById('detailReceived');
        if (rcCheck) rcCheck.addEventListener('change', function(){
          it.received = rcCheck.checked;
          persist(); render(); renderReceived();
          var dt = document.getElementById('detailTitle'); if (dt) dt.classList.toggle('detail-title-received', rcCheck.checked);
        });
        var delBtn = document.getElementById('detailDeleteBtn');
        if (delBtn) delBtn.addEventListener('click', function(){ closeDetail(); removeItem(it.id); });
        var cb = document.getElementById('detailCloseBtn'); if (cb) cb.addEventListener('click', closeDetail);
        var c = document.getElementById('detailClose'); if (c) c.focus();
      }
      function closeDetail(){ document.getElementById('detailOverlay').classList.remove('open'); }


      function sorted(list){
        var mode = document.getElementById('sort').value;
        var copy = list.slice();
        if (mode === 'low') copy.sort(function(a,b){ return a.price - b.price; });
        else if (mode === 'added') copy.sort(function(a,b){ return (b.addedSeq || 0) - (a.addedSeq || 0); });
        else if (mode === 'high') copy.sort(function(a,b){ return b.price - a.price; });
        else if (mode === 'name') copy.sort(function(a,b){ return a.name.localeCompare(b.name); });
        else copy.sort(function(a,b){ return (b.want - a.want) || (a.price - b.price); });
        return copy;
      }

      function wantHTML(it){
        if (!managing) return hearts(it.want) + '<span class="wlabel">' + esc(WANT_LABELS[it.want] || '') + '</span>';
        var s = '<span class="hearts">';
        for (var i = 1; i <= 5; i++) s += '<button type="button" class="hbtn" data-id="' + esc(it.id) + '" data-w="' + i + '" aria-label="Set want level to ' + i + ' for ' + esc(it.name) + '"><span class="' + (i <= it.want ? 'on' : 'off') + '">' + HEART + '</span></button>';
        s += '</span><span class="wlabel">' + esc(WANT_LABELS[it.want] || '') + '</span><span class="tap-hint">Tap a heart to change it</span>';
        return s;
      }

      /* ---------- photos: an item can have no photo, and show a note instead ----------
         photoNoteText is what the photo area shows when there is no image:
         the note Shahd wrote for that, or "No photo yet". The same area is
         used when an image link fails to load. */
      function photoNoteText(it){ return (it && it.imgNote ? String(it.imgNote).trim() : '') || 'No photo yet'; }
      function photoHTML(it){
        if (it.img){
          return '<button type="button" class="photo detail-open" data-id="' + esc(it.id) + '" aria-label="View and edit ' + esc(it.name) + '"><img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy" /></button>';
        }
        return '<button type="button" class="photo noimg photo-note detail-open" data-id="' + esc(it.id) + '" aria-label="View and edit ' + esc(it.name) + '"><span>' + esc(photoNoteText(it)) + '</span></button>';
      }
      function bindPhotoErrors(scope){
        if (!scope) return;
        scope.querySelectorAll('.photo img').forEach(function(im){
          im.addEventListener('error', function(){
            var btn = im.closest('.photo'); if (!btn) return;
            var item = byId(btn.getAttribute('data-id'));
            btn.classList.add('noimg', 'photo-note');
            btn.innerHTML = '<span>' + esc(item ? photoNoteText(item) : 'No photo yet') + '</span>';
          });
        });
      }

      function render(){
        renderTabs();
        var range = RANGES.filter(function(r){ return r.id === activeRange; })[0];
        var list = sorted(activeItems().filter(function(it){ return range.test(it.price) && (activeCategory === 'all' || itemCat(it) === activeCategory) && (!activeSet || setOf(it) === activeSet); }));
        var sfb = document.getElementById('setFilterBar');
        var sfn = document.getElementById('setFilterName');
        if (sfb && sfn){
          if (activeSet && SETS[activeSet]){
            sfn.textContent = SETS[activeSet].name + ' (' + SETS[activeSet].pieces + ' pieces)';
            sfb.classList.add('show');
          } else {
            sfb.classList.remove('show');
          }
        }
        var grid = document.getElementById('grid'); grid.innerHTML = '';
        list.forEach(function(it){
          var card = document.createElement('article'); card.className = 'card is-clickable'; card.setAttribute('data-card-id', it.id); card.setAttribute('title', 'Tap to view and edit');
          var photo = photoHTML(it);
          var buy = it.url
            ? '<div class="buy"><a href="' + esc(it.url) + '" target="_blank" rel="noopener">Buy this at ' + esc(it.store || 'the store') + '</a></div>'
            : '';
          card.innerHTML = photo +
            '<div class="body">' +
              '<div class="top"><div><h3><button type="button" class="title-btn detail-open" data-id="' + esc(it.id) + '">' + esc(it.name) + '</button></h3><div class="store">' + esc(it.store || '') + '</div></div>' +
              '<div class="price">' + money(it.price) + ' <small>' + esc(currencyOf(it)) + '</small></div></div>' +
              '<div class="want">' + wantHTML(it) + '</div>' +
              '<div class="chips"><span class="chip cat">' + esc(catLabel(itemCat(it))) + '</span>' + (it.added ? '<span class="chip alt">Added by Shahd</span>' : '') + '</div>' +
              (setOf(it) ? '<div>' + setTagHTML(it) + '</div>' : '') +
              (it.variant ? '<div class="variant">' + esc(it.variant) + '</div>' : '') +
              '<button type="button" class="details-btn detail-open" data-id="' + esc(it.id) + '">View and edit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
              '<div class="cardtools">' +
                '<button type="button" class="ctool edit" data-id="' + esc(it.id) + '">' + PENCIL + 'Edit</button>' +
                '<button type="button" class="ctool remove" data-id="' + esc(it.id) + '">' + TRASH + 'Remove</button>' +
              '</div>' +
              buy +
            '</div>';
          grid.appendChild(card);
        });
        bindPhotoErrors(grid);
        grid.querySelectorAll('.hbtn').forEach(function(b){
          b.addEventListener('click', function(){
            var it = byId(b.getAttribute('data-id'));
            if (it) { it.want = parseInt(b.getAttribute('data-w'), 10); render(); persist(); }
          });
        });
        grid.querySelectorAll('.set-tag').forEach(function(b){
          b.addEventListener('click', function(e){
            e.stopPropagation();
            var sid = b.getAttribute('data-set');
            if (!sid) return;
            activeSet = sid;
            activeRange = 'all';
            activeCategory = 'all';
            render();
            var g = document.getElementById('grid');
            if (g) g.scrollIntoView({ behavior:'smooth', block:'start' });
          });
        });
        grid.querySelectorAll('.detail-open').forEach(function(b){
          b.addEventListener('click', function(e){ e.stopPropagation(); openDetail(b.getAttribute('data-id')); });
        });
        grid.querySelectorAll('.card.is-clickable').forEach(function(cardEl){
          cardEl.addEventListener('click', function(e){
            if (e.target.closest('a, .cardtools, .hbtn, .set-tag')) return;
            if (e.target.closest('.detail-open')) return;
            var cid = cardEl.getAttribute('data-card-id');
            openDetail(cid);
          });
          /* Keyboard access stays on the photo and title buttons inside the card, which open the same detail / edit view. */
        });
        grid.querySelectorAll('.ctool.edit').forEach(function(b){
          b.addEventListener('click', function(){ openDetail(b.getAttribute('data-id')); });
        });
        grid.querySelectorAll('.ctool.remove').forEach(function(b){
          b.addEventListener('click', function(){ removeItem(b.getAttribute('data-id')); });
        });
        document.getElementById('empty').style.display = list.length ? 'none' : 'block';
        var noteParts = [];
        if (activeSet && SETS[activeSet]) noteParts.push(SETS[activeSet].name);
        if (activeCategory !== 'all') noteParts.push(catLabel(activeCategory));
        if (activeRange !== 'all') noteParts.push(range.label);
        document.getElementById('resultNote').textContent = list.length + (list.length === 1 ? ' item' : ' items') + (noteParts.length ? ' \u00b7 ' + noteParts.join(' \u00b7 ') : ' on the list');
      }

      function renderReceived(){
        var sec = document.getElementById('receivedSection');
        var g = document.getElementById('receivedGrid');
        if (!sec || !g) return;
        var list = sorted(items.filter(function(it){ return it.received; }));
        sec.hidden = list.length === 0;
        g.innerHTML = '';
        list.forEach(function(it){
          var card = document.createElement('article'); card.className = 'card is-clickable'; card.setAttribute('data-card-id', it.id); card.setAttribute('title', 'Tap to view, edit, or restore');
          var photo = photoHTML(it);
          card.innerHTML = photo +
            '<div class="body">' +
              '<div class="top"><div><h3><button type="button" class="title-btn detail-open" data-id="' + esc(it.id) + '">' + esc(it.name) + '</button></h3><div class="store">' + esc(it.store || '') + '</div></div>' +
              '<div class="price">' + money(it.price) + ' <small>' + esc(currencyOf(it)) + '</small></div></div>' +
              '<div class="chips"><span class="chip received-badge">Received</span><span class="chip cat">' + esc(catLabel(itemCat(it))) + '</span></div>' +
              (it.variant ? '<div class="variant">' + esc(it.variant) + '</div>' : '') +
              '<button type="button" class="details-btn detail-open" data-id="' + esc(it.id) + '">View, edit, or restore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
            '</div>';
          g.appendChild(card);
        });
        bindPhotoErrors(g);
        g.querySelectorAll('.detail-open').forEach(function(b){
          b.addEventListener('click', function(e){ e.stopPropagation(); openDetail(b.getAttribute('data-id')); });
        });
        g.querySelectorAll('.card.is-clickable').forEach(function(cardEl){
          cardEl.addEventListener('click', function(e){
            if (e.target.closest('a, .detail-open')) return;
            openDetail(cardEl.getAttribute('data-card-id'));
          });
        });
      }

      function renderSpecs(){
        var g = document.getElementById('specGrid'); if (!g) return; g.innerHTML = '';
        sizeBlocks.forEach(function(s, idx){
          var d = document.createElement('div'); d.className = 'spec' + (s.unset ? ' unset' : '');
          d.innerHTML = '<button type="button" class="spec-remove" data-i="' + idx + '" aria-label="Remove ' + esc(s.k) + ' size block">&times;</button>' +
            '<div class="k"><span class="dyn-edit" data-spec="' + idx + '" data-field="k">' + esc(s.k) + '</span></div>' +
            '<div class="v"><span class="dyn-edit" data-spec="' + idx + '" data-field="v">' + esc(s.v) + '</span></div>' +
            (s.n ? '<div class="n"><span class="dyn-edit" data-spec="' + idx + '" data-field="n">' + esc(s.n) + '</span></div>' : '<div class="n"><span class="dyn-edit" data-spec="' + idx + '" data-field="n"></span></div>');
          g.appendChild(d);
        });
        g.querySelectorAll('.spec-remove').forEach(function(b){
          b.addEventListener('click', function(e){ e.stopPropagation(); removeSizeBlock(parseInt(b.getAttribute('data-i'), 10)); });
        });
        g.querySelectorAll('.dyn-edit').forEach(function(el){
          el.contentEditable = isShahd() ? 'true' : 'false';
          el.addEventListener('click', function(e){ e.stopPropagation(); });
          el.addEventListener('blur', function(){
            var s = sizeBlocks[parseInt(el.getAttribute('data-spec'), 10)];
            if (s) { s[el.getAttribute('data-field')] = el.textContent.trim(); persist(); }
          });
        });
      }

      function renderGiftCards(){
        var g = document.getElementById('gcGrid'); g.innerHTML = '';
        giftCards.forEach(function(c, idx){
          var d = document.createElement('div'); d.className = 'gc';
          d.innerHTML = '<button type="button" class="gc-remove" data-i="' + idx + '" aria-label="Remove ' + esc(c.name) + ' gift card">&times;</button>' +
            '<div class="name"><span class="dyn-edit" data-gc="' + idx + '" data-field="name">' + esc(c.name) + '</span></div><p><span class="dyn-edit" data-gc="' + idx + '" data-field="use">' + esc(c.use) + '</span></p>';
          g.appendChild(d);
        });
        g.querySelectorAll('.gc-remove').forEach(function(b){
          b.addEventListener('click', function(){ removeGiftCard(parseInt(b.getAttribute('data-i'), 10)); });
        });
        g.querySelectorAll('.dyn-edit').forEach(function(el){
          el.contentEditable = isShahd() ? 'true' : 'false';
          el.addEventListener('blur', function(){
            var c = giftCards[parseInt(el.getAttribute('data-gc'), 10)];
            if (c) { c[el.getAttribute('data-field')] = el.textContent.trim(); persist(); }
          });
        });
      }

      function renderFoods(){
        var g = document.getElementById('foodGrid'); if (!g) return; g.innerHTML = '';
        foods.forEach(function(f, idx){
          var d = document.createElement('div'); d.className = 'food-card';
          d.innerHTML = '<button type="button" class="food-remove" data-i="' + idx + '" aria-label="Remove ' + esc(f.name) + '">&times;</button>' +
            '<div class="name"><span class="dyn-edit" data-food="' + idx + '" data-field="name">' + esc(f.name) + '</span></div>' +
            '<p><span class="dyn-edit" data-food="' + idx + '" data-field="desc">' + esc(f.desc) + '</span></p>';
          g.appendChild(d);
        });
        g.querySelectorAll('.food-remove').forEach(function(b){
          b.addEventListener('click', function(){ removeFood(parseInt(b.getAttribute('data-i'), 10)); });
        });
        g.querySelectorAll('.dyn-edit').forEach(function(el){
          el.contentEditable = isShahd() ? 'true' : 'false';
          el.addEventListener('blur', function(){
            var f = foods[parseInt(el.getAttribute('data-food'), 10)];
            if (f) { f[el.getAttribute('data-field')] = el.textContent.trim(); persist(); }
          });
        });
      }

      function renderVibe(){
        var g = document.getElementById('vibeGrid'); if (!g) return; g.innerHTML = '';
        vibeImages.forEach(function(v){
          var d = document.createElement('article'); d.className = 'vibe-tile' + (v.src ? '' : ' vibe-note-tile');
          var photo = v.src
            ? '<div class="vphoto"><img src="' + esc(v.src) + '" alt="' + esc(v.caption) + '" loading="lazy" /></div>'
            : '<div class="vphoto vnote-photo"><span class="dyn-edit" data-vibe="' + esc(v.id) + '" data-field="caption">' + esc(v.caption) + '</span></div>';
          var body = v.src
            ? '<div class="vbody"><div class="vcap"><span class="dyn-edit" data-vibe="' + esc(v.id) + '" data-field="caption">' + esc(v.caption) + '</span></div>' +
              '<p class="vnote"><span class="dyn-edit" data-vibe="' + esc(v.id) + '" data-field="note">' + esc(v.note || '') + '</span></p></div>'
            : '<div class="vbody"><p class="vnote"><span class="dyn-edit" data-vibe="' + esc(v.id) + '" data-field="note">' + esc(v.note || '') + '</span></p></div>';
          d.innerHTML = '<button type="button" class="vremove" data-id="' + esc(v.id) + '" aria-label="Remove ' + esc(v.caption) + '">&times;</button>' +
            photo + body;
          g.appendChild(d);
        });
        var c = document.getElementById('vibeCount'); if (c) c.textContent = vibeImages.length ? String(vibeImages.length) : '';
        var e = document.getElementById('vibeEmpty'); if (e) e.hidden = vibeImages.length > 0;
        g.querySelectorAll('.vremove').forEach(function(b){
          b.addEventListener('click', function(){ removeVibe(b.getAttribute('data-id')); });
        });
        g.querySelectorAll('.dyn-edit').forEach(function(el){
          el.contentEditable = isShahd() ? 'true' : 'false';
          el.addEventListener('blur', function(){
            for (var i = 0; i < vibeImages.length; i++) if (vibeImages[i].id === el.getAttribute('data-vibe')) vibeImages[i][el.getAttribute('data-field')] = el.textContent.trim();
            persist();
          });
        });
      }

      function renderBrands(){
        var wrap = document.getElementById('brandChips'); if (!wrap) return;
        var names = [];
        wrap.querySelectorAll('.chip .chip-name').forEach(function(s){ names.push(s.textContent.trim()); });
        if (!names.length) wrap.querySelectorAll('.chip').forEach(function(ch){ names.push(ch.textContent.trim()); });
        wrap.innerHTML = '';
        names.forEach(function(n){
          var chip = document.createElement('span'); chip.className = 'chip';
          chip.innerHTML = '<span class="chip-name dyn-edit">' + esc(n) + '</span><button type="button" class="chip-remove" aria-label="Remove ' + esc(n) + '">&times;</button>';
          wrap.appendChild(chip);
        });
        wrap.querySelectorAll('.chip-remove').forEach(function(b){
          b.addEventListener('click', function(){ b.parentElement.remove(); persist(); });
        });
        wrap.querySelectorAll('.dyn-edit').forEach(function(el){
          el.contentEditable = isShahd() ? 'true' : 'false';
          el.addEventListener('blur', persist);
        });
      }
      function brandNames(){
        var out = [];
        document.querySelectorAll('#brandChips .chip-name').forEach(function(s){ var t = s.textContent.trim(); if (t) out.push(t); });
        if (!out.length) document.querySelectorAll('#brandChips .chip').forEach(function(ch){ var t = ch.textContent.replace('\u00d7','').trim(); if (t) out.push(t); });
        return out;
      }

      /* ---------- share / export (reflects edits and removals) ---------- */
      function sizesLine(){
        var parts = [];
        document.querySelectorAll('.spec').forEach(function(s){
          var k = s.querySelector('.k'), v = s.querySelector('.v');
          if (k && v) parts.push(k.textContent.trim() + ': ' + v.textContent.trim());
        });
        return parts.length ? parts.join(' · ') : 'Call It Spring shoes 9, UGG shoes 10, tops M, bottoms L';
      }
      function listAsText(){
        var lines = ["SHAHD'S WISHLIST", editText('birthday', 'Birthday: November 19'), '',
          'MY SIZES: ' + sizesLine(), '',
          editText('lede', ''), ''];
        sorted(activeItems()).forEach(function(it, i){
          lines.push((i + 1) + '. ' + it.name + ' \u00b7 ' + money(it.price) + ' ' + currencyOf(it) + ' at ' + (it.store || ''));
          lines.push('   Category: ' + catLabel(itemCat(it)));
          if (it.variant) lines.push('   Want: ' + it.variant);
          lines.push('   How much I want it: ' + it.want + '/5 (' + (WANT_LABELS[it.want] || '') + ')');
          if (it.note) lines.push('   ' + it.note);
          if (it.url) lines.push('   Buy it: ' + it.url);
          lines.push('');
        });
        lines.push('GIFT CARDS I LOVE: ' + giftCards.map(function(c){ return c.name; }).join(', '));
        lines.push('');
        lines.push('MORE THAN THINGS:');
        lines.push(editText('love1title', 'Handmade, drawings, and art') + ': ' + editText('love1text', ''));
        lines.push('Experiences: ' + [editText('exp1', ''), editText('exp2', ''), editText('exp3', ''), editText('exp4', '')].filter(Boolean).join(', ') + '.');
        lines.push('Brands: ' + brandNames().join(', ') + '.');
        lines.push('The vibe: ' + editText('vibeText', 'Cute, dreamy, whimsical.'));
        lines.push('Inspiration: https://pin.it/2zMBfWgs5');
        lines.push('');
        lines.push('VIBE BOARD:');
        vibeImages.forEach(function(v){ lines.push('- ' + v.caption + (v.note ? ': ' + v.note : '')); });
        lines.push('');
        lines.push('LITTLE FOODS:');
        foods.forEach(function(f){ lines.push('- ' + f.name + ': ' + f.desc); });
        return lines.join('\n');
      }

      function download(name, content, type){
        var blob = new Blob([content], { type: type });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 400);
      }

      function shareableHTML(){
        var rows = sorted(activeItems()).map(function(it){
          return '<div style="border:1px solid #ddd;border-radius:12px;padding:16px;margin:0 0 14px">' +
            '<div style="font-size:18px;font-weight:700">' + esc(it.name) + ' <span style="float:right">' + money(it.price) + ' ' + esc(currencyOf(it)) + '</span></div>' +
            '<div style="color:#555">' + esc(it.store || '') + ' \u00b7 ' + esc(catLabel(itemCat(it))) + '</div>' +
            (it.variant ? '<div style="margin-top:6px"><b>Want:</b> ' + esc(it.variant) + '</div>' : '') +
            '<div><b>How much I want it:</b> ' + it.want + '/5</div>' +
            (it.note ? '<p style="color:#555;margin:6px 0">' + esc(it.note) + '</p>' : '') +
            (!it.img && it.imgNote ? '<p style="color:#555;margin:6px 0">No photo: ' + esc(it.imgNote) + '</p>' : '') +
            (it.url ? '<a href="' + esc(it.url) + '">Buy it here</a>' : '') + '</div>';
        }).join('');
        var vibeRows = vibeImages.map(function(v){
          var img = v.src ? '<img src="' + esc(v.src) + '" alt="' + esc(v.caption) + '" style="max-width:100%;border-radius:8px" />' : '';
          return '<div style="border:1px solid #ddd;border-radius:12px;padding:12px;margin:0 0 10px">' + img + '<div style="font-weight:700;margin-top:8px">' + esc(v.caption) + '</div>' + (v.note ? '<div style="color:#555">' + esc(v.note) + '</div>' : '') + '</div>';
        }).join('');
        return '<!doctype html><html><head><meta charset="utf-8"><title>Shahd\u2019s Wishlist</title></head>' +
          '<body style="font-family:system-ui,sans-serif;max-width:640px;margin:32px auto;padding:0 16px;color:#222">' +
          '<h1>Shahd\u2019s Wishlist</h1><p>' + esc(editText('birthday', 'Birthday: November 19')) + '</p>' +
          '<p>' + esc(editText('lede', '')) + '</p>' +
          '<p><b>My sizes:</b> ' + esc(sizesLine()) + '</p>' +
          rows +
          '<h2>' + esc(editText('gcTitle', 'Gift cards I love')) + '</h2><p>' + giftCards.map(function(c){ return esc(c.name) + (c.use ? ' (' + esc(c.use) + ')' : ''); }).join(', ') + '</p>' +
          '<h2>More than things</h2><p>' + esc(editText('love1title', 'Handmade things, drawings, and art')) + ': ' + esc(editText('love1text', '')) + ' Experiences: ' + esc([editText('exp1', ''), editText('exp2', ''), editText('exp3', ''), editText('exp4', '')].filter(Boolean).join(', ')) + '. Brands: ' + esc(brandNames().join(', ')) + '. The vibe: ' + esc(editText('vibeText', '')) + ' <a href="https://pin.it/2zMBfWgs5">My Pinterest board</a>.</p>' +
          '<h2>Vibe board</h2>' + vibeRows +
          '<h2>' + esc(editText('foodTitle', 'Little foods')) + '</h2>' + foods.map(function(f){ return '<p><b>' + esc(f.name) + ':</b> ' + esc(f.desc) + '</p>'; }).join('') +
          '</body></html>';
      }

      var setClearBtn = document.getElementById('setFilterClear');
      if (setClearBtn) setClearBtn.addEventListener('click', function(){ activeSet = null; render(); });
      document.getElementById('sort').addEventListener('change', render);
      document.getElementById('copyBtn').addEventListener('click', function(){
        var text = listAsText();
        function done(){ var t = document.getElementById('shareToast'); t.style.display = 'block'; setTimeout(function(){ t.style.display = 'none'; }, 3500); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function(){ download('shahds-wishlist.txt', text, 'text/plain'); });
        else download('shahds-wishlist.txt', text, 'text/plain');
      });
      document.getElementById('downloadBtn').addEventListener('click', function(){ download('shahds-wishlist.html', shareableHTML(), 'text/html'); });
      document.getElementById('downloadTxtBtn').addEventListener('click', function(){ download('shahds-wishlist.txt', listAsText(), 'text/plain'); });

      document.getElementById('addForm').addEventListener('submit', function(e){
        e.preventDefault();
        var form = e.target;
        var f = new FormData(form);
        var url = (f.get('url') || '').toString().trim();
        var pc = form.querySelector('[data-photo-choice]');
        readPhotoChoice(pc, form, function(photo){
          items.push({
            id: 'custom-' + Date.now(),
            name: (f.get('name') || 'Untitled item').toString().trim(),
            store: (f.get('store') || '').toString().trim(),
            price: parseFloat(f.get('price')) || 0,
            want: parseInt(f.get('want'), 10) || 3,
            variant: (f.get('variant') || '').toString().trim(),
            category: (f.get('category') || 'other').toString().trim() || 'other',
            note: (f.get('note') || '').toString().trim(),
            imgNote: photo.imgNote,
            url: url, img: photo.img, added: true, addedSeq: nextAddedSeq()
          });
          form.reset();
          fillPhotoChoice(pc, null);
          activeRange = 'all'; activeCategory = 'all';
          render(); persist();
          var t = document.getElementById('addToast'); t.style.display = 'block';
          document.getElementById('grid').scrollIntoView({ behavior:'smooth', block:'start' });
        });
      });
      initPhotoChoice(document.querySelector('#addForm [data-photo-choice]'), null);

      /* ---------- views: Wishlist, Vibe board, Shahd view ---------- */
      function applyEditable(){
        document.querySelectorAll('[data-edit]').forEach(function(el){ el.contentEditable = shahdMode ? 'true' : 'false'; });
        document.querySelectorAll('.dyn-edit').forEach(function(el){ el.contentEditable = shahdMode ? 'true' : 'false'; });
      }
      function setView(v){
        currentView = v;
        shahdMode = (v === 'shahd');
        document.body.classList.toggle('shahd', shahdMode);
        document.querySelectorAll('.viewtab').forEach(function(b){ b.setAttribute('aria-selected', b.getAttribute('data-view') === v ? 'true' : 'false'); });
        var bar = document.getElementById('shahdBar'); if (bar) bar.hidden = !shahdMode;
        var vibeSec = document.getElementById('vibeView');
        var specs = document.getElementById('specs');
        var more = document.getElementById('more-ideas');
        var fb = document.querySelector('.filterbar');
        var mainEl = document.querySelector('main');
        if (v === 'vibe'){
          if (vibeSec) vibeSec.hidden = false;
          if (specs) specs.style.display = 'none';
          if (more) more.style.display = 'none';
          if (fb) fb.style.display = 'none';
          if (mainEl) mainEl.style.display = 'none';
        } else {
          if (vibeSec) vibeSec.hidden = (v !== 'shahd');
          if (specs) specs.style.display = '';
          if (more) more.style.display = '';
          if (fb) fb.style.display = '';
          if (mainEl) mainEl.style.display = '';
        }
        if (shahdMode && !managing){
          managing = true;
          var mb = document.getElementById('manageBtn'); if (mb) mb.setAttribute('aria-pressed', 'true');
          document.body.classList.add('managing');
          render();
        }
        if (!shahdMode && v !== 'vibe' && managing && currentView === 'wishlist'){
          /* keep manage state as the visitor left it */
        }
        applyEditable();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      document.querySelectorAll('.viewtab').forEach(function(b){
        b.addEventListener('click', function(){ setView(b.getAttribute('data-view')); });
      });
      var goVibe = document.getElementById('goVibeBtn'); if (goVibe) goVibe.addEventListener('click', function(){ setView('vibe'); });
      var doneBtn = document.getElementById('shahdDoneBtn'); if (doneBtn) doneBtn.addEventListener('click', function(){ setView('wishlist'); });
      var shahdVibeBtn = document.getElementById('shahdVibeBtn'); if (shahdVibeBtn) shahdVibeBtn.addEventListener('click', function(){
        var vs = document.getElementById('vibeView'); if (vs) vs.scrollIntoView({ behavior:'smooth', block:'start' });
      });

      /* ---------- Shahd view add forms ---------- */
      /* ---------- Vibe board adds: photo link, or a picked photo, or just a caption ----------
         A picked photo is shrunk in the browser to at most 1200px wide before
         it is stored as a data URL, so data.json stays reasonable. A tile with
         no photo at all is allowed too: it renders as a note tile with its
         caption. Both the Shahd view form and the form on the Vibe board tab
         use the same code, and tiles live in vibeImages, so the GitHub save
         and the data.json download include them. */
      function downscaleDimensions(w, h, maxW){
        if (!w || !h) return { width: 0, height: 0 };
        var scale = Math.min(1, maxW / w);
        return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
      }
      function downscaleImageFile(file, done){
        if (!file || !file.type || file.type.indexOf('image/') !== 0){ done(null); return; }
        function fallback(){
          if (typeof FileReader === 'undefined'){ done(null); return; }
          var reader = new FileReader();
          reader.onload = function(){ done(String(reader.result)); };
          reader.onerror = function(){ done(null); };
          reader.readAsDataURL(file);
        }
        try {
          if (typeof URL === 'undefined' || !URL.createObjectURL || typeof Image === 'undefined' || typeof document === 'undefined' || !document.createElement){ fallback(); return; }
          var url = URL.createObjectURL(file);
          var img = new Image();
          img.onload = function(){
            try {
              var size = downscaleDimensions(img.naturalWidth, img.naturalHeight, 1200);
              if (!size.width || !size.height){ URL.revokeObjectURL(url); fallback(); return; }
              var canvas = document.createElement('canvas');
              canvas.width = size.width; canvas.height = size.height;
              var ctx = canvas.getContext('2d');
              if (!ctx){ URL.revokeObjectURL(url); fallback(); return; }
              ctx.drawImage(img, 0, 0, size.width, size.height);
              URL.revokeObjectURL(url);
              var type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
              done(canvas.toDataURL(type, 0.85));
            } catch (err){ try { URL.revokeObjectURL(url); } catch (e) {} fallback(); }
          };
          img.onerror = function(){ try { URL.revokeObjectURL(url); } catch (e) {} fallback(); };
          img.src = url;
        } catch (err){ fallback(); }
      }
      /* ---------- photo choice: upload a photo, use a photo link, or show a note ----------
         One block per item form (add, edit, detail). Each block keeps its own
         values while the form is open, so switching between the three keeps
         what was typed or picked. On save, the chosen mode decides what is
         written: upload writes the picked photo as a data URL, link writes
         the URL, note clears the image and writes the note. The note is
         always kept on the item too, so it still shows if a photo link ever
         fails to load. */
      function photoModeOf(it){
        if (!it || !it.img) return 'note';
        if (String(it.img).indexOf('data:image/') === 0) return 'upload';
        return 'link';
      }
      function photoChoiceState(container){
        if (!container._photo) container._photo = { mode:'link', uploadDataUrl:'', uploadName:'', lastFile:null, shrinking:false, shrinkWaiters:[] };
        return container._photo;
      }
      function showPhotoPanel(container, mode){
        var st = photoChoiceState(container);
        st.mode = mode;
        container.querySelectorAll('[data-pc-panel]').forEach(function(p){
          p.hidden = p.getAttribute('data-pc-panel') !== mode;
        });
        container.querySelectorAll('input[name="photoMode"]').forEach(function(r){
          r.checked = r.value === mode;
          var lab = r.closest ? r.closest('.pc-mode') : null;
          if (lab) lab.classList.toggle('on', r.checked);
        });
      }
      function updatePhotoPreview(container){
        var st = photoChoiceState(container);
        var prev = container.querySelector('.pc-preview');
        if (!prev) return;
        var img = prev.querySelector('img');
        var label = prev.querySelector('span');
        if (st.uploadDataUrl){
          prev.hidden = false;
          if (img) img.src = st.uploadDataUrl;
          if (label) label.textContent = st.uploadName || 'Picked photo';
        } else {
          prev.hidden = true;
          if (img) img.removeAttribute('src');
          if (label) label.textContent = '';
        }
      }
      function onPhotoFilePicked(container){
        var st = photoChoiceState(container);
        var fileInput = container.querySelector('input[name="imgFile"]');
        var file = fileInput && fileInput.files && fileInput.files[0];
        if (!file){ st.lastFile = null; return; }
        st.lastFile = file;
        st.uploadName = file.name || 'Picked photo';
        st.shrinking = true;
        downscaleImageFile(file, function(dataUrl){
          st.uploadDataUrl = dataUrl || '';
          st.shrinking = false;
          updatePhotoPreview(container);
          var cbs = st.shrinkWaiters || []; st.shrinkWaiters = [];
          cbs.forEach(function(cb){ cb(); });
        });
      }
      function fillPhotoChoice(container, item){
        var st = photoChoiceState(container);
        var linkInput = container.querySelector('input[name="img"]');
        var noteInput = container.querySelector('input[name="imgNote"]');
        var fileInput = container.querySelector('input[name="imgFile"]');
        st.uploadDataUrl = ''; st.uploadName = ''; st.lastFile = null; st.shrinking = false; st.shrinkWaiters = [];
        if (fileInput) fileInput.value = '';
        if (item){
          if (photoModeOf(item) === 'upload'){
            st.uploadDataUrl = item.img; st.uploadName = 'Photo you uploaded';
          }
          if (linkInput) linkInput.value = photoModeOf(item) === 'link' ? item.img : '';
          if (noteInput) noteInput.value = item.imgNote || '';
        } else {
          if (linkInput) linkInput.value = '';
          if (noteInput) noteInput.value = '';
        }
        showPhotoPanel(container, item ? photoModeOf(item) : 'link');
        updatePhotoPreview(container);
      }
      function initPhotoChoice(container, item){
        if (!container) return;
        if (!container._photoWired){
          container._photoWired = true;
          container.querySelectorAll('input[name="photoMode"]').forEach(function(r){
            r.addEventListener('change', function(){ if (r.checked) showPhotoPanel(container, r.value); });
          });
          var fileInput = container.querySelector('input[name="imgFile"]');
          if (fileInput) fileInput.addEventListener('change', function(){ onPhotoFilePicked(container); });
        }
        fillPhotoChoice(container, item);
      }
      /* Reads the chosen photo into {img, imgNote}. Calls done() when ready.
         The upload path is async because a picked photo is shrunk first. */
      function readPhotoChoice(container, form, done){
        var st = photoChoiceState(container);
        var checked = container.querySelector('input[name="photoMode"]:checked');
        var mode = checked ? checked.value : st.mode;
        var noteInput = container.querySelector('input[name="imgNote"]');
        var note = noteInput ? noteInput.value.trim() : '';
        if (mode === 'note'){
          done({ img:'', imgNote:note });
          return;
        }
        if (mode === 'link'){
          var linkInput = container.querySelector('input[name="img"]');
          done({ img: linkInput ? linkInput.value.trim() : '', imgNote:note });
          return;
        }
        /* upload mode */
        var file = null;
        try {
          var fd = new FormData(form);
          var picked = fd.get('imgFile');
          if (picked && picked.size) file = picked;
        } catch (err) {}
        if (!file){
          var fi = container.querySelector('input[name="imgFile"]');
          if (fi && fi.files && fi.files[0]) file = fi.files[0];
        }
        if (file){
          if (st.shrinking){
            (st.shrinkWaiters = st.shrinkWaiters || []).push(function(){
              done({ img: st.uploadDataUrl || '', imgNote:note });
            });
            return;
          }
          if (st.lastFile === file && st.uploadDataUrl){
            done({ img: st.uploadDataUrl, imgNote:note });
            return;
          }
          downscaleImageFile(file, function(dataUrl){
            st.uploadDataUrl = dataUrl || '';
            st.lastFile = file;
            updatePhotoPreview(container);
            done({ img: st.uploadDataUrl, imgNote:note });
          });
          return;
        }
        done({ img: st.uploadDataUrl || '', imgNote:note });
      }
      function addVibeTile(src, caption, note, formEl, toastEl){
        caption = (caption || '').toString().trim() || 'Untitled vibe photo';
        vibeImages.push({ id:'vibe-' + Date.now(), src:(src || '').toString().trim(), caption:caption, note:(note || '').toString().trim() });
        if (formEl) formEl.reset();
        renderVibe(); applyEditable(); persist();
        if (toastEl){ toastEl.style.display = 'block'; setTimeout(function(){ toastEl.style.display = 'none'; }, 3000); }
      }
      function submitVibeForm(formEl, toastEl){
        var f = new FormData(formEl);
        var caption = (f.get('caption') || '').toString();
        var note = (f.get('note') || '').toString();
        var src = (f.get('src') || '').toString().trim();
        var file = f.get('file');
        if (file && file.size){
          downscaleImageFile(file, function(dataUrl){
            addVibeTile(dataUrl || src, caption, note, formEl, toastEl);
          });
        } else {
          addVibeTile(src, caption, note, formEl, toastEl);
        }
      }
      document.getElementById('vibeAddForm').addEventListener('submit', function(e){
        e.preventDefault();
        submitVibeForm(e.target, document.getElementById('vibeToast'));
        var vs = document.getElementById('vibeView'); if (vs) vs.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      var vibeTabForm = document.getElementById('vibeTabForm');
      if (vibeTabForm) vibeTabForm.addEventListener('submit', function(e){
        e.preventDefault();
        submitVibeForm(e.target, document.getElementById('vibeTabToast'));
      });
      document.getElementById('gcAddForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        var name = (f.get('name') || '').toString().trim(); if (!name) return;
        giftCards.push({ name:name, use:(f.get('use') || '').toString().trim() });
        e.target.reset(); renderGiftCards(); persist();
        var gc = document.getElementById('giftcards'); if (gc) gc.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      document.getElementById('foodAddForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        var name = (f.get('name') || '').toString().trim(); if (!name) return;
        foods.push({ name:name, desc:(f.get('desc') || '').toString().trim() });
        e.target.reset(); renderFoods(); persist();
        var lf = document.getElementById('little-foods'); if (lf) lf.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      document.getElementById('specAddForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        if (addSizeBlock((f.get('k') || '').toString(), (f.get('v') || '').toString(), (f.get('n') || '').toString())){
          e.target.reset();
          var sp = document.getElementById('specs'); if (sp){ sp.classList.add('open'); document.getElementById('specsToggle').setAttribute('aria-expanded', 'true'); sp.scrollIntoView({ behavior:'smooth', block:'start' }); }
        }
      });
      document.getElementById('specInlineForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        if (addSizeBlock((f.get('k') || '').toString(), (f.get('v') || '').toString(), (f.get('n') || '').toString())) e.target.reset();
      });
      document.getElementById('gcInlineForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        var name = (f.get('name') || '').toString().trim(); if (!name) return;
        giftCards.push({ name:name, use:(f.get('use') || '').toString().trim() });
        e.target.reset(); renderGiftCards(); applyEditable(); persist();
      });
      document.getElementById('foodInlineForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        var name = (f.get('name') || '').toString().trim(); if (!name) return;
        foods.push({ name:name, desc:(f.get('desc') || '').toString().trim() });
        e.target.reset(); renderFoods(); applyEditable(); persist();
      });
      document.getElementById('brandAddForm').addEventListener('submit', function(e){
        e.preventDefault();
        var f = new FormData(e.target);
        var name = (f.get('name') || '').toString().trim(); if (!name) return;
        var wrap = document.getElementById('brandChips');
        var chip = document.createElement('span'); chip.className = 'chip';
        chip.innerHTML = '<span class="chip-name dyn-edit">' + esc(name) + '</span><button type="button" class="chip-remove" aria-label="Remove ' + esc(name) + '">&times;</button>';
        wrap.appendChild(chip);
        chip.querySelector('.chip-remove').addEventListener('click', function(){ chip.remove(); persist(); });
        var brandEdit = chip.querySelector('.dyn-edit');
        brandEdit.contentEditable = 'true';
        brandEdit.addEventListener('blur', persist);
        e.target.reset(); persist();
      });

      /* ---------- publish to GitHub: send this browser's edits to the public page ----------
         The token lives in this browser only (localStorage). It is never written
         into a file and is only sent to api.github.com. Visitors without a token
         can still use Shahd view locally; the save button just asks for a token. */
      var GH_OWNER = 'alsafas';
      var GH_REPO = 'wishlist';
      var GH_BRANCH = 'main';
      var GH_PATH = 'data.json';
      var GH_TOKEN_KEY = 'shahd-wishlist-github-token';
      var GH_API_URL = 'https://api.github.com/repos/' + GH_OWNER + '/' + GH_REPO + '/contents/' + GH_PATH;
      function ghGetToken(){
        try { return localStorage.getItem(GH_TOKEN_KEY) || ''; } catch (err) { return ''; }
      }
      function ghCurrentData(){
        return { items: items, giftCards: giftCards, foods: foods, sizeBlocks: sizeBlocks, vibeImages: vibeImages, pageText: currentPageText() };
      }
      function ghDataText(){
        return JSON.stringify(ghCurrentData(), null, 2) + '\n';
      }
      function ghBase64Utf8(str){
        var bytes = new TextEncoder().encode(str);
        var bin = '';
        var chunk = 0x8000;
        for (var i = 0; i < bytes.length; i += chunk){
          bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
        }
        return btoa(bin);
      }
      function ghSetStatus(text){ var el = document.getElementById('ghSaveStatus'); if (el) el.textContent = text; }
      function ghSetTokenStatus(text){ var el = document.getElementById('ghTokenStatus'); if (el) el.textContent = text; }
      function ghTokenState(){
        var has = !!ghGetToken();
        var input = document.getElementById('ghTokenInput');
        var removeBtn = document.getElementById('ghTokenRemoveBtn');
        if (input) input.value = '';
        if (removeBtn) removeBtn.hidden = !has;
        if (has) ghSetTokenStatus('Token saved on this device.');
      }
      var ghTokenSaveBtn = document.getElementById('ghTokenSaveBtn');
      if (ghTokenSaveBtn) ghTokenSaveBtn.addEventListener('click', function(){
        var input = document.getElementById('ghTokenInput');
        var token = input ? input.value.trim() : '';
        if (!token){ ghSetTokenStatus('Paste your token first.'); return; }
        try { localStorage.setItem(GH_TOKEN_KEY, token); } catch (err) {
          ghSetTokenStatus('This browser could not save the token. Try another browser.');
          return;
        }
        ghTokenState();
      });
      var ghTokenRemoveBtn = document.getElementById('ghTokenRemoveBtn');
      if (ghTokenRemoveBtn) ghTokenRemoveBtn.addEventListener('click', function(){
        try { localStorage.removeItem(GH_TOKEN_KEY); } catch (err) {}
        ghTokenState();
        ghSetTokenStatus('Token removed from this device.');
      });
      var ghDownloadBtn = document.getElementById('ghDownloadBtn');
      if (ghDownloadBtn) ghDownloadBtn.addEventListener('click', function(){
        download('data.json', ghDataText(), 'application/json');
        ghSetStatus('Downloaded data.json with your edits. Upload it to the repo and the public page updates too.');
      });
      /* One shared save path, used by the manual button and by auto-save.
         It sends the wishlist as it is now to data.json in the repo. The
         text it sends is remembered, so a later save with nothing new to
         send is skipped instead of making an empty commit. */
      function ghSaveToGitHub(){
        var token = ghGetToken();
        var text = ghDataText();
        return fetch(GH_API_URL, { headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json' } })
          .then(function(res){
            if (res.status === 401) throw new Error('token');
            if (res.status === 404) throw new Error('notfound');
            if (!res.ok) throw new Error('getfailed');
            return res.json();
          })
          .then(function(file){
            return fetch(GH_API_URL, {
              method: 'PUT',
              headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: 'Update wishlist from site', content: ghBase64Utf8(text), sha: file.sha, branch: GH_BRANCH })
            });
          })
          .then(function(res){
            if (res.status === 401) throw new Error('token');
            if (res.status === 404) throw new Error('notfound');
            if (res.status === 409) throw new Error('conflict');
            if (!res.ok) throw new Error('putfailed');
            return res.json();
          })
          .then(function(){
            ghAutoSaveLastSaved = text;
          });
      }
      function ghSaveErrorStatus(err){
        var msg = err && err.message;
        if (msg === 'token') ghSetStatus('That token did not work. Check it is still valid and try again.');
        else if (msg === 'notfound') ghSetStatus('The repo or file was not found. Check the repo is called wishlist and data.json is in it.');
        else if (msg === 'conflict') ghSetStatus('The file changed somewhere else just now. Try saving again.');
        else ghSetStatus('Could not reach GitHub. Check your connection and try again.');
      }
      var ghSaveBtn = document.getElementById('ghSaveBtn');
      if (ghSaveBtn) ghSaveBtn.addEventListener('click', function(){
        var token = ghGetToken();
        if (!token){
          ghSetStatus('Add your GitHub token below first.');
          var card = document.getElementById('ghPublishCard');
          if (card) card.scrollIntoView({ behavior:'smooth', block:'start' });
          var input = document.getElementById('ghTokenInput');
          if (input) input.focus();
          return;
        }
        ghSetStatus('Saving...');
        ghSaveToGitHub()
          .then(function(){
            ghSetStatus('Saved. The public page updates in about a minute.');
            persist();
          })
          .catch(ghSaveErrorStatus);
      });
      /* ---------- auto-save: every edit publishes itself ----------
         persist() calls scheduleGhAutoSave after writing to localStorage, so
         every kind of edit is covered. It waits about 2.5 seconds after the
         last change, so typing and bursts of edits become one save. If a
         save is already running, one more is queued after it instead of
         starting a second one. With no token saved, nothing is attempted
         and nothing is shown. A failed save never clears her edits. */
      var ghAutoSaveTimer = null;
      var ghAutoSaveInFlight = false;
      var ghAutoSaveQueued = false;
      var ghAutoSaveLastSaved = null;
      function scheduleGhAutoSave(){
        if (!ghGetToken()) return;
        try { if (ghDataText() === ghAutoSaveLastSaved) return; } catch (err) { return; }
        if (ghAutoSaveTimer) clearTimeout(ghAutoSaveTimer);
        ghAutoSaveTimer = setTimeout(runGhAutoSave, 2500);
      }
      function runGhAutoSave(){
        ghAutoSaveTimer = null;
        if (!ghGetToken()) return;
        try { if (ghDataText() === ghAutoSaveLastSaved) return; } catch (err) { return; }
        if (ghAutoSaveInFlight){ ghAutoSaveQueued = true; return; }
        ghAutoSaveInFlight = true;
        ghSetStatus('Saving...');
        ghSaveToGitHub()
          .then(function(){ ghSetStatus('Saved. The public page updates in about a minute.'); })
          .catch(ghSaveErrorStatus)
          .then(function(){
            ghAutoSaveInFlight = false;
            if (ghAutoSaveQueued){ ghAutoSaveQueued = false; runGhAutoSave(); }
          });
      }
      ghTokenState();

      /* ---------- manage mode, view size, specs toggle ---------- */
      document.getElementById('manageBtn').addEventListener('click', function(){
        managing = !managing;
        this.setAttribute('aria-pressed', managing ? 'true' : 'false');
        document.body.classList.toggle('managing', managing);
        render();
        if (managing) document.getElementById('managebar').scrollIntoView({ behavior:'smooth', block:'nearest' });
      });
      document.getElementById('viewBtn').addEventListener('click', function(){
        var large = document.body.classList.toggle('view-large');
        this.setAttribute('aria-pressed', large ? 'true' : 'false');
        document.getElementById('viewBtnLabel').textContent = large ? 'Compact' : 'Large';
      });
      var specsEl = document.getElementById('specs');
      var specsToggle = document.getElementById('specsToggle');
      if (window.innerWidth > 760) { specsEl.classList.add('open'); specsToggle.setAttribute('aria-expanded', 'true'); }
      specsToggle.addEventListener('click', function(e){
        if (shahdMode && e.target && e.target.closest && e.target.closest('[data-edit]')) return;
        var open = specsEl.classList.toggle('open');
        specsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      render();
      renderReceived();
      renderSpecs();
      renderGiftCards();
      renderFoods();
      renderBrands();
      renderVibe();
      applyEditable();
  })
  .catch(function (err) {
    if (window.console && window.console.error) window.console.error('Wishlist failed to start:', err);
    var grid = document.getElementById('grid');
    if (grid) grid.innerHTML = '<p class="empty-note">This page could not load data.json. Serve the folder over http, for example with GitHub Pages, instead of opening the file directly.</p>';
  });
