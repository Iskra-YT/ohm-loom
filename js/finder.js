export class UnionFind {
    constructor() {
        this.parent = new Map();
    }

    makeSet(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
        }
    }

    find(x) {
        const p = this.parent.get(x);

        if (p !== x) {
            const root = this.find(p);
            this.parent.set(x, root);
            return root;
        }

        return x;
    }

    union(a, b) {
        const rootA = this.find(a);
        const rootB = this.find(b);

        if (rootA !== rootB) {
            this.parent.set(rootB, rootA);
        }
    }
}