/* eslint-disable import/no-extraneous-dependencies,no-console */
const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');
const _ = require('lodash');

const DIR_PAGES = path.resolve(__dirname, '../src/pages');
const DIR_ROUTES = path.resolve(__dirname, '../src/routes');

function transform(treeNode, siblingsArray = []) {
  if (treeNode.type === 'file') {
    // 如果是 index route 不单独生成路由对象
    if (treeNode.name === 'index.js') return null;
    // 404 单独配置
    if (treeNode.name === '404.js') return null;
    const fileName = treeNode.name.slice(0, -treeNode.extension.length);
    // 检查有没有同名目录，有的话这个文件不单独生成路由对象
    const dir = siblingsArray.find(item => item.type === 'directory' && item.name === fileName);
    if (dir) {
      return null;
    }
    return {
      path: fileName,
      component: `require('${path.relative(DIR_ROUTES, treeNode.path)}')`,
    };
  }
  const dirRoute = {
    path: treeNode.name,
  };
  const componentFile = siblingsArray.find(item => item.type === 'file' && `${treeNode.name}${item.extension}` === item.name);
  if (componentFile) {
    dirRoute.component = `require('${path.relative(DIR_ROUTES, componentFile.path)}')`;
  }
  if (treeNode.children.length) {
    const indexComponentFile = treeNode.children.find(item => item.type === 'file' && item.name === 'index.js');
    if (indexComponentFile) {
      dirRoute.indexRoute = {
        component: `require('${path.relative(DIR_ROUTES, indexComponentFile.path)}')`,
      };
    }
    const childRoutes = treeNode.children
      .map(item => transform(item, treeNode.children))
      .filter(_.identity);
    if (childRoutes.length) {
      dirRoute.childRoutes = childRoutes;
    }
  }
  return dirRoute;
}


const OUTPUT_PATH = `${DIR_ROUTES}/generated.js`;
const RAW_OUTPUT_PATH = `${DIR_ROUTES}/generated-raw.json`;

function generate() {
  console.log(`Generating routes from ${DIR_PAGES}`);
  const tree = dirTree(DIR_PAGES);
  const result = transform(tree);
  delete result.path;
  result.childRoutes = result.childRoutes || [];
  const path404 = `${DIR_PAGES}/404.js`;
  if (fs.existsSync(path404)) {
    result.childRoutes.push({
      path: '*',
      component: `require('${path.relative(DIR_ROUTES, path404)}')`,
    });
  } else {
    result.childRoutes.push({
      path: '*',
      component: `require('@rsuite/framework/src/pages').ErrorNotFound`,
    });
  }
  const raw = JSON.stringify(result, null, '  ');
  const formatted = raw
    .replace(/"([^(")]+)":/g, '$1:') // 去掉键的双引号
    .replace(/"(require\('.+'\)(\..+)*)"/g, '$1') // require 从字符串变成调用
    .replace(/: "(.+)"/g, ': \'$1\''); // 字符串双引号改成单引号
  fs.writeFileSync(RAW_OUTPUT_PATH, raw, 'utf8');
  fs.writeFileSync(OUTPUT_PATH, `/* eslint-disable global-require */\nmodule.exports = ${formatted};\n`, 'utf8');
  console.log(`Generated routes written into ${OUTPUT_PATH}`);
}

function recursivePrint(routeNode, parents = []) {
  if (!routeNode.childRoutes) {
    console.log(`${_.repeat('  ', parents.length - 1)}${parents.join('/')}/${routeNode.path || ''}`);
  } else {
    if (routeNode.indexRoute) {
      console.log(`${_.repeat('  ', parents.length - 1)}${parents.join('/')}/${routeNode.path || ''}`);
    }
    routeNode.childRoutes
      .forEach(child => recursivePrint(child, _.concat(parents, routeNode.path || '')));
  }
}

function list() {
  if (fs.existsSync(RAW_OUTPUT_PATH)) {
    const rawObj = JSON.parse(fs.readFileSync(RAW_OUTPUT_PATH));
    recursivePrint(rawObj);
  } else {
    const tree = dirTree(DIR_PAGES);
    const result = transform(tree);
    recursivePrint(result);
  }
}

const commands = {
  generate,
  list,
};

const command = process.argv[2] || 'list';
commands[command] && commands[command](...process.argv.slice(2));
