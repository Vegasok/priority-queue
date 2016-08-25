"use strict";
class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority || null;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		node.parent = this;
		if (this.left === null){
			this.left = node;
		}
		else if (this.right === null){
			this.right = node;
		}
	}

	removeChild(node) {
		node.parent = null;
		if (this.left == node){
			this.left = null;
		}
		else if (this.right == node){
			this.right = null;
		}
		else{
			throw new Error("Passed node is not a child of this node!");
		}
	}

	remove() {
		if (this.parent){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		var swapParent = this.parent,
			swapChild = this,
			sibling = null,
			sibling_dir,
			rightIndex = "right",
			leftIndex = "left";

		if (swapParent){
			if (swapParent.left == swapChild){
				sibling = swapParent.right;
				sibling_dir = rightIndex;
			}
			else if (swapParent.right == swapChild){
				sibling = swapParent.left;
				sibling_dir = leftIndex;
			}
		}
		else{
			return;
		}

		if (swapParent.parent){
			if (swapParent == swapParent.parent.right){
				swapParent.parent.right = swapChild;
			}
			else if (swapParent == swapParent.parent.left){
				swapParent.parent.left = swapChild;
			}
		}

		if (this.left){
			this.left.parent = this.parent;
		}

		if (this.right){
			this.right.parent = this.parent;
		}
		
		if (swapParent){
			this.parent.left = this.left;
			this.parent.right = this.right;
			this.parent = swapParent.parent;
			swapParent.parent = swapChild;
		}

		if (sibling){
			sibling.parent = swapChild;
		}

		if (sibling_dir == rightIndex){
			swapChild.right = sibling;
			swapChild.left = swapParent;
		}
		else if (sibling_dir == leftIndex){
			swapChild.left = sibling;
			swapChild.right = swapParent;
		}


	}
}

module.exports = Node;
