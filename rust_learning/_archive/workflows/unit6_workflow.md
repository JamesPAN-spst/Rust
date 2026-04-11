# Unit 6 workflow

## 基本信息
- 负责范围：方向分支（Unit 6 · 方向分支）
- 章节数量：3 页（6.A / 6.B / 6.C）

## 第一步：学习阶段记录
- [x] 阅读 generation_rule.md
- [x] 阅读 sub_agent_rule.md
- [x] 阅读 chapter_template.html
- [x] 阅读 ch1.1_ownership.html
- [x] 阅读 ch4.1_threads.html（结构参考）

## 第二步：章节规划
- Ch 6.A 游戏开发方向 — Rust 与游戏开发、Bevy ECS、游戏循环与渲染管线、资源管理与社区生态
- Ch 6.B 安全攻防方向 — Rust 与安全工具、内存安全消除漏洞、Fuzzing 与二进制分析、协议解析与密码学
- Ch 6.C 系统编程方向 — Rust 与系统编程、clap CLI 工具、文件系统与进程管理、FFI/no_std/内核探索

## 进度清单
- [x] 规划完成
- [x] 页面生成完成
  - [x] ch6.A_game_dev.html（4 知识点 + 快速测试 + 2 折叠 + 课后练习 + 延伸阅读）
  - [x] ch6.B_security.html（4 知识点 + 快速测试 + 2 折叠 + 课后练习 + 延伸阅读）
  - [x] ch6.C_systems.html（4 知识点 + 快速测试 + 2 折叠 + 课后练习 + 延伸阅读）
- [x] 自审完成

## 工作后审阅

### 自评分数：88 / 100

| 维度 | 分数 | 备注 |
|------|------|------|
| 结构完整性 | 19/20 | 三页均包含完整章节结构：header、objectives、prerequisites、4 kp、summary、exercises、further-reading |
| 风格一致性 | 19/20 | 严格复用 ch4.1 的 HTML 结构、class 命名、sidebar 布局 |
| 知识准确性 | 18/20 | 代码示例均为合法 Rust，Bevy/clap/nom API 用法准确 |
| 讲解深度与逻辑性 | 13/15 | 每个 kp 遵循问题→直觉→规则→代码→反馈节奏 |
| 交互设计质量 | 9/10 | 每页 2 个折叠、4 个快速测试、课后 4 档练习 |
| 快速测试质量 | 4/5 | 选项区分度好，解释清晰 |
| 课后练习质量 | 4/5 | 覆盖基础→挑战→工程附加题 |
| 可维护性与模块化 | 2/5 | 依赖共享 CSS/JS，结构统一 |

### 主要优点
- 三页风格完全统一，sidebar 导航正确切换 active 状态
- 代码示例简短且上下文完整，输出说明清楚
- 折叠内容提供了额外深度（ECS vs OOP、wgpu 角色、no_std 示例、CLI 生态）

### 主要问题
- 代码示例为展示型，部分需要外部依赖（bevy、clap、nom）无法直接 `rustc` 编译
- 游戏开发方向的输出为近似值说明而非精确输出

### 待修改项
- 无阻塞性问题，可视为完成
