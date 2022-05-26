class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return head;
    /**
     解法，利用栈的先进后出结构实现，
     先进行压栈，再弹出，实现逆序
     */
    let stack = [];
    while (head) {
        stack.push(head);
        head = head.next;
    }

    //逆序弹出，并做成链表
    let start = stack.pop();
    let p = start;
    while (p) {
        let top = stack.pop() || null;
        p.next = top;
        p = p.next;
    }
    return start;
};

let list = [1,2,3,4,5];
function createTree(list:number[]) {
    let node = new ListNode(list[0]);
    let root = node;
    for(let i = 1;i<list.length;i++){
        node.next = new ListNode(list[i]);
        node = node.next;
    }
    return root;
}

let root = createTree(list);
printRoot(reverseList(root));
function printRoot(root:ListNode) {
    while(root){
        console.log(root.val);
        root = root.next;
    }
}
