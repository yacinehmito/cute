const makeEngine = require('./_engine');

describe('Jest fixture', () => {
  const engine = makeEngine('jest');
  const report = engine.executeOnFixture();
  // console.log(JSON.stringify(report, null, 2));

  it('applies config on JS test files', () => {
    const results = report.results.filter(r =>
      r.filePath.match('/(valid-jest.*|test|spec).js$'),
    );
    expect(results.length).toBeGreaterThan(0);
    results.forEach(result => {
      expect(result.errorCount).toEqual(0);
    });
  });

  it('applies config on JSX test files', () => {
    const results = report.results.filter(r =>
      r.filePath.match('/(valid-jest.*|test|spec).jsx$'),
    );
    expect(results.length).toBeGreaterThan(0);
    results.forEach(result => {
      expect(result.errorCount).toEqual(0);
    });
  });

  it('does not apply config on non-test files', () => {
    const result = report.results.find(r =>
      r.filePath.match('/invalid-jest.js'),
    );
    expect(result).toBeDefined();
    expect(result.errorCount).toEqual(1);
    expect(result.messages[0].ruleId).toEqual('no-undef');
    expect(result.messages[0].source).toEqual('void jest;');
  });
});
