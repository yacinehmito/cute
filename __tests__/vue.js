const makeEngine = require('./_engine');

describe('Vue fixture', () => {
  const engine = makeEngine('vue');
  const report = engine.executeOnFixture();
  // console.log(JSON.stringify(report, null, 2));

  it('raises Vue-specific rules on Vue components defined in JS files', () => {
    const result = report.results.find(r =>
      r.filePath.match('/WrongComponent.js$'),
    );
    expect(result).toBeDefined();
    expect(result.messages[0].ruleId).toBe('vue/return-in-computed-property');
  });

  it('raises Vue-specific rules on the script part of Single File Components', () => {
    const result = report.results.find(r =>
      r.filePath.match('/WrongScript.vue$'),
    );
    expect(result).toBeDefined();
    expect(result.messages[0].ruleId).toBe('vue/return-in-computed-property');
  });

  it('raises Vue-specific rules on the template part of Single File Components', () => {
    const result = report.results.find(r =>
      r.filePath.match('/WrongTemplate.vue$'),
    );
    expect(result).toBeDefined();
    expect(result.messages[0].ruleId).toBe('vue/valid-v-show');
  });
});
