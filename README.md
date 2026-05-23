# Bunny Friend

A tiny web page with a clickable bunny. Click its ears, nose, paws, or belly and it does something fun.

## What each part does
- **Ears**     - the bunny tells you a joke
- **Nose**     - a little squeak sound plays
- **Paws**     - the bunny hops left or right
- **Belly**    - the bunny asks you a fun question

## How to run it on this computer

You have three easy options. Pick whichever feels easiest.

### Option 1: Just double-click the file
1. Open Finder.
2. Go to your home folder (`/Users/alexander`).
3. Open the `bunny-friend` folder.
4. Double-click `index.html`. It will open in your web browser.

That's it. The bunny should appear.

> Note: the squeak sound uses the browser's audio system. Some browsers stay quiet until you click once on the page - just click the bunny once and sound will work for the rest of the session.

### Option 2: Run a tiny local web server (using Python)
This is closer to how "real" websites are served. Your Mac already has Python.

1. Open the Terminal app (press Cmd+Space, type "Terminal", press Enter).
2. Type these two lines, pressing Enter after each:
   ```
   cd ~/bunny-friend
   python3 -m http.server 8000
   ```
3. Open your web browser and visit: http://localhost:8000
4. When you're done, go back to Terminal and press `Ctrl+C` to stop the server.

### Option 3: Use VS Code Live Server
If you have VS Code with the "Live Server" extension installed, right-click `index.html` and choose **Open with Live Server**.

## How it all works (a story for an 8-year-old)

Imagine your web browser is a magical picture book. To make a page, we hand the browser three notes:

1. **`index.html` - the "what" note.**
   This tells the browser *what* is on the page. We draw the bunny out of simple shapes - circles for the head and eyes, ovals for the ears and paws, a little diamond for the nose. We give each clickable shape a name tag like `data-part="ear"` so we can find it later. Think of it like sticking name labels on the bunny's body parts.

2. **`styles.css` - the "how it looks" note.**
   This tells the browser *how* everything should look. The sky-blue and grassy-green background, the bouncy pink colors, the cute drop-shadow under the bunny - that all lives here. CSS is like the bunny's outfit and the wallpaper of its room. It also has two little dances called `hop` and `hop-right`. When we turn one on, the whole bunny jumps to the left or to the right and lands back down.

3. **`bunny.js` - the "what happens" note.**
   This is the brain. It watches and waits. When you click on something with a name tag like `ear`, the brain looks at the label and decides what to do:
   - If you clicked the **ear**, it picks a random joke out of a list and pops it up in a speech bubble.
   - If you clicked the **nose**, it makes a squeak. There's no sound file - the computer is actually *making* a tone right there, like blowing a tiny invisible whistle. It starts at one pitch, slides up, then slides back down, and that wiggle is what makes it sound like a "squeak."
   - If you clicked a **paw**, it turns on one of the hop dances. Every other click it switches left or right, so the bunny doesn't keep hopping in one direction forever.
   - If you clicked the **belly**, it picks a random fun question and shows it in the speech bubble.

   The speech bubble has a timer too: after about 3 and a half seconds it hides itself, so the bunny can be surprised by the next click.

### How the click knows which part you clicked
Each clickable part is wrapped in a little group `<g class="part" data-part="ear">`. The JavaScript runs through every group with class `part` and says "if anyone clicks you, tell me your `data-part` name." When you click, it looks at the name (`ear`, `nose`, `paw`, or `belly`) and runs the matching action. It's like the bunny has four secret buttons, and each button knows its own job.

### How the bunny is drawn
The bunny is an **SVG**, which stands for Scalable Vector Graphics. Instead of being a photo made of dots, it's a recipe of shapes: "draw a white circle here for the head, draw two long pink-inside ovals for the ears, draw a diamond here for the nose." Because it's a recipe, the bunny stays sharp and clean no matter how big or small you make the window. If you ever want to change the bunny's color, open `index.html` and change `fill="#ffffff"` to any color you like.

## Want to play with it?

Some fun things you could try:
- Add your own jokes to the `jokes` list in `bunny.js`.
- Change the bunny's color (look for `fill="#ffffff"` in `index.html`).
- Make the squeak higher or lower by changing the numbers `900`, `1600`, and `700` inside the `squeak` function.
- Add a new clickable part - maybe a tail! Just wrap the tail in a `<g class="part" data-part="tail">` and add a new branch in `bunny.js` that does something when `type === "tail"`.
