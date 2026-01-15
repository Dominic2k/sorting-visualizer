# 🎓 Sorting Visualizer

> Learn sorting algorithms through interactive visualization

[Tiếng Việt](#tiếng-việt) | [English](#english)

---

## English

An interactive web application for learning sorting algorithms through real-time visualization. Watch how different algorithms work step-by-step while reading detailed explanations.

### ✨ Features

- **5 Sorting Algorithms**: Bubble, Selection, Insertion, Quick, Merge Sort
- **Split-Screen Layout**: Visualization on the left, explanations on the right
- **Step-by-Step Execution**: Run automatically or step through manually
- **Adjustable Speed & Size**: Control animation speed and array size
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **Extensible Architecture**: Easy to add new algorithms

### 🎨 Color Legend

| Color | Meaning |
|-------|---------|
| 🟡 Yellow | Comparing |
| 🔴 Red | Swapping |
| 🟢 Green | Sorted |

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- CSS (no frameworks)

### 📁 Project Structure

```
src/
├── algorithms/          # Sorting algorithm generators
│   ├── registry.ts      # Central algorithm configuration
│   ├── bubble.ts
│   ├── selection.ts
│   ├── insertion.ts
│   ├── quick.ts
│   └── merge.ts
├── components/          # React components
│   ├── Bars.tsx         # Visualization bars
│   ├── Controls.tsx     # Play/pause controls
│   ├── AlgorithmSelector.tsx
│   └── AlgorithmExplanation.tsx
└── App.tsx
```

### ➕ Adding New Algorithms

1. Create a generator function in `src/algorithms/`
2. Add configuration to `src/algorithms/registry.ts`

---

## Tiếng Việt

Ứng dụng web tương tác để học thuật toán sắp xếp thông qua trực quan hóa thời gian thực. Xem cách các thuật toán hoạt động từng bước cùng với giải thích chi tiết.

### ✨ Tính năng

- **5 Thuật toán sắp xếp**: Bubble, Selection, Insertion, Quick, Merge Sort
- **Giao diện chia đôi**: Trực quan bên trái, giải thích bên phải
- **Chạy từng bước**: Tự động hoặc bấm Step để chạy thủ công
- **Tùy chỉnh tốc độ & kích thước**: Điều chỉnh tốc độ animation và số phần tử
- **Responsive**: Hoạt động trên desktop, tablet và điện thoại
- **Dễ mở rộng**: Thêm thuật toán mới dễ dàng

### 🎨 Chú thích màu sắc

| Màu | Ý nghĩa |
|-----|---------|
| 🟡 Vàng | Đang so sánh |
| 🔴 Đỏ | Đang hoán đổi |
| 🟢 Xanh | Đã sắp xếp |

### 🚀 Bắt đầu

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

### 🛠️ Công nghệ

- React 18 + TypeScript
- Vite
- CSS thuần (không dùng framework)

### ➕ Thêm thuật toán mới

1. Tạo hàm generator trong `src/algorithms/`
2. Thêm cấu hình vào `src/algorithms/registry.ts`

---

## 📄 License

MIT License
