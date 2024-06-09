serve:
	[ -d "./node_modules" ] || npm install
	node build.js
	cd public && python3 -m http.server 8000 -b 127.0.0.1

watch:
	node ./build.js watch

build:
	node build.js

count:
	wc -l src/*.ts{x,}

check:
	npx tsc -w
