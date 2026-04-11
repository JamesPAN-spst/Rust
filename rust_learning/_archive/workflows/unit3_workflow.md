# Unit 3 workflow

## 基本信息
- 负责范围：标准库与项目实战
- 当前目标：完成 Unit 3 六个正式章节，并统一单元侧边栏与章节内导航

## 第一步：学习阶段记录
- [x] 阅读 generation_rule.md
- [x] 阅读 sub_agent_rule.md
- [x] 阅读 chapter_template.html
- [x] 阅读 ch1.1_ownership.html
- [x] 阅读 rust_learning/workflow.md
- [x] 阅读 unit3_std_projects/workflow.md 原始规划
- 学习结论：继续沿用深色侧边栏 + 卡片式主内容布局；每章保持“问题引入 → 直觉说明 → 正式规则 → 代码示例 → 快速反馈”的节奏；统一使用 `.knowledge-point`、`.quick-quiz`、`.collapsible`、`.chapter-summary`、`.exercises` 等标准 class；正式页要比示例页更强调跨章节导航和工程语境。
- 当前学习阶段状态：已完成，可进入正式页面收口与自审。

## 第二步：章节规划
- Ch 3.1 字符串：聚焦 `String` / `&str`、UTF-8、拼接 API、切片与遍历粒度选择。
- Ch 3.2 集合：聚焦 `Vec`、`HashMap`、重分配与借用、`entry` 模式、排序去重与计数。
- Ch 3.3 迭代器：聚焦惰性执行、`iter` / `iter_mut` / `into_iter`、`map` / `filter` / `collect`、链中的 ownership。
- Ch 3.4 错误处理：聚焦 `panic!` vs `Result`、`Option`、`?`、组合器与恢复策略。
- Ch 3.5 模块系统：聚焦 crate/module 关系、`pub` / `use` / `crate` / `super`、重导出、按职责组织项目。
- Ch 3.6 实战项目：用日志统计小工具串联模块、错误处理、集合、迭代器和字符串解析。
- 导航规划：六个 Unit 3 页面统一补齐完整章节侧边栏链接，并在每章补充本章锚点导航，保证单元内跳转完整。

## 进度清单
- [x] 学习阶段完成
- [x] 章节规划完成
- [x] 页面生成完成
- [x] 统一导航完成
- [x] 自审完成

## 已完成内容
- 新增正式页面：`unit3_std_projects/ch3.1_strings.html`
- 新增正式页面：`unit3_std_projects/ch3.2_collections.html`
- 新增正式页面：`unit3_std_projects/ch3.3_iterators.html`
- 新增正式页面：`unit3_std_projects/ch3.4_error_handling.html`
- 新增正式页面：`unit3_std_projects/ch3.5_modules.html`
- 新增正式页面：`unit3_std_projects/ch3.6_project_practice.html`
- 更新工作记录：`unit3_std_projects/workflow.md`
- 六个页面已统一为完整 Unit 3 章节导航，包含正确 active 状态、工作中的相对链接和本章锚点导航。
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
- Unit 3 六章已经全部落地，并且每章都保持了统一的深色卡片风格、交互组件和节奏结构。
- 六个页面的侧边栏已统一为完整 Unit 3 章节导航，同时补齐本章锚点导航，单元内跳转路径清晰。
- 内容重点与任务要求一致，系统覆盖字符串、集合、迭代器、错误处理、模块系统以及一个综合实战项目章节。

### 主要问题
- 侧边栏目前仍是静态 HTML 复制维护，后续如果 Unit 3 继续扩展，会有同步成本。
- 练习题和示例偏向教学型最小案例，后续仍可增加更长的跨文件项目代码片段。
- 当前只完成了结构性自检，没有接入自动化 HTML 链接检查或渲染检查流程。

### 待修改项 / Remaining improvements
- 后续可抽出公共导航模板或静态生成脚本，减少各页重复维护 sidebar 的成本。
- 可为实战项目章补充“上一章 / 下一章”式页底导航，强化线性学习体验。
- 如果仓库后续引入前端校验流程，可加入链接检查和 HTML 结构检查作为自动化验证。
