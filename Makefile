install:
	npm ci

test:
	npm test

lint:
	npx eslint .	

fix:
	npx eslint . --fix

publish:
	npm publish --dry-run

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack