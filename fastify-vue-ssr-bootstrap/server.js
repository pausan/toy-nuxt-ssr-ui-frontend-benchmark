import fastify from 'fastify'
import fs from 'node:fs'
import path from 'node:path'

// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const __dirname = import.meta.dirname;

// -----------------------------------------------------------------------------
// Render a basic layout
// -----------------------------------------------------------------------------
const renderLayout = (title, contents) => {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>${title}</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
      />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  </head>
  <body>

  <div id="app">
  ${contents}
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous" />
  </body>
</html>`
}

// -----------------------------------------------------------------------------
// All views
// -----------------------------------------------------------------------------
const g_views = {
  'login': fs.readFileSync(path.join(__dirname, 'views/login.vue'), 'utf8'),
  'not-found': 'Not Found!',
}

// -----------------------------------------------------------------------------
// Render a view by name
// -----------------------------------------------------------------------------
const renderView = async (view, data) => {
  const templateString = g_views[view] || g_views['not-found'];

  // NOTE to self
  // Looks like there is no pre-compile step, however renderToString ends up
  // calling ssrCompile which has an internal cache for the template
  const app = createSSRApp({
    data: () => data,
    template: templateString
  })

  return await renderToString(app);
}

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
async function start(port) {
  const server = fastify();
  server.get("/login", async (request, reply) => {
    const schoolData = {
      user : '',
      password : '',
      passwordVisible : false,
      hasToken : false,
      schoolName : 'Demo School',
      errorCode : null,
      classroom : null,
      classrooms : [
        { displayName : 'My Classroom 1', id: 1},
        { displayName : 'My Classroom 2', id: 2},
        { displayName : 'My Classroom 3', id: 3},
      ]
    }

    // NOTE: going to ignore client hydration since we only want to measure the
    //       server performance, otherwise a lot of extra boilerplate should be
    //       added to the code
    reply.type("text/html").send(
      renderLayout('Login Title',
        await renderView('login', schoolData)
      )
    );
  });

  server.setNotFoundHandler(async (request, reply) => {
    reply.code(404).send("Not found!");
  });

  console.log (`Listening on port: ${port}`);
  await server.listen({ port });
  return {
    close: () => {
      return server.close();
    },
  };
}

start(3000);
/*
(async () => {
  for (let i = 0; i < 2; i++) {
    const app = createSSRApp({
      data: () => { counter : 0} ,
      template: `<div>
        <h1>{{ counter }}</h1>
        <button @click="counter++">Increment</button>
        </div>`
    })

    console.log(await renderToString(app))
  }
})()*/