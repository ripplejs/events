
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test: build
	mocha-phantomjs test/index.html

standalone:
	component build --standalone ripple-events --name standalone
	-rm -r dist
	mkdir dist
	cp build/standalone.js dist/ripple-events.js && rm build/standalone.js
	minify dist/ripple-events.js dist/ripple-events.min.js

.PHONY: clean test standalone
