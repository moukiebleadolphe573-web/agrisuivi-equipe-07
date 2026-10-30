import { test } from 'node:test';
import assert from 'node:assert/strict';
import { etatIrrigation } from '../src/irrigation.js';

const cacao = { code: 'cacao', nom: 'Cacao', prixKg: 2000, humiditeMin: 40, humiditeMax: 70 };

test('etatIrrigation : la limite basse (40) est OK', () => {
  assert.equal(etatIrrigation(40, cacao), 'OK');
});

test('etatIrrigation : la limite haute (70) est OK', () => {
  assert.equal(etatIrrigation(70, cacao), 'OK');
});

test('etatIrrigation : 39 est juste sous la limite basse', () => {
  assert.equal(etatIrrigation(39, cacao), 'ARROSER');
});

test('etatIrrigation : 71 est juste au-dessus de la limite haute', () => {
  assert.equal(etatIrrigation(71, cacao), 'DRAINER');
});