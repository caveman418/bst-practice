const Node = (data) => {
    return {data: data, left: null, right: null};
}

const Tree = (arr = []) => {
    const initArr = (arr) => {
        let uniq = [...new Set(arr)];
        return uniq.sort((a,b) => a-b);
    }

    const buildTree = (arr = initArr()) => {
        let rootIndex = Math.floor((arr.length-1) / 2);
        let finalIndex = arr.length - 1;
        let tempRoot = Node(arr[rootIndex]);

        if (arr.length <= 1) {
            return tempRoot;
        } else if (arr.length === 2) {
            tempRoot.right = Node(arr[1]);
            return tempRoot;
        } else {
            tempRoot.right = buildTree(arr.slice(rootIndex + 1, arr.length));
            tempRoot.left = buildTree(arr.slice(0, rootIndex));
        }
        
        return tempRoot;
    }

    arr = initArr(arr);
    let root = buildTree(arr); //initialize BST

    const insert = (data, tempRoot = root) => {
        if (data >= tempRoot.data) {
            if (!tempRoot.right) {
                tempRoot.right = Node(data);
                return;
            }
            insert(data, tempRoot.right);
        } else {
            if (!tempRoot.left) {
                tempRoot.left = Node(data);
                return;
            }
            insert(data, tempRoot.left);
        }
    }

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }

    return {root, insert, prettyPrint};
}