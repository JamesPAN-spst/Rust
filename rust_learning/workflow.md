# Rust 模板总 workflow

## 基本信息
- 工作区：Rust 仓库根目录下的 `rust_learning/`
- 当前目标：在 Rust 仓库中建立可扩展的 Rust 学习模板体系
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

## 已启动的子 agent 正式页面
- agent-u0：已生成 `unit0_foundation/ch0.1_toolchain.html`
- agent-u1：已生成 `unit1_ownership/ch1.2_borrowing.html`
- agent-u2：已生成 `unit2_syntax/ch2.1_basic_types_variables.html`

## 下一步
- 继续按子 agent 分工扩展 Unit 0 / Unit 1 / Unit 2 的后续章节
- 启动 Unit 3 ~ Unit 6 的首批正式页
- 在正式页增多后统一优化跨章节导航
