# How to Put Your Bunny on the Internet (with Deno Deploy)

We're going to give the bunny a real address on the web — like `bunny-friend.deno.dev` — that your mom can open on her phone and your friend can play with from their computer.

It's only 5 steps. Total time: about 10 minutes the first time, and about 10 seconds every time you change something after that.

---

## What you'll end up with
A URL (web address) like:
```
https://bunny-friend.deno.dev
```
Anyone, anywhere, can open it.

---

## Step 1 — Install Deno on your computer (one time only)

Open the **Terminal** app (Cmd+Space, type "Terminal", press Enter), then paste this and press Enter:

```sh
curl -fsSL https://deno.land/install.sh | sh
```

Follow what it says. At the end you may need to close and reopen Terminal so it remembers Deno.

To check it worked, run:
```sh
deno --version
```
You should see some version numbers.

> **What is Deno?** Think of Deno as a friendly little robot that can run JavaScript code (the same kind of code that's in `bunny.js`) anywhere — on your laptop, or on a giant computer in the cloud. We need it because we want our bunny to live on a cloud computer.

---

## Step 2 — Try the server on your own computer first

Go to the bunny folder and start the server:

```sh
cd ~/bunny-friend
deno run -A main.ts
```

Open http://localhost:8000 in your browser. The bunny should appear, just like before.

Press **Ctrl+C** in Terminal to stop the server.

> **What's a "server"?** A server is just a program that says: "Anyone who asks me for `index.html`, I'll hand it over. Anyone who asks for `styles.css`, I'll hand that over too." That's all `main.ts` does — it sits and waits for visitors and hands out files. It's only 2 lines of code!

---

## Step 3 — Make a free Deno Deploy account

1. Go to **https://dash.deno.com** in your browser.
2. Click "Sign up" and use your GitHub account (or make one — it's free).
3. That's it. You now have a place on the internet where your bunny can live.

> **What is Deno Deploy?** It's like a free apartment building for tiny programs. Your bunny moves into one of the apartments, and the building has its own address everyone can visit.

---

## Step 4 — Install the deploy tool

In Terminal, run:

```sh
deno install -gArf jsr:@deno/deployctl
```

This adds a new command called `deployctl` to your computer. It's the "moving truck" that drives your bunny up to its new apartment.

To check it worked:
```sh
deployctl --version
```

---

## Step 5 — Deploy! 🚀

From the bunny folder, run:

```sh
cd ~/bunny-friend
deployctl deploy --project=bunny-friend --prod main.ts
```

The very first time, it will open your browser and ask you to log in — say yes. After that, it just goes.

When it finishes, it will print something like:
```
View at:
 - https://bunny-friend.deno.dev
```

**That's your URL.** Send it to your mom. Send it to your friend. It works on phones, tablets, and laptops anywhere in the world.

> **What just happened?** The `deployctl` tool zipped up your `index.html`, `styles.css`, `bunny.js`, and `main.ts`, sent them across the internet to Deno's giant computer, and told it: "Run this from now on, please." From that second on, anyone who types `bunny-friend.deno.dev` into a browser is talking to your tiny program living in the cloud.

---

## Whenever you change something

Just run this one command again:
```sh
deployctl deploy --project=bunny-friend --prod main.ts
```

Took about 10 seconds. Your changes are now live for everyone.

---

## Troubleshooting

- **"command not found: deno"** — close and reopen Terminal. If still broken, the installer told you a line to add to your shell config; follow it.
- **"command not found: deployctl"** — same thing. Close/reopen Terminal.
- **"project name is already taken"** — Deno Deploy project names have to be unique across the whole world. Try something like `bunny-friend-alex` or `alexs-bunny-2026`. Whatever you pick becomes your URL.
- **The page is blank** — make sure you ran the command from inside `~/bunny-friend`, not from somewhere else. The tool sends whatever folder you're standing in.

---

## How it all fits together (the picture)

```
  Your laptop                                     The Internet
  ───────────                                     ─────────────

  ~/bunny-friend/                                 https://bunny-friend.deno.dev
    index.html      ── deployctl deploy ──▶       (a tiny copy of your folder,
    styles.css                                     running 24/7 on a cloud
    bunny.js                                       computer, ready to answer
    main.ts (server)                               anyone who visits)
```

The cloud computer never sleeps. So even when your laptop is off, the bunny is still up there waiting for visitors. 🐰
