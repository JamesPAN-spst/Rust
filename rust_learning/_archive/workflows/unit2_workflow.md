# Unit 2 workflow

## 基本信息
- 负责范围：基础语法
- 当前目标：完成 Unit 2 六个正式章节，并统一侧边栏导航与章节内导航

## 第一步：学习阶段记录
- [x] 阅读 generation_rule.md
- [x] 阅读 sub_agent_rule.md
- [x] 阅读 chapter_template.html
- [x] 阅读 examples/ch1.1_ownership.html
- [x] 阅读 rust_learning/workflow.md
- [x] 阅读 unit2_syntax/ch2.1_basic_types_variables.html
- 学习结论：继续沿用深色侧边栏 + 主内容卡片布局；知识点保持“问题引入 → 直觉说明 → 正式规则 → Rust 示例 → 即时反馈”的节奏；快速测试统一使用 `.quick-quiz` 和 `data-answer` / `data-explanation`；折叠区继续承担“补充解释 / 思考题答案”的角色。
- 当前学习阶段状态：已完成，可进入正式页面收口与自审。

## 第二步：章节规划
- Ch 2.1 基本类型与变量：聚焦绑定与可变性、标量与复合类型、shadowing、类型推断与注解、`const` vs `let`。
- Ch 2.2 控制流：聚焦 `if` 的表达式思维、`loop` 返回值、`while` 的条件驱动、`for` 的遍历语义，以及不同控制流的选型直觉。
- Ch 2.3 函数与闭包：聚焦函数签名、表达式返回、闭包捕获、`move`、`fn` / `Fn` / `FnMut` / `FnOnce` 的直觉。
- Ch 2.4 Struct 与 Enum：聚焦 struct 建模、tuple/unit struct、基础 `impl`、enum 状态建模，以及 `Option` / `Result` 的语义。
- Ch 2.5 模式匹配：聚焦 `match`、struct/enum/tuple 解构、`if let` / `while let`、match guard、`_` 和穷尽性。
- Ch 2.6 Trait 系统：聚焦 trait/impl、derive、trait bound、默认方法、静态分发与动态分发直觉。
- 导航规划：所有 Unit 2 页面统一补齐六章侧边栏链接，并在每章侧边栏追加本章知识点锚点导航，保证单元内跳转完整。

## 进度清单
- [x] 规划完成
- [x] 页面生成完成
- [x] 统一导航完成
- [x] 自审完成
- 已完成页面：
  - `ch2.1_basic_types_variables.html`
  - `ch2.2_control_flow.html`
  - `ch2.3_functions_closures.html`
  - `ch2.4_struct_enum.html`
  - `ch2.5_pattern_matching.html`
  - `ch2.6_traits.html`

## 工作后审阅
- 自评分数：95 / 100
  - 结构完整性：20 / 20
  - 风格一致性：19 / 20
  - 知识准确性：19 / 20
  - 讲解深度与逻辑性：14 / 15
  - 交互设计质量：10 / 10
  - 快速测试质量：5 / 5
  - 课后练习质量：4 / 5
  - 可维护性与模块化：4 / 5
- 主要优点：
  - Unit 2 六章已全部完成，且每章都包含学习目标、前置知识、多知识点模块、快速测试、折叠区、总结、练习和延伸阅读。
  - 六个页面的侧边栏已统一为完整 Unit 2 章节导航，并补充了本章锚点导航，单元内跳转可直接工作。
  - 内容重点与任务要求一致，突出控制流的表达式思维、闭包捕获直觉、enum / Option / Result 建模、模式穷尽性、trait 抽象与分发模型。
- 主要问题：
  - 页面之间仍是静态 HTML 复制导航，后续如果章节继续增加，维护成本会同步上升。
  - 目前没有自动化 HTML 校验或链接检查脚本，只完成了本地结构性自检。
- 待修改项 / Remaining improvements：
  - 后续可考虑抽出统一导航模板或静态站点生成流程，降低重复维护。
  - 可在未来补充更多跨章“前后衔接提示”，例如在 Unit 2 与 Unit 3 之间增加进阶建议。
  - 若仓库后续引入前端构建流程，可加入链接校验和结构校验作为自动检查。
