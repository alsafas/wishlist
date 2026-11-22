# Shahd's Wishlist

A static copy of my birthday wishlist, ready to host on GitHub Pages.

## What is in here

- `index.html` - the page structure
- `styles.css` - all styling (pastel whimsy: Fraunces headings, DM Sans body, soft pastel washes, dark mode on deep plum)
- `app.js` - all behaviour (tabs, filters, sorting, card panel, Manage mode, Shahd view editing)
- `data.json` - all wishlist content (items, gift cards, sizes, little foods, vibe board)
- `assets/` - all item and vibe board photos (87 images, saved locally so the page works on its own)

Edits made on the page (Shahd view, card panel, Manage mode) save in that browser only, using localStorage. Nothing is sent to a server. The storage key is separate from the hosted version, so edits here do not carry over to the other copy and the other way round. To publish edits so everyone sees them, use Publish to GitHub in Shahd view (see below).

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

Click **Save changes to GitHub** in the same card. The site sends the wishlist as it is now, with every edit, to `data.json` in the repo. The public page updates about a minute after a save. That includes item edits and heading, description, footer, and brand edits made in Shahd view, which live under `pageText` in `data.json`.

If you would rather not use a token, click **Download data.json** instead. It downloads the wishlist as it is now. Upload that file to the repo (it replaces the old `data.json`) and the public page updates too.

## A note on privacy

If the repository is public, anyone with the link can see the wishlist, including sizes and the little foods list. Keep the repository private if you would rather it stay just for people you share the link with. The repo can stay private and the Pages site still works: only you (and anyone you invite) can see the files, but the published site is public to anyone with its link, so share that link only with people you want to see the wishlist.

## Editing the content

- To change an item, price, or note, edit `data.json` and re-upload it. Keep the same shape for each item: `id`, `category`, `name`, `store`, `price`, `want` (0 to 5), `variant`, `img`, `url`, `gtk`, `note`, `addedSeq`.
- Page headings, descriptions, and the brands list live under `pageText` in `data.json`; edit the values there to change them.
- To change a photo, add the new image file to `assets/` and point the item's `img` field at it, for example `assets/my-photo.jpg`.
- To change colours or fonts, edit `styles.css`.
