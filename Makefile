# TODO: make the npm install step automatic

watch:
	node ./build.js watch

build:
	node build.js

serve:
	cd public && python3 -m http.server 8000 -b 127.0.0.1

count:
	wc -l src/*.ts{x,}

check:
	npx tsc -w
