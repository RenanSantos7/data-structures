import Tree from './models/tree';

const fileTree = new Tree('src/');
const modelsFolder = new Tree('models/');
const viewFolder = new Tree('view/');
const controlFolder = new Tree('control/');

[modelsFolder, viewFolder, controlFolder].forEach(folder =>
	fileTree.addChild(folder),
);

modelsFolder.addChildren([
	new Tree('tree.ts'),
	new Tree('chained-list.ts'),
	new Tree('ordered-list.ts'),
	new Tree('...'),
]);

fileTree.addChild('index.ts');

console.log(fileTree);
