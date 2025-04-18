以下是 JavaScript Web Worker 的详细讲解及使用示例，涵盖核心原理、多场景实现和进阶用法：

---

### 一、Web Worker 核心原理

1. **多线程模型**
   Web Worker 允许在浏览器后台创建独立线程运行 JavaScript，与主线程并行执行（网页 1、网页 2、网页 3）。主线程负责 UI 渲染和事件处理，Worker 线程处理计算密集型任务，通过消息传递机制（`postMessage`/`onmessage`）通信。

2. **线程隔离特性**
   • 无法直接访问 DOM（网页 2、网页 4）
   • 使用 `self` 代替 `window` 作为全局对象（网页 3）
   • 支持大部分 JavaScript API（如 `fetch`、`setTimeout`）（网页 7）

---

### 二、基础使用示例

#### 案例 1：斐波那契数列计算

**主线程代码**（main.js）：

```javascript
// 创建 Worker
const worker = new Worker("fib-worker.js");

// 发送计算请求
worker.postMessage(40); // 计算第40项

// 接收结果
worker.onmessage = (e) => {
  console.log(`计算结果: ${e.data}`);
};

// 错误处理
worker.onerror = (e) => {
  console.error(`Worker错误: ${e.message}`);
};
```

**Worker 线程代码**（fib-worker.js）：

```javascript
self.onmessage = (e) => {
  const n = e.data;
  let a = 0,
    b = 1,
    temp;

  for (let i = 0; i < n; i++) {
    temp = a;
    a = b;
    b = temp + b;
  }

  self.postMessage(a);
};
```

此例将耗时计算从主线程剥离，避免界面卡顿（网页 11 示例）。

---

#### 案例 2：动态创建 Worker（无需外部文件）

```javascript
// 主线程中通过 Blob 创建
const workerCode = `
  self.onmessage = e => {
    const data = e.data;
    const sorted = data.sort((a,b) => a - b);
    self.postMessage(sorted);
  };
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.postMessage([3, 1, 4, 2]);
worker.onmessage = (e) => console.log("排序结果:", e.data); // [1,2,3,4]
```

此方法适用于快速测试和小型任务（网页 8 示例）。

---

### 三、进阶用法

#### 1. Worker 线程池（网页 5、网页 8）

**场景**：处理批量图像滤镜

```javascript
class WorkerPool {
  constructor(script, size = 4) {
    this.workers = Array.from({ length: size }, () => new Worker(script));
    this.free = [...this.workers];
  }

  process(imageData) {
    return new Promise((resolve) => {
      const worker = this.free.pop();
      worker.postMessage(imageData);
      worker.onmessage = (e) => {
        this.free.push(worker);
        resolve(e.data);
      };
    });
  }
}

// 使用
const pool = new WorkerPool("image-filter-worker.js");
const processedImages = await Promise.all(
  images.map((img) => pool.process(img))
);
```

线程池复用 Worker 实例，减少创建开销（网页 5 的 WorkerPool 实现）。

---

#### 2. 大数据传输优化（网页 8）

使用 `Transferable Objects` 避免数据复制：

```javascript
// 主线程发送 1GB 数据
const buffer = new ArrayBuffer(1024 * 1024 * 1024);
worker.postMessage(buffer, [buffer]); // 转移所有权

// Worker 接收
self.onmessage = (e) => {
  const buffer = e.data; // 直接使用内存
};
```

此方法提升大数据传输效率（网页 8 的 Transferable Objects 说明）。

---

### 四、使用限制与最佳实践

1. **限制**：
   • 无法操作 DOM（网页 2、网页 4）
   • 脚本必须同源（网页 4）
   • 移动端需控制线程数量（网页 6）

2. **最佳实践**：
   • 及时终止无用 Worker：`worker.terminate()`（网页 2）
   • 优先传输结构化克隆数据（网页 4）
   • 使用 `try/catch` 捕获 Worker 内异常（网页 7）

---

### 五、实际应用场景

1. **图像处理**
   使用 Canvas 的 `ImageData` 处理滤镜（网页 6、网页 9）：

   ```javascript
   // Worker 中应用灰度滤镜
   self.onmessage = (e) => {
     const imageData = e.data;
     const data = imageData.data;

     for (let i = 0; i < data.length; i += 4) {
       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
       data[i] = data[i + 1] = data[i + 2] = avg;
     }

     self.postMessage(imageData);
   };
   ```

2. **实时数据分析**
   处理 WebSocket 数据流（网页 7）：

   ```javascript
   // Worker 处理股票数据
   let cache = [];

   self.onmessage = (e) => {
     cache = cache.concat(e.data).slice(-1000); // 保留最近1000条
     const trends = calculateTrends(cache);
     self.postMessage(trends);
   };
   ```

---

### 六、调试技巧

1. **Chrome DevTools**：
   • Sources → Threads 查看 Worker 线程
   • Console 选择 Worker 上下文（网页 3）

2. **性能监控**：
   使用 `performance.mark()` 标记任务时间（网页 7）。

---

通过上述案例可见，Web Worker 能有效提升前端应用的响应速度和计算能力。具体选择方案时需权衡任务特性与实现复杂度。
