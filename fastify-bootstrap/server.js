// -----------------------------------------------------------------------------
// Copyright @ 2024 Pau Sanchez
//
// MIT License
// -----------------------------------------------------------------------------
const fastify = require("fastify");
const path = require("node:path");
const fs = require("node:fs");

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

  ${contents}

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous" />
  </body>
</html>`
}

// -----------------------------------------------------------------------------
// John Resig micro-templating
// See: https://johnresig.com/blog/javascript-micro-templating/
// -----------------------------------------------------------------------------
function compileTemplate(str){

  const code =  // biome-ignore lint/style/useTemplate: <explanation>
  "var p=[],print=function(){p.push.apply(p,arguments);};" +

  // Introduce the data as local variables using with(){}
  "with(obj){p.push('" +

  // Convert the template into pure JavaScript
  str
  .replace(/[\r\t\n]/g, " ")
  .split("<%").join("\t")
  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
  .replace(/\t=(.*?)%>/g, "',$1,'")
  .split("\t").join("');")
  .split("%>").join("p.push('")
  .split("\r").join("\\'")
  + "');}return p.join('');"

  return new Function("obj", code);
}

// -----------------------------------------------------------------------------
// All views
// -----------------------------------------------------------------------------
const g_views = {
  'login': compileTemplate(fs.readFileSync(path.join(__dirname, 'views/login.html'), 'utf8')),
  'not-found': compileTemplate('Not Found!'),
}

// -----------------------------------------------------------------------------
// Render a view by name
// -----------------------------------------------------------------------------
const renderView = (view, data) => {
  const fn = g_views[view] || g_views['not-found'];
  return fn(data)
}

// -----------------------------------------------------------------------------
// Start port
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

    reply.type("text/html").send(
      renderLayout('Login Title',
        renderView('login', schoolData)
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
