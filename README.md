# Shahd's Wishlist

A static copy of my birthday wishlist, ready to host on GitHub Pages.

## What is in here

- `index.html` - the page structure
- `styles.css` - all styling (pastel whimsy: Fraunces headings, DM Sans body, soft pastel washes, light mode only)
- `app.js` - all behaviour (tabs, filters, sorting, card panel, Manage mode, Shahd view editing)
- `data.json` - all wishlist content (items, gift cards, sizes, little foods, vibe board)
- `assets/` - all item and vibe board photos (87 images, saved locally so the page works on its own)

Edits made on the page (Shahd view, card panel, Manage mode) save in that browser, using localStorage. With a token saved, they also publish to GitHub on their own a few seconds after each edit (see Publish below). The storage key is separate from the hosted version, so edits here do not carry over to the other copy and the other way round.

## Put it on GitHub

### Option A: upload in the browser

1. On GitHub, create a new repository (for example `wishlist`). You can make it public or private.
2. On the repository page, click **Add file** then **Upload files**.
3. Drag in everything from this folder: `index.html`, `styles.css`, `app.js`, `data.json`, `README.md`, and the whole `assets` folder.
4. Commit the upload.

### Option B: upload with git

```bash
git init
git add .
git commit -m "Add wishlist"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wishlist.git
git push -u origin main
```

## Turn on GitHub Pages

1. In the repository, go to **Settings**, then **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **main** and the folder to **/(root)**, then save.
4. After a minute or two, the site is live at `https://YOUR-USERNAME.github.io/wishlist/`.

## Publish edits from the site

In Shahd view there is a Publish to GitHub card. It sends the wishlist as it is on the page, with every edit, to `data.json` in the repo, so the public page updates without touching the files by hand.

### Set up a token once

1. On GitHub, click your profile picture, then **Settings**.
2. Go to **Developer settings**, then **Personal access tokens**, then **Fine-grained tokens**.
3. Click **Generate new token**.
4. Give it a name, for example `wishlist site`.
5. Under **Repository access**, choose **Only select repositories** and pick the `wishlist` repo.
6. Under **Repository permissions**, set **Contents** to **Read and write**.
7. Click **Generate token** and copy the token. GitHub only shows it once.
8. On the wishlist site, open **Shahd view**, paste the token into the Publish to GitHub card, and click **Save token**. The token stays in that browser only. It is never written into a file and is only sent to api.github.com.

Only save the token on your own devices. Anyone with the token can change the wishlist, so do not paste it on a shared or public computer.

### Publish

With a token saved, every edit publishes itself: a few seconds after you change something, the site sends the wishlist as it is now, with every edit, to `data.json` in the repo. The public page updates about a minute after a save. That includes item edits and heading, description, footer, and brand edits made in Shahd view, which live under `pageText` in `data.json`. The **Save changes to GitHub** button in the same card still works as a manual save if you ever want to save right away instead of waiting a few seconds. If a save fails, the card says so in plain words and your edits stay put, so you can try again.

If you would rather not use a token, click **Download data.json** instead. It downloads the wishlist as it is now. Upload that file to the repo (it replaces the old `data.json`) and the public page updates too.

## A note on privacy

The repository is public, because GitHub Pages on the free plan only publishes from a public repo. Anyone can see the wishlist files, including sizes and the little foods list, and the published site is public to anyone with its link, so share that link only with people you want to see the wishlist.

## Editing the content

- To change an item, price, or note, edit `data.json` and re-upload it. Keep the same shape for each item: `id`, `category`, `name`, `store`, `price`, `want` (0 to 5), `variant`, `img`, `imgNote`, `url`, `gtk`, `note`, `addedSeq`.
- An item does not need a photo. Leave `img` empty and set `imgNote` to the note shown in the photo area instead, for example "Any cute mug, pink if they have it". If both are empty, the card shows "No photo yet". A photo link that fails to load falls back to the same note area.
- When you add or edit an item on the site, the Photo section gives three choices: upload a photo from your device (it is shrunk to at most 1200px wide before it is saved), use a photo from a page link, or show a note instead of a photo. For the page link, paste any page link (it starts filled in with the buy link) and the site pulls the photo that page uses, through the Microlink preview service, which needs no key. If no photo is found, or the preview fails, the item still saves and you can upload a photo or use a note instead. You can switch between the three while editing; what you typed or picked in each one stays put until you save.
- To change a photo, add the new image file to `assets/` and point the item's `img` field at it, for example `assets/my-photo.jpg`.
- Vibe board tiles live under `vibeImages` in `data.json`. Add tiles on the Vibe board tab or in Shahd view, with a photo link, a photo picked from your device, or just a caption with no photo. A picked photo is shrunk to at most 1200px wide before it is saved.
- To change colours or fonts, edit `styles.css`.
