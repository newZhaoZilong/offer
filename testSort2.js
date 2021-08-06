let arr = [23, 22, 3, 4, 1, 8, 99, 66, 12];

function quickSort(arr,startIdx,endIdx) {
    if(startIdx >= endIdx)return;
    let pivotIdx = partition(arr,startIdx,endIdx);
    quickSort(arr,startIdx,pivotIdx -1);
    quickSort(arr,pivotIdx + 1,endIdx);
}

//根据基准值，将数组分成小于基准值的left和大于基准值的right
function partition(arr,startIdx,endIdx){
    let pivot = arr[startIdx];
    let left = startIdx;
    let right = endIdx;
    while (left !== right){
        //如果数组最右边大于基准值，右指针就左移动，因为不需要处理
        while(left < right && arr[right] > pivot){
            right --;
        }
        //如果数组最左边小于或等于基准值，右指针就左移动，因为不需要处理
        while(left < right && arr[left] <= pivot){
            left ++;
        }
        //走不下去了，说明arr[right] 小于基准值，arr[left]大于基准值
        //需要进行交换
        if(left < right){
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }
    }
    //调整完毕后，调整pivot的位置
    arr[startIdx] = arr[left];
    arr[left] = pivot;
    return left;
}

quickSort(arr,0,arr.length - 1);

console.log(arr);
