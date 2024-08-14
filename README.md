# Toy project to benchmark several nuxt/vue SSR frontend frameworks

## How-to
Go inside each of the projects, run `bun install` then `bun run build`
and then run the proper file.

In some folders only install is needed and the server can be executed
with bun or node.

On another tab, you can run perf.sh to get some performance data. You'll need
wrk installed. You can also run the tests with ab if you want.

In the end, the goal is not to get accurate results, but a higher level
perspective on how each framework behaves and what the performance looks like.

## Creation of every project

$ bunx nuxi@latest init nuxt-xxxxx
$ bunx nuxi@latest module add xxxxx

In general follow whatever guideline for each project.