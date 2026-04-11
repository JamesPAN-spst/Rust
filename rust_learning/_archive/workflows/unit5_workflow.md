# Unit 5 workflow

## 基本信息
- 负责范围：高级特性（智能指针、泛型与 Trait 对象、宏系统、Unsafe Rust）

## 第一步：学习阶段记录
- [x] 阅读 generation_rule.md
- [x] 阅读 sub_agent_rule.md
- [x] 阅读 chapter_template.html
- [x] 阅读 ch1.1_ownership.html
- [x] 参考 ch4.1_threads.html 完整结构

## 第二步：章节规划
- Ch 5.1 智能指针：Box 堆分配、Rc 共享所有权、Arc 线程安全共享、RefCell 内部可变性、Cell 与 Cow
- Ch 5.2 泛型与 Trait 对象：泛型函数/结构体、Trait Bound/where/impl Trait、单态化、dyn Trait、对象安全
- Ch 5.3 宏系统：macro_rules! 声明式宏、重复模式与卫生性、何时不用宏、过程宏概览、宏调试
- Ch 5.4 Unsafe Rust：五种 unsafe 能力、裸指针、unsafe fn/trait、安全抽象、FFI 基础

## 进度清单
- [x] 规划完成
- [x] 页面生成完成
  - [x] ch5.1_smart_pointers.html（5 知识点 + 3 collapsible + 5 quiz + 4 exercises）
  - [x] ch5.2_generics_trait_objects.html（5 知识点 + 2 collapsible + 5 quiz + 4 exercises）
  - [x] ch5.3_macros.html（5 知识点 + 2 collapsible + 5 quiz + 4 exercises）
  - [x] ch5.4_unsafe_rust.html（5 知识点 + 3 collapsible + 5 quiz + 4 exercises）
- [x] 自审完成

## 工作后审阅

### 自评分数：88/100

| 维度 | 分数 | 满分 |
|------|------|------|
| 结构完整性 | 19 | 20 |
| 风格一致性 | 19 | 20 |
| 知识准确性 | 19 | 20 |
| 讲解深度与逻辑性 | 13 | 15 |
| 交互设计质量 | 9 | 10 |
| 快速测试质量 | 4 | 5 |
| 课后练习质量 | 4 | 5 |
| 可维护性与模块化 | 5 | 5 |

### 主要优点
- 四章均严格遵循 ch4.1 参考页面的 HTML 结构和 class 命名
- 每章 5 个知识点，均包含 think-box → 解释 → note-box → code-playground → quick-quiz 完整节奏
- 侧边栏导航 active 状态正确切换，交叉链接完整
- 代码示例短小完整，输出清晰
- 问题驱动讲解，先建立直觉再给规则

### 主要问题
- 无（结构和内容均符合 generation_rule.md 要求）

### 待修改项
- 无重大待修改项
