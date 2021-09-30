#!/usr/bin/env node

const path = require('path');
const argv = require('kelp-argv');
const flow = require('@kelpjs/gen/flow');
const read = require('@kelpjs/gen/plugins/read');
const source = require('@kelpjs/gen/plugins/source');
const output = require('@kelpjs/gen/plugins/output');
const render = require('@kelpjs/gen/plugins/render');
const matter = require('@kelpjs/gen/plugins/matter');
const prompts = require('@kelpjs/gen/plugins/prompts');
const layouts = require('@kelpjs/gen/plugins/layouts');
const metadata = require('@kelpjs/gen/plugins/metadata');
const markdown = require('@kelpjs/gen/plugins/markdown');
const permalink = require('@kelpjs/gen/plugins/permalink');
const collection = require('@kelpjs/gen/plugins/collection');

const ask = options => {
  const qkeys = Object.keys(options);
  return files => {
    for (const name in files) {
      const file = files[name];
      const { questions = [] } = file;
      file.questions = questions.filter(q => !qkeys.includes(q.name));
    }
    return files;
  };
};

const write = (dir) => {
  const run = output(dir);
  return files => {
    run(files);
    for (const name in files) {
      console.log('[O]', path.join(dir, name));
    }
  };
};

; (({ _, ...options }) => {

  const [name] = _;
  if (!name) return console.log('[E][create-z] Please input template name.');

  const projectRoot = process.cwd();
  const templatesDir = path.join(projectRoot, "templates", name);

  flow()
    .use(source(templatesDir))
    .use(read())
    .use(metadata(options))
    .use(matter())
    .use(ask(options))
    .use(prompts())
    .use(render())
    .use(write(projectRoot))
    .run();

})(argv());