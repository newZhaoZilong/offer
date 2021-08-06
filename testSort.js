let arr = [23, 22, 3, 4, 1, 8, 99, 66, 12];


let quickSort = function (arr, startIdx, endIdx) {
    if (startIdx >= endIdx) {
        return;
    }
    let pivotIdx = partition(arr, startIdx, endIdx);
    //根据基准元素，分成两部分进行递归排序
    quickSort(arr, startIdx, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, endIdx);
}


function partition(arr, startIdx, endIdx) {
    let pivot = arr[startIdx];
    let left = startIdx;
    let right = endIdx;
    while (left != right) {
        //控制right指针比较并左移
        while (left < right && arr[right] > pivot) {
            right--;
        }
        while (left < right && arr[left] <= pivot) {
            left++;
        }
        //到这里说明arr[left]大于pivot,arr[right]小于pivot
        //需要进行change
        if (left < right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }
    //pivot和指针重合点交换
    arr[startIdx] = arr[left];
    arr[left] = pivot;
    return left;
}

quickSort(arr,0,arr.length - 1);
console.log(arr);

