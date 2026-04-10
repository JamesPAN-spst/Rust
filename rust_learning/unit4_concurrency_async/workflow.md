# Unit 4 workflow

## 基本信息
- 负责范围：并发与异步
- 当前目标：完成 Unit 4 三个正式章节，并统一 Unit 4 单元侧边栏与章节内导航

## 第一步：学习阶段记录
- [x] 阅读 generation_rule.md
- [x] 阅读 sub_agent_rule.md
- [x] 阅读 chapter_template.html
- [x] 阅读 examples/ch1.1_ownership.html
- [x] 阅读 rust_learning/workflow.md
- [x] 阅读 unit4_concurrency_async/workflow.md 原始规划
- 学习结论：继续沿用深色侧边栏 + 主内容卡片布局；每章坚持“问题引入 → 直觉解释 → 正式规则 → Rust 示例 → 快速反馈”的节奏；统一使用 `.knowledge-point`、`.quick-quiz`、`.collapsible`、`.note-box`、`.chapter-summary`、`.exercises` 等标准 class；Unit 4 页面需比示例页更强调线程 / async 的心智模型与跨章节导航。
- 当前学习阶段状态：已完成，可进入正式页面收口与自审。

## 第二步：章节规划
- Ch 4.1 线程并发：聚焦 <code>std::thread</code>、线程 <code>move</code>、channel、<code>Arc&lt;Mutex&lt;T&gt;&gt;</code>、<code>Send</code> / <code>Sync</code> 直觉。
- Ch 4.2 异步编程：聚焦 async/await 心智模型、Future poll 直觉、executor / runtime、避免在 async 任务里阻塞。
- Ch 4.3 异步生态：聚焦 Tokio-like 生态分层、async trait caveat、取消 / 超时 / backpressure、同步 vs 异步选型。
- 导航规划：三个 Unit 4 页面统一补齐完整章节侧边栏链接，并在每章补充本章锚点导航，保证单元内跳转完整。

## 进度清单
- [x] 学习阶段完成
- [x] 章节规划完成
- [x] 页面生成完成
- [x] 统一导航完成
- [x] 自审完成

## 已完成内容
- 新增正式页面：`unit4_concurrency_async/ch4.1_threads.html`
- 新增正式页面：`unit4_concurrency_async/ch4.2_async_programming.html`
- 新增正式页面：`unit4_concurrency_async/ch4.3_async_ecosystem.html`
- 更新工作记录：`unit4_concurrency_async/workflow.md`
- 三个页面已统一为完整 Unit 4 章节导航，包含正确 active 状态、工作中的相对链接和本章锚点导航。
- 每个页面都已包含：章节头、学习目标、前置知识、至少 4 个知识点、快速测试、折叠区、章节总结、课后练习、延伸阅读。

## 工作后审阅
### 自评分数
- 总分：95 / 100
- 结构完整性：20 / 20
- 风格一致性：20 / 20
- 知识准确性：19 / 20
- 讲解深度与逻辑性：14 / 15
- 交互设计质量：10 / 10
- 快速测试质量：5 / 5
- 课后练习质量：4 / 5
- 可维护性与模块化：3 / 5

### 主要优点
- Unit 4 三章已全部落地，并统一保持深色卡片风格、提示框、快速测试和折叠区的阅读节奏。
- 三个页面的侧边栏已统一补齐全部 Unit 4 章节与本章锚点导航，单元内跳转路径完整。
- 内容重点与任务要求一致，覆盖线程并发、async/await 心智模型、Future / executor、异步生态、取消 / 背压以及同步 vs 异步选型。

### 主要问题
- 侧边栏仍是静态 HTML 复制维护，后续 Unit 4 若继续扩展，导航同步成本会增加。
- 示例以教学型最小代码为主，尚未扩展为更长的多文件项目片段。
- 仓库内未发现现成的构建、lint 或自动化链接检查流程，目前只完成了结构性自检。

### 待修改项 / Remaining improvements
- 后续可抽出公共导航模板或静态生成流程，降低多页 sidebar 的重复维护成本。
- 可在后续新增 Unit 5 正式页面后，为 Unit 4 增补“下一单元入口”式页尾导航。
- 若仓库后续加入前端校验流程，可补充 HTML 链接检查与渲染检查作为自动验证。
