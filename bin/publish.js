#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const { promisify } = require('util');

const version = process.argv[2];

if (!version) {
  throw new Error('Must specify a version');
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

function resolve(...args) {
  return path.resolve(__dirname, '..', ...args);
}

const pkgs = fs.readdirSync(resolve('packages'));

function getManifestPath(pkg) {
  return resolve('packages', pkg, 'package.json');
}

async function loadManifests() {
  const manifestsEntries = await Promise.all(
    pkgs.map(async pkg => {
      const manifest = JSON.parse(await readFile(getManifestPath(pkg)));
      if (manifest.name !== pkg) {
        throw new Error('Directory and package name should be the same');
      }
      return [pkg, manifest];
    }),
  );
  return new Map(manifestsEntries);
}

const depFields = ['dependencies', 'devDependencies', 'peerDependencies'];

function getDependencies(pkg, manifest) {
  const deps = new Set();
  for (const field of depFields) {
    const fieldContent = manifest[field];
    if (fieldContent) {
      for (const dep of Object.keys(fieldContent)) {
        if (pkgs.includes(dep)) {
          deps.add(dep);
        }
      }
    }
  }
  return deps;
}

function getLeaf(depGraph) {
  for (const [pkg, deps] of depGraph) {
    if (deps.size === 0) {
      return pkg;
    }
  }
  throw new Error('Cyclic dependencies');
}

function removeNode(depGraph, pkg) {
  depGraph.delete(pkg);
  for (const [, deps] of depGraph) {
    deps.delete(pkg);
  }
}

function buildDependencyGraph(manifests) {
  const depGraph = new Map();
  for (const pkg of pkgs) {
    const deps = getDependencies(pkg, manifests.get(pkg));
    depGraph.set(pkg, deps);
  }
  return depGraph;
}

function getPublishOrder(manifests) {
  const publishOrder = [];
  const depGraph = buildDependencyGraph(manifests);
  while (depGraph.size > 0) {
    const leaf = getLeaf(depGraph);
    removeNode(depGraph, leaf);
    publishOrder.push(leaf);
  }
  return publishOrder;
}

function changeVersionInManifest(manifest, version) {
  manifest.version = version;
  for (const field of depFields) {
    const fieldContent = manifest[field];
    if (fieldContent) {
      for (const pkg of pkgs) {
        if (fieldContent[pkg]) {
          fieldContent[pkg] = `=${version}`;
        }
      }
    }
  }
}

async function saveManifest(pkg, manifest) {
  return writeFile(getManifestPath(pkg), JSON.stringify(manifest, null, 2));
}

async function updateManifests(manifests, version) {
  return Promise.all(
    [...manifests.entries()].map(async ([pkg, manifest]) => {
      changeVersionInManifest(manifest, version);
      return saveManifest(pkg, manifest);
    }),
  );
}

function publishPkg(pkg) {
  cp.execSync('yarn publish', {
    cwd: resolve('packages', pkg),
    stdio: ['inherit', 'inherit', 'inherit'],
  });
}

async function publish(version) {
  const manifests = await loadManifests();
  const publishOrder = getPublishOrder(manifests);
  await updateManifests(manifests, version);
  publishOrder.forEach(publishPkg);
}

publish(version);
