const path = require('path');
const {CLIEngine} = require('eslint');

function createCLIEngineForFixture(fixtureName, config) {
  const fixturePath = path.resolve(__dirname, '../fixtures', fixtureName);
  const engine = new CLIEngine(
    Object.assign(
      {
        useEslintrc: true,
        cwd: fixturePath,
        extensions: ['.js', '.jsx', '.vue'],
      },
      config,
    ),
  );
  engine.executeOnFixture = function() {
    return this.executeOnFiles([fixturePath]);
  };
  return engine;
}

module.exports = createCLIEngineForFixture;
