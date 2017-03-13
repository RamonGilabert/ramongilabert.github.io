# Portfolio 2017

This is the second release for my portfolio, after a lot of thinking, I came out with something new, bigger and hopefully better. Something where I can show my work, where I can explain my process, where I can be creative within a self created template.

To run the portfolio locally, just follow the following steps.

1. Go to the `source` folder.
2. Run `npm install`.
3. Run `gulp watch`.

The command `gulp watch` will build the Mustache and Stylus files and put them in the `public` folder. Statically, you can go and open the `index.html` file.

If you want to see it live, just tap [here](http://gilabert.design).

## Add projects

To add a project:

1. Add it to the `gilabert.json` file under `projects`.
2. Fix the grid with the new project, that is, fix spacing and height.
  - In `myself.styl` add the order that you want it to appear.
  - In the `inner` class add the new height.
  - Fix the margins for the other pieces.
3. Build the detail page.
