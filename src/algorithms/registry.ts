import type { Step } from "./types";
import { bubbleSortSteps } from "./bubble";
import { selectionSortSteps } from "./selection";
import { insertionSortSteps } from "./insertion";
import { quickSortSteps } from "./quick";
import { mergeSortSteps } from "./merge";

export interface AlgorithmConfig {
  id: string;
  name: string;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  steps: string[];
  pseudoCode: string;
  generator: (arr: number[]) => Generator<Step>;
}

export const algorithms: AlgorithmConfig[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    description:
      "Bubble Sort là thuật toán sắp xếp đơn giản, hoạt động bằng cách lặp đi lặp lại qua danh sách, so sánh các phần tử liền kề và hoán đổi chúng nếu chúng ở sai thứ tự. Quá trình này được lặp lại cho đến khi danh sách được sắp xếp.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    steps: [
      "Bắt đầu từ phần tử đầu tiên của mảng",
      "So sánh phần tử hiện tại với phần tử kế tiếp",
      "Nếu phần tử hiện tại lớn hơn phần tử kế tiếp → Hoán đổi chúng",
      "Di chuyển đến cặp phần tử tiếp theo và lặp lại",
      "Sau mỗi lượt duyệt, phần tử lớn nhất 'nổi' lên cuối mảng",
      "Lặp lại cho đến khi không còn hoán đổi nào xảy ra",
    ],
    pseudoCode: `for i = n-1 downto 1:
    for j = 0 to i-1:
        if arr[j] > arr[j+1]:
            swap(arr[j], arr[j+1])`,
    generator: bubbleSortSteps,
  },
  {
    id: "selection",
    name: "Selection Sort",
    description:
      "Selection Sort chia mảng thành 2 phần: đã sắp xếp và chưa sắp xếp. Thuật toán liên tục tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đưa nó vào cuối phần đã sắp xếp.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    steps: [
      "Bắt đầu với phần tử đầu tiên là vị trí cần điền",
      "Tìm phần tử nhỏ nhất trong phần chưa sắp xếp",
      "Hoán đổi phần tử nhỏ nhất với vị trí cần điền",
      "Di chuyển vị trí cần điền sang phải một bước",
      "Lặp lại cho đến khi mảng được sắp xếp",
    ],
    pseudoCode: `for i = 0 to n-2:
    minIdx = i
    for j = i+1 to n-1:
        if arr[j] < arr[minIdx]:
            minIdx = j
    swap(arr[i], arr[minIdx])`,
    generator: selectionSortSteps,
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    description:
      "Insertion Sort xây dựng mảng đã sắp xếp từng phần tử một. Nó lấy từng phần tử và chèn vào vị trí đúng trong phần đã sắp xếp, tương tự như cách sắp xếp bài trên tay.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    steps: [
      "Coi phần tử đầu tiên đã được sắp xếp",
      "Lấy phần tử tiếp theo làm 'key'",
      "So sánh 'key' với các phần tử trong phần đã sắp xếp",
      "Dịch chuyển các phần tử lớn hơn 'key' sang phải",
      "Chèn 'key' vào vị trí đúng",
      "Lặp lại cho đến khi hết mảng",
    ],
    pseudoCode: `for i = 1 to n-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j = j - 1
    arr[j+1] = key`,
    generator: insertionSortSteps,
  },
  {
    id: "quick",
    name: "Quick Sort",
    description:
      "Quick Sort sử dụng chiến lược chia để trị. Nó chọn một phần tử làm 'pivot' và phân hoạch mảng thành 2 phần: nhỏ hơn pivot và lớn hơn pivot, sau đó đệ quy sắp xếp từng phần.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    steps: [
      "Chọn một phần tử làm pivot (thường là phần tử cuối)",
      "Phân hoạch: đưa các phần tử nhỏ hơn pivot về bên trái",
      "Đưa các phần tử lớn hơn pivot về bên phải",
      "Đặt pivot vào vị trí đúng của nó",
      "Đệ quy áp dụng cho 2 phần con",
      "Dừng khi mỗi phần chỉ còn 1 phần tử",
    ],
    pseudoCode: `quickSort(arr, low, high):
    if low < high:
        pivot = partition(arr, low, high)
        quickSort(arr, low, pivot-1)
        quickSort(arr, pivot+1, high)

partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high-1:
        if arr[j] <= pivot:
            i++; swap(arr[i], arr[j])
    swap(arr[i+1], arr[high])
    return i + 1`,
    generator: quickSortSteps,
  },
  {
    id: "merge",
    name: "Merge Sort",
    description:
      "Merge Sort cũng sử dụng chia để trị. Nó chia mảng thành 2 nửa, đệ quy sắp xếp từng nửa, sau đó merge (gộp) 2 nửa đã sắp xếp lại với nhau.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    steps: [
      "Chia mảng thành 2 nửa bằng nhau",
      "Đệ quy sắp xếp nửa bên trái",
      "Đệ quy sắp xếp nửa bên phải",
      "Merge 2 nửa đã sắp xếp lại với nhau",
      "Khi merge: so sánh và chọn phần tử nhỏ hơn",
      "Dừng khi mỗi phần chỉ còn 1 phần tử",
    ],
    pseudoCode: `mergeSort(arr, left, right):
    if left < right:
        mid = (left + right) / 2
        mergeSort(arr, left, mid)
        mergeSort(arr, mid+1, right)
        merge(arr, left, mid, right)

merge(arr, left, mid, right):
    // Gộp 2 mảng con đã sắp xếp
    // arr[left..mid] và arr[mid+1..right]`,
    generator: mergeSortSteps,
  },
];

export function getAlgorithmById(id: string): AlgorithmConfig | undefined {
  return algorithms.find((algo) => algo.id === id);
}
