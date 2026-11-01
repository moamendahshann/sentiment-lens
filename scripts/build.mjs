import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const model=JSON.parse(await fs.readFile(new URL('../web/model.json',import.meta.url),'utf8'));assert.equal(model.weights.length,model.vectorizer.vocab.length);assert.ok(model.weights.every(Number.isFinite));assert.ok(model.metadata.testAccuracy>model.metadata.baselineAccuracy);
await fs.mkdir(new URL('../dist/',import.meta.url),{recursive:true});await fs.cp(new URL('../web/',import.meta.url),new URL('../dist/',import.meta.url),{recursive:true});console.log('Validated trained model and built static application.');
