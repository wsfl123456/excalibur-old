<template>
  <div class="brief-info-common">
    <div v-if="activeFilter === 1">
      <div class="title">
        <div>01</div>
        <div>什么是HU？</div>
      </div>
      <p>
        HU英文全拼Hoshin
        Unit，中文：诺锞传媒事业部。诺锞传媒事业部是服务于公司战略发展的先锋组织，是硬核少年的成长小组，我们共有两种属性的事业部，即Strategy
        Hoshin Units 与Innovative Hoshin Units（下称SHU
        与IHU）。所有事业部均以组织使命为根基，承担相应战略落地，实施对外扩大战略，实现营收或收益。
      </p>
      <p>
        Hoshin一词源于日文发音，是一个源于日本的企业长期循环计划和管理概念。Hoshin在日语中本义是闪亮的金属指针，引申为方针、政策、计划、目的等。在战略规划层面通过HU管理将关键性的、长期性的企业目标得以系统规化。
        在日常管理层面，HU把握好关键业务流程中的每一项基础性工作及业务，同时是全面质量管理（Total
        Quality Management）的有力支柱。
        HU管理也可以被认为是PDCA在管理流程中的具体应用。各个事业部通过制定年度BP及DRI对既定的公司策略自上而下依序展开新的年度目标和行动计划并周期性进行分析及评估。
      </p>
    </div>
    <div v-else-if="activeFilter === 2">
      <div class="title">
        <div>02</div>
        <div>为什么要使用DRI？</div>
      </div>
      <p>
        DRI英文全拼Directly Responsible Individual of NORMCORE Hoshin
        Units，中文《诺锞传媒事业部目标责任书》，是帮助Captain管理事业部的工具，是把你要做的事情梳理出来，拆解分化给到自己Mate的思考。拆解与落地DRI也是考验每个Captain下一步发展潜能的工具，是否能够发展出更大的事业部，发展出事业部群，甚至在未来成立子公司的重要工具。
      </p>
      <p>
        DRI是硬核少年的硬核，为了找到对的人共同做对的事，对事业部所有成员的目标、业绩、能力、态度进行客观评价，达到事业部成员与事业部共赢，以达成公司成长与培养业务人才尤其是领导人才之目的。
      </p>
      <p>
        DRI不能只说做什么，而要想清楚为什么做，也就是目的；不能只做，更要想到怎么评估要有可以直接考量和考核的数据；向结果说法，能够用数据最后分钱。
      </p>
    </div>
    <div v-else-if="activeFilter === 3">
      <div class="title">
        <div>03</div>
        <div>如何参与和制定DRI？</div>
      </div>
      <p>
        每位事业部成员都应承担自己的DRI，事业部根据各岗位、职位的不同，确定相应的考核规程与评价标准，并对事业部成员（Mate）公开。对事业部成员（Mate）的任何考核都有明确的考核标准，以数据为依据，客观反应事业部成员（Mate）的实际情况，同岗位同标准，避免因个人或者其他主观因素影响考核结果。以组织与个人双赢为指导，依此指导原则结合事业部目标责任，由事业部队长（Captain）、副队长（Chief
        Mate）、辅导员（Counselor）与成员协商制定，共同完成。
      </p>
      <p>
        这个工具非常符合使用OGSM的思考方法来进行问题分解，考核表仅仅是DRI的Measurement的工具，是一个底线思维，当然可以从底线开始往上思考，不过更推荐从目的出发，使用OGSM进行正面演绎。
      </p>
      <p>另外，在制定DRI的过程中应思考：</p>
      <p class="split-item">
        <span>1、</span>
        <span>
          <span> 我/我的团队要做一个什么事 </span>
          <span> 我/我们是谁 </span>
          <span> 我/我的团队要做什么 </span>
          <span> 为什么我/我的团队要做这个 </span>
          <span> 什么样的能力支持我/我的团队做这个 </span>
        </span>
      </p>
      <p class="split-item">
        <span>2、</span>
        <span>
          <span> 我/我的团队怎么组织在一起做这个事情 </span>
          <span> 我/我们要选择什么样的人 </span>
          <span> 我/我的团队要怎么样成长才能够做成这个事 </span>
          <span> 我/我的团队怎么样组织在一起能够更有效的做成这个事情 </span>
        </span>
      </p>
      <p class="split-item">
        <span>3、</span>
        <span>
          <span> 我/我的团队怎么赚钱 </span>
          <span> 我/我们要做的这个事情能够给我们带来多少的收益 </span>
          <span> 我/我的团队怎么优化能够带给团队更好的收益 </span>
        </span>
      </p>
    </div>
    <div v-else-if="activeFilter === 4">
      <div class="title">
        <div>04</div>
        <div>为什么要有TGT？</div>
      </div>
      <p>
        TGT全称：Talent Grow
        Together，人才共同成长计划。于2015年01月2日建立的考核机制，完善公司用人制度，帮助员工在专业和个人素养的双方面成长，Talent
        Grow
        Together的基本核心理念是每一位同学都是创意精英和创意人才，所以称Talent，这是我们对于人的尊重。TGT就是帮助员工客观、深入地评估自身的兴趣、技能和价值观的工具。TGT将作为考核工具，指导公司内各事业部及其成员，评估与培养其能力和心态。TGT的考核结果将影响员工的职级/职位/基本薪资/员工福利。
      </p>
      <p>
        TGT是对硬核少年成长的指引工具，旨在为公司的人才提供良好的职业生涯规划并为其个人能力的打造科学的上升通道。
      </p>
      <p>
        员工是公司最重要的资源。公司通过不断帮助员工提升能力，达成公司业务的目标来支持员工的个人发展。员工的职业发展及成长是公司成长和发展的保障。公司通过明确各个职位的胜任能力要求，帮助员工确立职业发展方向与路径，帮助员工提升能力。
      </p>
    </div>
    <div v-else-if="activeFilter === 5">
      <div class="title">
        <div>05</div>
        <div>如何参与TGT？</div>
      </div>
      <p>
        公司将以自然年为单位，每年的 1 月及 7
        月开启对上一个半年度的考核，即每年的 1 月对上一自然年度的 7 至 12
        月、每年的 7 月对本自然年度的 1 至 6 月进行考核。
        每个考核周期内，员工服务时间超过
        6个月的，才有资格进行考核，也就是说过试用期成功转正的员工才能参加TGT。考核开启时，NCC将通过月会/邮件形式通知所有员工，有意向员工向
        Captain 提交考核申请表 Application
        Form（http://cloud.normcore.com/l/MFiH1S ），由 Captain
        对其进行初判断；由 Captain 向 NCC 提交本 NHU 所有的 Application
        Form（包含由 Captain 拒绝的），作为当期考核中，该 NHU
        内具备考核资格的人员名单； NCC 审核确认后，由辅导员于 NHU
        内公示，对该公示有异议的 Mate，可提出申诉或举报。
      </p>
    </div>
    <div v-else-if="activeFilter === 6">
      <div class="title">
        <div>06</div>
        <div>怎么理解硬核少年？</div>
      </div>
      <p>
        硬核少年是由两个词组成的，“硬核”+“少年”。这个组合便是NORMCORE的人才观，我们坚信万事万物皆可硬核，我们也相信出走半生，归来仍是少年。
      </p>
      <p>
        硬核，是一个网络词汇，它象征着一种力量感，一种热情。在NORMCORE，硬核不仅是专业，硬核更是理论与实践相结合的一种解决问题的能力。
      </p>
      <p>
        在NORMCORE，少年不是年龄和经验，少年是相信年轻人的力量；少年是一种心态。是在做任何一件事的时候都抱有热情；是所有的一切都必须靠实干说话；是用于承担责任；是充分发挥兴趣、引爆能量；是做自己、坚守自己。硬核是一种态度，拒绝油腻软弱、拒绝没有主见、人云亦云、纸上谈兵、酒色财气。是保持好奇，终身学习；是坚守热情，不忘初心；是空杯谦卑，教学相长；是立于当下，放眼未来。
      </p>
      <p>
        航程开始，我们航程要招募的人都是拥有少年气息的人，我们不要暮气沉沉的人，要内心拥抱少年气，永葆少年气。我们都是小黄书里的十八样武器要精通几样的硬核少年。我们身上带着领导力、务实力、行动力、求知力、创新力、共情力、影响力。我们要给到内部与外部的形象人设就是硬核少年。我们代表的就是这群硬核少年的共同利益，荣誉、利益的分配等都应该去肯定我们典型的硬核少年，影响更多人成为硬核少年。
      </p>
      <p>
        我们期望每一个加入到NORMCORE的人才，都能拥有少年的心态，保持硬核的实力，在这里成为真正的硬核少年。
      </p>
    </div>
    <div v-else-if="activeFilter === 7">
      <div class="title">
        <div>07</div>
        <div>怎么看待硬核少年和海洋文化的关系？</div>
      </div>
      <p>
        海洋式思考源自于“海洋法系”，与之相对应的是“大陆法系”。在这里我们所想分享的并非是两种法系的区别或孰优孰劣，而是两种法系背后的思维模式。
      </p>
      <p>
        海洋式思考有别于大陆式思考，更具适应性和开放性，它强调“归纳”，善于“总结”，是一种向外生思考、向对方思考、向未来思考的思维模式。
      </p>
      <p>
        在NORMCORE，我们认为硬核少年在拥有结构化思维同时，应该去向外生思考，着眼于影响圈，扩大自身影响力；去向对方思考，着眼于全局，远离本位主义；去向未来思考，着眼于发展，洞悉时代趋势。
      </p>
      <p>
        拥有海洋式思考的每一个人都像一个“X”，个性和未来不会受到限定，他们去尝试未知的自己，将自己无尽的创造力发挥到四面八方，探索自己的各种可能性。
      </p>
    </div>
    <div v-else-if="activeFilter === 8">
      <div class="title">
        <div>08</div>
        <div>怎么看待硬核少年和内归因的关系？</div>
      </div>
      <p>
        内归因与外归因时常被我们放在一起讨论，从定义上，前者将行为原因归属为个人内在的性向因素如人格特征等，后者将行为原因归属为外部环境因素。
      </p>
      <p>
        我们常常认为内归因的人更值得被信任，他们会对自己的行为负责。他们成功之时能拥有阳光般的心态，失败时也总能展现光明的一面，自信有担当。
      </p>
      <p>
        在NORMCORE，我们期望每一位硬核少年都能拥有较高的成就动机，他们相信自己，也值得被信任；他们愿意承担责任，也会对自己的行为负责。
      </p>
      <p>
        每一位硬核少年都应将关注圈放在自己身上，从而扩大自己的影响圈，在要求自身内归因的同时，不苛责别人的外归因，“行有不得，反求诸己”。
      </p>
    </div>
    <div v-else-if="activeFilter === 9">
      <div class="title">
        <div>09</div>
        <div>我们的组织远景是什么？</div>
      </div>
      <p>
        不管是新朋友，还是老相好，不管我们是一直很默契的配合，还是这一路上在磕绊中不断达成的认同，我们相信这一切的努力是为了能够提升自己的能力与市场价值，也更是为了能够创造出更多更有趣的作品。
      </p>
      <p>
        在公司发展的第三年（2017年），随着认识的不断深化，我提出组织二十年的愿景是成为以中国文化精神为内核的领先的文化创作与传播的大组织。
      </p>
    </div>
    <div v-else-if="activeFilter === 10">
      <div class="title">
        <div>10</div>
        <div>什么是「翙羽计划」？</div>
      </div>
      <p>
        我们学习的对象是全球最大的文娱帝国Disney，这个梦想到现在一直闪耀着光芒激励我们前进的航程，也因此，组织「五年计划」应运而生。
      </p>
      <p>
        凤凰于飞，翙翙其羽，亦傅于天。凤与凰在一飞冲天之前，要先震动翅膀，蓄力待发，「翙羽计划」成为我们第一个五年计划的代名词。
      </p>
      <p>
        这就是我们组织现在的状态，是厚积而薄发中的「厚积」，在这个阶段，我们要努力向竹子学习，竹笋在地下蓄能三年，一旦破土一日三尺，才有了雨后春笋节节高，这个时间可能很久，需要强大的耐性与韧性。
      </p>
      <p>
        在第一个五年，我们要锻炼组织能力，蓄力组织张力，统一顶层战略，实现理论与术语的统一，实现组织的数字化运营，实现「创意+IP+技术」的基础面布局。
      </p>
      <p class="active">发展策略：</p>
      <p>
        通过提升人才效能，实现个体和集体的共同成长。人才效能，即基于我们所从事的行业特点，我们的收入、工资等主要是由于人才创造力而取得的成果，我们的营业收入、毛利、组织的进一步成长、核心竞争力等都有赖于人才效能的提升，人才效能是我们we
        pay best for top
        talent的集中体现，我们整个组织的最大目的就是一起提升大家的价值，提升每个人的人才效能，这也是NCC和TGT的初心。同时，组织发展的利润成果也将通过人才效能的杠杆与人才一起分享。
      </p>
      <p class="active">2020-2021战略方向：</p>
      <p>
        1、提升我们的人才效能。各NHU、NCC、FC、Excalibur等通过各种方式，实现人才效能的成长。NHU通过拓展客户、优化产品、优化组织管理、积累诺锞经；NCC通过整合诺锞经验、打造行业理论高度指导实践、发掘潜力人才、优化组织模型、人才合作模式；FC通过定价、成本与资金控制，优化采购；Excalibur通过运营支持、企业数字化等，我们一起合力实现人才效能的成长。
      </p>
      <p>
        2、稳固并成长我们现有客户生意，持续开发新的优质客户。现有的客户是我们经过几年迭代留下来的优质客户，是值得长期经营的客户。同时，我们要持续开发在未来有前景的客户，比如大健康领域、AI智能领域、文化艺术领域、娱乐领域、游戏电竞领域等。
      </p>
      <p>
        3、不断优化我们的产品结构。未来2年，5G技术的实现、跨屏技术的升级，人们对物质升级和文化消费的需求提升，因此Martech、企业数字化发展、图文升级为视频、直播与电商新零售的整合、IP的蓬勃发展等都将成为未来的主流，是我们要努力发展和占领的方向。根据波士顿经典理论，我们要保住金牛产品、快速发展明星产品、逐渐淘汰瘦狗与问题产品。
      </p>
      <p>
        4、坚决落实我们的数字化Excalibur。本次疫情中我们仍然能够保持运营，除了靠大家极高的素质外，最大的一个法宝是我们有Excalibur链接的工具，尤其在我们将迎来的智能时代，没有数字化的企业是没有未来的，Excalibur将有赖于和大家一起进一步优化，真正成为组织Know-HOW的强大工具，不断提升诺锞经验。
      </p>
    </div>
    <div v-else-if="activeFilter === 11">
      <div class="title">
        <div>11</div>
        <div>硬核少年要秉承的业务原则是什么？</div>
      </div>
      <p class="active">业务三原则：</p>
      <p>让事情适时、准确地发生 MAKE THINGS HAPPEN</p>
      <p>把事情高效、充分地完成 GET THINGS DONE</p>
      <p>使每个相关人员被同步到 KEEP PEOPLE UPDATED</p>
      <p class="active">行为原则/Dos and dons：</p>
      <p class="no-indent">
        我们应该<br />
        √ 坚持业务处理三原则（MAKE THINGS HAPPEN、GET THINGS DONE、KEEP PEOPLE
        UPDATED）。
        <br />
        √ 在有效的工作时间内提高工作效率及工作质量。
        <br />
        √
        对自己的成长负责，主动学习和探索，主动寻求所有可能的学习途径，敏而好学、不耻下问。
        <br />
        √ 保持中立，公正公平。
        <br />
        √ 时刻保持利他思维，学习用同理心来分析和看待人事物。
        <br />
        √
        在沟通每一件事之前，清楚明白正确的沟通对象，尤其充分考虑及尊重N+1、N-1的知情权及沟通权限。
        <br />
        √ 时刻保持风险把控意识。
      </p>
      <p class="no-indent">
        我们不应该<br />
        × 对公司其他员工或其他公司有关人士粗鲁、无礼。<br />
        × 用消极的态度对待工作。<br />
        × 遇到困难，不停抱怨，影响自己，影响他人。<br />
        × 工作中互相推诿，借词卸责。<br />
        × 对他人的劳动成果随意主观评判或指责。<br />
        × 对未经证实的事情、言论等进行传播、评论、妄加指责。<br />
        × 掩饰、包庇及欺骗他人关于其他员工所犯的行为过错、失误或违规行为。<br />
      </p>
    </div>
    <div v-else-if="activeFilter === 12">
      <div class="title">
        <div>12</div>
        <div>我们的发展历程</div>
      </div>
      <p>
        诺锞传媒成立于2014年，NORMCORE
        Group是伴随着中国IP时代快速成长的公司，是文化产业内致力于文化产品投资、战略、发展、品牌的专业机构。公司的创始人团队，在文化产品战略、整合行业资源以及品牌管理方面有着丰富的经验。
      </p>
      <h4>1. 战略布局发展</h4>
      <p>2014.8.6 NORMCORE正式成立。</p>
      <p>
        这是一个从“无”到“有”的时刻，我们怀揣着一颗匠人之心和匠人精神创办了NORMCORE，我们期望用专业、完美精确以及爱来诠释最朴实常规的东西并将其演绎到极致，做出真正对整个行业对人对社会而不仅仅是客户有意义有价值的作品。
      </p>
      <p>
        2014.09.18 NORMOCRE第一个办公室在江苏路正式运营，<span class="active"
          >初生：NORMCORE开启1.0时代</span
        >
      </p>
      <p>
        2014.09
        迎来第一位客户——隐适美Invisalign：帮助隐适美在国内建立了坚实的Marketing基础，打进了年轻圈层，使我们奠定了整合营销的基础，包括品牌和产品层面、消费者调研、技术开发、创意和市场策略的整合思考能力得到提升。
      </p>
      <p>
        2015.01
        购买.com域名与邮箱：确定了公司大格局，为未来的布局打下基础，我们拥有全球化视野的精神理念和开阔的胸怀，敢于接受各种挑战，拥有走向国际的野心，是向国际化迈出的一小步。
      </p>
      <p>2015 第一次发布全新公司简介：公司业务的新进展和突破。</p>
      <p>
        2015.11
        肯德基×奇葩来了项目上线：更加明确了公司的发展方向和发展战略，公司未来的蓝图、愿景更加清晰；更加坚定了做文化行业的理念，坚定了要以消费者为核心，让品牌拥抱消费者，坚定了在面向新兴人类的时候，必定是透过打圈层文化，渗透到每一个消费者。
      </p>
      <p>
        2015.12
        酷拓COOLTOUR品牌成立：成立酷拓COOLTOUR品牌，拓展除文化领域外的其他文化载体，这是我们进军全球化所迈出的第一步，也正式开始全球化经营。
      </p>
      <p>
        2016.11 启动IP
        Project：明确了公司的战略定位，制定以IP为核心的整合营销策略，有了更明确的决心和方向，决定要做一个IP平台，开始进行了IP行业整合报告、二次元研究报告。
      </p>
      <p>
        2017.03
        正式成立IP项目组：公司业务的一大进展，是我们向前走的一大步，我们从一个纯粹的广告公司向文化产业开始迈进。公司对于创新的投入，从来都不留余力；创新也是公司的基因，我们从不循规蹈矩，会不断的推陈出新。
      </p>
      <p>2017.06 成立BD的团队，开启BD会议：公司对于BD团队建设放入工作规划。</p>
      <p>
        2017.06
        夏至未至×肯德基现磨咖啡项目上线：实现了公司在电视剧方面，以IP营销为核心的大品类的突破，并且系统性的运用了明星IP×电视剧IP的联动，实现整合营销，使公司在IP营销的道路上向前迈进了一大步。
      </p>
      <p>
        2017.12
        航海王×肯德基蛋挞项目上线：在IP营销的道路上突破了二次元世界，向前跨了一大步。
      </p>
      <p>
        2018.05.26
        2018年度金瞳奖荣誉：荣获“新锐娱乐营销公司”，得到行业内的肯定，是公司前进的一大步。
      </p>
      <p>
        2018.06.24
        酷拓发布会亮相上海国际电影节：正式开始三方战略合作，开启IP价值管理体系业务模型。
      </p>
      <p>
        2018.08.04
        公司四周年庆“大肆造”：公司发展历程上极具纪念意义，以周年庆的形式宣传公司品牌和文化，树立公司形象；也是对公司的总结和回顾，共同展望未来，表达对未来的愿景。
      </p>
      <p>
        2018.8
        公司新版官网正式上线：改版后的官网更具NORMCORE特色，奠定了NORMCORE的文化属性，吸引更多“同道中人”。
      </p>
      <p>
        2018.09
        2018年度入围金投赏荣誉：是对自身在行业内的自我评估、比较、总结和肯定。
      </p>
      <p>
        2018.10.16
        首次参加IP授权展：成为中玩协IP品牌授权专委会成员，帮助IPEC在IP快速发展，是公司业务向前迈进的一大步。
      </p>
      <p>
        2018.11
        IPEC网页版上线：IP产品1.0版本正式上线，在IP产业链的布局迈出扎实的一步。
      </p>
      <p>
        2018.12
        NORMCORE发布翙羽计划：发布翙羽第一个5年计划并组建IHU，NORMCORE由部门制向事业部制转型，正式运行DRI，
        <span class="active">NORMCORE进入2.0时代</span>
      </p>
      <p>
        2019.03 亮相上海国际广告节：Jason
        SHEN荣获上海国际广告节年度杰出青年领袖，NORMCORE多项项目在这一国际赛事上入围提名，IPEC产品同时亮相上海国际广告节即受追捧。
      </p>
      <p>2019.06 IP二厂亮相上海国际电影节：IP二厂发布，联动文娱产业IP发展。</p>
      <p>
        2019.08.06
        公司五周年庆“硬核少年扬帆远航：发布硬核少年七大力及COMPASS，号召同学们在诺锞做硬核少年。
      </p>
      <p>
        2020.04
        IP二厂web端/移动端（APP&小程序）全面上线：IP产业布局正式步入2.0阶段。
      </p>
      <p>
        2020.07
        获上海国际广告节荣誉：斩获“年度新锐代理公司”称号及荣获“年度商业化媒体”提名。
      </p>
      <p>
        2020.06
        芬达xB站项目上线：芬达全面拥抱B站打入年轻群体，是NORMCORE透过打圈层文化又一个全新里程碑式成功案例。
      </p>
      <p>
        2020.08.06
        公司六周年庆“劈波斩浪的少年”：开展为期三周的周年庆活动，将硬核少年的文化再次渗透。
      </p>
      <p>2020.09 获选“中国品牌授权联盟”理事单位。</p>
      <h4>2. 流程标准智能化</h4>
      <p>
        2014.12.02
        引入工具Teambition：公司建立流程化的第一步，正式开始了协同作业，为公司流程化奠定最基础的工作，公司及每一位人才共享知识与技能，我们提供给新人以及需要成长的人，让TB成为大家升级和不断学习的工具，帮助大家成长。
      </p>
      <p>
        2015.01.12
        技术部正式成立：这是一个技术的时代、互联网的时代、大数据的时代、人工智能的时代，我们要通过技术驱动公司的不断成长，技术部的成立是公司向前迈进的一大步。我们鼓励每一位员工都要有对技术的头脑和认知，技术已不再是程序员的专有和专业领域，而该成为公司的基础共识。我们帮助公司每一位同事对技术知识了解和积累。
      </p>
      <p>
        2015.01.26 明确“业务三原则”的工作理念：发布业务三原则”Make things
        happen，Get things done, Keep people updated.”
        作为行为准则指导日常工作。
      </p>
      <p>
        2015.03.24
        发布公司文件使用规则：公司标准化工作流程的一大推进，用统一的术语以及标准去沟通一件事情，在统一的规则下行动，使得沟通更加简单和有效，避免鸡同鸭讲。
      </p>
      <p>
        2015.05.06
        正式发布NTCC&NDA：作为1.0时代运营规则，确定公司行为准则、做事规范、工作流程。全称是normcore
        talent conduct
        code，即诺锞人才行为准则，帮助新同事在新的工作中不感到茫然和拘束，并且告诉他们必须了解的信息，作为一个NnormcoRE的基本价值观，让我们有一个互助、礼让、有效、诚实的工作环境。
      </p>
      <p>
        2016.05.03
        制定“每周一WIP会议”：帮助每一个项目中每一位同事快速了解本周即将发生的事情，这也是遵守PDCA的一个过程。并且通过这个方式向大家传递“proactive”，即每个人要有的思考——凡事预则立不预则废，每周WIP不建议请假调休，帮助公司建立一定的规则，在规则面前一律平等，每个人都要遵守，尊重自己也要尊重别人，对每一位同事负责。
      </p>
      <p>
        2016.05.27 正式发布PM
        Book及Test：我们注重标准化，流程化及知识的传承和考核。内容包含了项目培训、项目管理资料等，通过“Test
        of Business Code & Working
        Process”帮助我们建立了考试制度。对于知识点是否完全吸收最直接的检验方法就是测试。
      </p>
      <p>
        2018.07
        Excalibur上线：工作流程化、标准化的重要性，通过建立标准的工作流程，更有效的进行管理并大大提高了工作效率，通过技术驱动进步。
      </p>
      <p>
        2019.06
        NCC小黄书正式登陆Excalibur：NCC小黄书将NORMCORE的知识、经验及流程系统化的沉淀于小黄书，让每个加入NORMCORE的同学更快更便捷的查询、学习及积累。
      </p>
      <p>
        2020.02
        远程居家办公管理办法发布：全民抗疫期间，在NCC、Excalibur、Finance的组织下快速颁布实施了云开工的各种办法和支持措施，让居家作业顺畅进行，也展现了NORMCOReR并肩作战、共克时艰的硬核精神。
      </p>
      <p>
        2020.04
        NTCC2.0发布：发布2.0时代的运营规则，确定和更新了公司行为准则、做事规范、工作流程。
      </p>
      <h4>3. 人才关怀成长</h4>
      <p>
        2014.12.04
        参加东华大学六校校招：公司愿意培养人才，见证每一位人才的成长，达到让知识共享的意义，为公司注入年轻的活力；更好的了解年轻圈层，更好的帮助客户实现品牌年轻化。
      </p>
      <p>
        2015.01.20
        正式搬入德必易园：我们始终坚信，光明带来的能量是无限的；我们所在的9层910中“9”这个数字必然决定我们长长久久越走越远。整个办公室的规划来自所有同事集思广益，所有的装修也由NormcorER筹划并监工完成。我们的NormcorER们上能提案，下能搬砖盖房，没有级别高低性别男女之分，每个人都满怀热情，充满魄力。
      </p>
      <p>
        2015.01.22 建立人才共同成长计划，简称TGT（Talent Grow
        Together）：正式开启1.0时代的考核机制，完善公司用人制度，帮助员工在专业的事例和个人素养的双方面成长，Talent
        Grow
        Together的基本核心理念是每一位同学都是创意精英和创意人才，所以称Talent，这是我们对于人的尊重。我们不是以行政驱动而是以专业驱动运营的公司，所以需要grow
        together，这是我们最基础的人与人之间合作的基本理念。
      </p>
      <p>
        2015.01.28
        公司第一个年会：通过年会传递公司文化，树立了公司形象，通过NORMCORE thank
        your
        letter感谢客户，让我们的才华得以展示，让我们一起创造了很多有意义的案例，带给消费者不一样的体验和精彩的瞬间。
      </p>
      <p>
        2015.09.30
        公司第一个生日会：开启NORMCORE月度生日会传统，增强公司凝聚力,加强员工归属感,体现人文关怀,进一步推动公司企业文化建设,形成良好的企业向心力和凝聚力。
      </p>
      <p>2015.12.16 第一次Outing-海南三亚。</p>
      <p>
        2016.08
        【规划未来组织形式】Teambuilding：帮助企业进行团队建设和稳固，让大家更团结，更好地融合。
      </p>
      <p>
        2016.09
        开启客户关怀计划：通过行业政策解读&节日原创礼物等让客户感受到一整套完善的服务理念和服务体验。为客户提供全方位的服务，在我们职责之外要始终多做百分之五十，让客户感受到我们在这个行业里的专业度。
      </p>
      <p>2017.2.16 Outing-泰国。</p>
      <p>2017.8.26 Outing-青岛。</p>
      <p>
        2017.11
        第一次感恩季活动：开启NORMCORE感恩季活动传统，通过“小天使和小主人”、感恩节及圣诞节一系列活动拉近彼此关系，让NORMCORE成为一个更有温度的团队。
      </p>
      <p>2018.06.22 Outing-日本大阪</p>
      <p>
        2019.04
        新人培训及新人考试上线：基于2.0时代下的月度新人培训体系正式上线，通过相关新人考核帮助新人尽快适应及熟悉公司流程制度及文化。
      </p>
      <p>2019.05.23 Outing-韩国首尔。</p>
      <p>
        2019.6.28
        NORMCORE航海日志创刊号发布：开启NORMCORE企业月刊，展现NORMCORE大事件和NormcoreR风采等，以月刊的形式发刊，为小伙伴们带来NC最新资讯和诺锞人的风采。
      </p>
      <p>
        2019.07
        NORMCORE全新办公室投入使用：NORMCORE全新装修的办公室正式投入使用，提供大家一个更优质更温馨的办公环境，<span
          class="active"
          >公司运营也正式步入2.0时代。</span
        >
      </p>
      <p>
        2019.08
        NORMCORE大师兄上线：大师兄组织将帮助每一个来到NORMCORE的新人快速融入集体，帮助TA感受到企业文化、制度和人文关怀。
      </p>
      <p>
        2020.02
        开展“百团大战”社团活动：在“云上班“的居家远程办公期间举办云上社团活动，让大家虽然在各自的家里也依旧交流亲密。
      </p>
      <p>
        2020.04
        NCC积分系统正式登陆Excalibur：积分系统让每一个活动都串联在一起，让每一个参与的同学都能有所激励和记录。
      </p>
      <p>2020.08 公益义卖活动：开展公益义卖活动，为社会贡献一份力。</p>
      <p>
        2020.08
        流动图书馆成立：成立NORMCORE流动图书馆，让大家通过捐书、阅读和学习彼此交流。
      </p>
      <p>
        2020.08
        ”邋遢大王与花仙子“月度评选活动上线：在2.0运营模式下，让每一位同学发挥主人翁精神，共同维护良好的办公环境。
      </p>
      <p>
        2020.12
        硬核少年团评选S1开启：硬核少年练习生们和他们的“经纪人”们开启自己的出道竞演，由所有NormreR共同参与送心目中的硬核少年成团出道。
      </p>
      <h4>4. 专业知识积累</h4>
      <p>2015.04 公司第一次培训：（在红坊）为创建NCC奠定了基础。</p>
      <p>
        2015.06
        肯德基可以吃的咖啡杯项目入选微信朋友圈广告案例：对我们创意执行表现上的肯定，书写了公司在创意里程碑里重要的一笔。
      </p>
      <p>
        2015.10
        必胜客x易到万圣节活动：锻炼了我们在品牌联合营销的操盘经验，并且总结异业合作方法论，帮助我们在未来成为品牌联合合作的操盘手奠定基础。
      </p>
      <p>
        2016.01
        KOL研究报告：研究出完善并且全面的KOL发展轨迹模型，形成品牌在使用KOL时的方法论，真正意义上指导我们的工作，公司开始形成积累知识点习惯，并且整理成自己的方法论，形成课件，方便大家学习，掌握后运用到实际工作中。
      </p>
      <p>
        2016.04.16 Communication and Project Management Skill Training &
        Sharing：主要针对Account部门，正式推出了Brief
        Sheet，简称PIB。避免鸡同鸭讲。这也为正式开启workshop做提前预热及充分准备，公司的发展，对技能的挑战越来越高，技能的培训，保证企业核心不变的前提下，如何保证大家沟通的这种方式和方法是得以传承。另外公司需要每个人共同努力去传承公司文化和核心理念。
      </p>
      <p>
        2016.11.03
        第一次workshop：开始了对内容的整理，并形成课件。正式推出了IP整合报告、二次元分析报告，我们不断地提出新的理论，不断的进行革新和优化，我们始终相信没有不变的东西，凡事都是变化的。
      </p>
      <p>
        2018.1 成立企业大学：迎来了2.0时代。启动2.0项目，<span class="active"
          >人才成长计划升级为2.0时代</span
        >
      </p>
      <p>
        2019.1.17
        NCC学院课程第一堂系列课程开讲：OGSM、金字塔原理及MECE、ICCE作为NORMCORE核心理论在全公司作为必修课推广，每一位NormcoreR通过学习和实践具备优秀的逻辑思考力、掌握高效工作的方法和技能。
      </p>
      <p>
        2019.08
        诺锞企业大学三大学院正式成立：通过三大学院的同学共同设计的院徽出炉，诺锞企业大学三大学院正式成立，正式开启学院体系化学习模式。
      </p>
      <p>
        2019.08
        NCC发布COMPASS理论：基于诺锞三板斧基础上发布COMPASS理论，帮助大家对行业和业务有更深的洞察理解和运用。
      </p>
      <p>
          2020.08 NCC发布PICCEM：NCC自主研发的核心黑科技课程理论，通过锚定问题 -
      提炼洞察 - 聚焦概念 - 爆点创意 - 完美执行 -
      复盘优化，提升人才和团队创作力。
      </p>
    </div>
  </div>
</template>

<script type="text/jsx">
export default {
  name: "brief-common",
  props: {
    activeFilter: {
      type: Number,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
.brief-info-common {
  overflow: hidden;
  .title {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    position: relative;
    text-align: center;
    margin-bottom: 24px;
    > div {
      &:first-child {
        display: inline-block;
        font-size: 40px;
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        color: #2d8ef8;
        // line-height: 48px;
        padding-bottom: 20px;
        border-bottom: 3px solid #2d8ef8;
      }
      &:last-child {
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%);
        background-color: #fff;
      }
    }
  }
  h4 {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
    margin-top: 20px;
  }
  p {
    margin-top: 12px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4c4c4c;
    line-height: 22px;
    text-indent: 2em;
  }
  .split-item {
    display: flex;
    span {
      flex: none;
      // text-indent: ;
    }
    > span:last-child {
      display: inline-flex;
      flex-direction: column;
      text-indent: 0;
    }
    // span:not(:first-child) {
    //   text-indent: 4em;
    // }
  }

  .active {
    color: #2d8ef8;
    text-indent: 0;
  }

  .no-indent {
    text-indent: 0;
  }
}
</style>
