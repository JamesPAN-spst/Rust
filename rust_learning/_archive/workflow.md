# Rust 模板总 workflow

## 基本信息
- 工作区：Rust 仓库根目录下的 `rust_learning/`
- 当前目标：完成全部 6 个单元 25 个正式章节的生成
- 设计参考：`math_univers` 的设计风格与设计特点

## 第一步：学习阶段记录
- [x] 已提炼 `math_univers` 的页面结构特征
- [x] 已提炼 `math_univers` 的视觉语言特征
- [x] 已提炼 `math_univers` 的内容组织与交互节奏
- [x] 已将上述学习结果固化到 `generation_rule.md`
- [x] 已将学习入口固化到 `sub_agent_rule.md`、`index.html`、`templates/chapter_template.html`

### 学到的关键点
- 页面必须有稳定的阅读节奏，而不是简单堆叠知识点
- 侧边栏导航、卡片模块和提示框是风格核心
- 交互组件必须服务于理解，而不是装饰
- 迁移时只能迁移设计语言，不能迁移主题本体

## 已完成的正式页面（全部 25 章）

### Unit 0 · 环境与心态（2 章）
- [x] ch0.1_toolchain.html
- [x] ch0.2_mindset.html

### Unit 1 · 所有权系统（4 章）
- [x] ch1.1_ownership.html
- [x] ch1.2_borrowing.html
- [x] ch1.3_lifetimes.html
- [x] ch1.4_ownership_in_practice.html

### Unit 2 · 基础语法（6 章）
- [x] ch2.1_basic_types_variables.html
- [x] ch2.2_control_flow.html
- [x] ch2.3_functions_closures.html
- [x] ch2.4_struct_enum.html
- [x] ch2.5_pattern_matching.html
- [x] ch2.6_traits.html

### Unit 3 · 标准库与项目实战（6 章）
- [x] ch3.1_strings.html
- [x] ch3.2_collections.html
- [x] ch3.3_iterators.html
- [x] ch3.4_error_handling.html
- [x] ch3.5_modules.html
- [x] ch3.6_project_practice.html

### Unit 4 · 并发与异步（3 章）
- [x] ch4.1_threads.html
- [x] ch4.2_async_programming.html
- [x] ch4.3_async_ecosystem.html

### Unit 5 · 高级特性（4 章）
- [x] ch5.1_smart_pointers.html
- [x] ch5.2_generics_trait_objects.html
- [x] ch5.3_macros.html
- [x] ch5.4_unsafe_rust.html

### Unit 6 · 方向分支（3 章）
- [x] ch6.A_game_dev.html
- [x] ch6.B_security.html
- [x] ch6.C_systems.html

## 首页与导航
- [x] index.html 侧边栏已更新为全部 25 章直链
- [x] index.html 快速入口已覆盖全部单元
- [x] 各 unit 内页面侧边栏已统一

## 后续可优化
- 抽出公共导航为可复用模板或静态生成流程
- 增加跨单元页尾"下一章 / 上一章"导航
- 加入前端链接检查 CI

