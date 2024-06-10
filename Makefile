serve:
	[ -d "./node_modules" ] || npm install
	node build.mjs
	npx ts-node server/server.ts

watch:
	node ./build.mjs watch

build:
	node build.mjs

count:
	wc -l src/*.ts{x,}

check:
	npx tsc -w
