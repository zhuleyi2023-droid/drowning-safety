/* 儿童防溺水安全教育H5 - 文案库 */
/* 幼儿友好版：短句、口语化、配语音、形象化按钮 */

const TEXT = {
  home: {
    title: '亲子防溺水安全课堂',
    subtitle: '情景卡牌闯关',
    desc: '从真实事故复盘',
    desc2: '教会孩子避开隐形溺水风险',
    tip: '很多溺水不在深水区、不在野外',
    tip2: '而在家长眼前、在浅水区、在打闹一瞬间',
    slogan: '最好的安全教育，是提前看见危险',
    btnStart: '开始安全闯关',
    footer: '【纯公益免费】基于溺水安全研究总结制作 | 旨在普及家庭水域安全教育'
  },
  loading: {
    text: '正在开启儿童水域安全认知系统…',
    sub: '适合 3–8 岁孩子亲子学习',
    sub2: '无恐怖画面｜温柔科普｜可全家转发'
  },
  rules: {
    title: '游戏规则',
    subtitle: '轻松学安全',
    items: [
      '滑动切换 6 大水场景',
      '选择正确 / 错误行为',
      '答对获得安全小星星',
      '全部通关解锁【安全小卫士证书】'
    ],
    btnStart: '开始学习',
    footer: '守护孩子平安成长'
  },
  gameHeader: '玩水有规则，安全无小事',

  scenes: [
    {
      id: 0, name: '室内游泳馆', image: 'images/scene1.png',
      question: '在游泳馆里，下面哪种做法是对的？',
      wrongBtn: '❌ 追逐打闹', rightBtn: '✅ 安静玩水',
      wrongIcon: '🏃‍♂️💨', rightIcon: '🧘',
      voiceQ: '在游泳馆里，小朋友可以追逐打闹吗？',
      wrong: {
        title: '⚠️ 危险！', icon: '💦',
        content: '泳池边打闹，容易滑倒呛水！',
        content2: '很多溺水就发生在浅水区。',
        voice: '哎呀危险！泳池边打闹会滑倒呛水的，记住哦！',
        ruleTitle: '安全口诀：',
        rules: ['🚫 不跑', '🚫 不推', '🚫 不撞', '👂 听大人的话'],
        voiceRule: '安全口诀：不跑、不推、不撞，听大人的话！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 太棒啦！', icon: '👏',
        content: '安静玩水，不推不撞，',
        content2: '才是保护自己的好宝宝！',
        voice: '太棒啦！安静玩水，不推不撞，才是乖宝宝！',
        star: true, btn: '继续'
      }
    },
    {
      id: 1, name: '泳池岸边通道', image: 'images/scene2.png',
      question: '在泳池岸边，可以奔跑玩水吗？',
      wrongBtn: '❌ 奔跑玩水', rightBtn: '✅ 慢慢走',
      wrongIcon: '🏃', rightIcon: '🐢',
      voiceQ: '在泳池岸边，可以奔跑玩水吗？',
      wrong: {
        title: '⚠️ 危险！', icon: '😰',
        content: '岸边滑溜溜，',
        content2: '摔倒会掉进水里！',
        voice: '危险！岸边滑溜溜，摔倒会掉进水里！',
        ruleTitle: '安全口诀：',
        rules: ['🐢 慢慢走', '🚫 不跑跳', '🚫 不弯腰玩水'],
        voiceRule: '安全口诀：慢慢走，不跑跳，不弯腰玩水！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 对啦！', icon: '👍',
        content: '慢慢走，不跑跳，',
        content2: '你真聪明！',
        voice: '对啦！慢慢走，不跑跳，你真聪明！',
        star: true, btn: '继续'
      }
    },
    {
      id: 2, name: '小区喷泉、景观水池', image: 'images/scene3.png',
      question: '看到喷泉和水池，可以伸手去玩水吗？',
      wrongBtn: '❌ 伸手玩水', rightBtn: '✅ 只看不动',
      wrongIcon: '🖐️💧', rightIcon: '👀',
      voiceQ: '看到喷泉和水池，可以伸手去玩水吗？',
      wrong: {
        title: '⚠️ 不行哦！', icon: '🙅',
        content: '水边青苔滑，',
        content2: '摔倒了会受伤！',
        voice: '不行哦！水边很滑，摔倒了会受伤！',
        ruleTitle: '安全口诀：',
        rules: ['👀 只看', '🚫 不碰', '🚫 不踩', '🚫 不靠近'],
        voiceRule: '安全口诀：只看，不碰，不踩，不靠近！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 真棒！', icon: '🎉',
        content: '只看不动手，',
        content2: '远离才安全！',
        voice: '真棒！只看不动手，远离才安全！',
        star: true, btn: '继续'
      }
    },
    {
      id: 3, name: '野外河流、池塘、水库', image: 'images/scene4.png',
      question: '野外的小河小池塘，可以靠近吗？',
      wrongBtn: '❌ 靠近踩水', rightBtn: '✅ 远远躲开',
      wrongIcon: '🦶💧', rightIcon: '🏃‍♀️💨',
      voiceQ: '野外的小河小池塘，可以靠近吗？',
      wrong: {
        title: '⚠️ 危险！', icon: '😨',
        content: '野外水底有淤泥深坑，',
        content2: '会掉下去的！',
        voice: '危险！野外水底有淤泥深坑，会掉下去的！',
        ruleTitle: '安全口诀：',
        rules: ['🏃 远离', '🚫 不靠近', '🚫 不下水'],
        voiceRule: '安全口诀：远离，不靠近，不下水！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 真聪明！', icon: '🏆',
        content: '野外水域危险，',
        content2: '要远远躲开！',
        voice: '真聪明！野外水域危险，要远远躲开！',
        star: true, btn: '继续'
      }
    },
    {
      id: 4, name: '家里浴室、浴缸', image: 'images/scene5.png',
      question: '洗澡的时候，可以一个人玩水吗？',
      wrongBtn: '❌ 自己玩', rightBtn: '✅ 大人陪着',
      wrongIcon: '🙋‍♂️', rightIcon: '👨‍👩‍👧',
      voiceQ: '洗澡的时候，可以一个人玩水吗？',
      wrong: {
        title: '⚠️ 不行哦！', icon: '🛁',
        content: '浴缸也会溺水，',
        content2: '大人要在身边！',
        voice: '不行哦！浴缸也会溺水，大人要在身边！',
        ruleTitle: '安全口诀：',
        rules: ['👨‍👩‍👧 大人陪着', '🚫 不独自玩'],
        voiceRule: '安全口诀：大人陪着，不独自玩水！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 对啦！', icon: '💖',
        content: '大人陪着才安全，',
        content2: '你真乖！',
        voice: '对啦！大人陪着才安全，你真乖！',
        star: true, btn: '继续'
      }
    },
    {
      id: 5, name: '水上乐园浅滩', image: 'images/scene6.png',
      question: '在水乐园，可以推人泼水疯玩吗？',
      wrongBtn: '❌ 推人疯玩', rightBtn: '✅ 文明玩水',
      wrongIcon: '🤼‍♂️💦', rightIcon: '🤝',
      voiceQ: '在水乐园，可以推人泼水疯玩吗？',
      wrong: {
        title: '⚠️ 危险！', icon: '😱',
        content: '人多推挤会摔倒，',
        content2: '被压在水里！',
        voice: '危险！人多推挤会摔倒，被压在水里！',
        ruleTitle: '安全口诀：',
        rules: ['🚫 不推人', '🚫 不疯跑', '🤝 保持距离'],
        voiceRule: '安全口诀：不推人，不疯跑，保持距离！',
        btn: '我记住了'
      },
      right: {
        title: '🌟 太棒啦！', icon: '🌈',
        content: '文明玩水，保持距离，',
        content2: '真懂事！',
        voice: '太棒啦！文明玩水，保持距离，真懂事！',
        star: true, btn: '继续'
      }
    }
  ],

  rescueScene: {
    name: '小伙伴落水了！',
    question: '看到小伙伴落水了，可以伸手去拉吗？',
    wrongBtn: '❌ 伸手拉人', rightBtn: '✅ 喊大人',
    wrongIcon: '🖐️🌊', rightIcon: '📢👨',
    voiceQ: '看到小伙伴落水了，可以伸手去拉吗？',
    wrong: {
      title: '⚠️ 绝对不行！', icon: '🆘',
      content: '小朋友拉人会被拖下水的！',
      content2: '记住：喊大人！',
      voice: '绝对不行！小朋友拉人会被拖下水的！记住：喊大人！',
      ruleTitle: '救命三句话：',
      rules: ['🙅 不伸手', '📢 大声喊', '🏃 找大人'],
      voiceRule: '救命三句话：不伸手，大声喊，找大人！',
      btn: '我记住了'
    },
    right: {
      title: '🌟 太棒了！', icon: '🦸',
      content: '找大人帮忙，',
      content2: '你学会了最重要的本领！',
      voice: '太棒了！找大人帮忙，你学会了最重要的本领！',
      star: true, btn: '继续'
    }
  },

  /* ===== 快问快答挑战数据 ===== */
  quizChallenge: {
    title: '🎯 终极挑战：安全快问快答',
    subtitle: '判断下面的行为是安全还是危险！',
    desc: '一共6道题，看看你能答对几道！',
    questions: [
      { text: '在泳池边追逐打闹', icon: '🏃‍♂️💨', isSafe: false, voice: '在泳池边追逐打闹，是安全还是危险？' },
      { text: '安静玩水，听大人的话', icon: '🧘', isSafe: true, voice: '安静玩水听大人的话，是安全还是危险？' },
      { text: '在岸边奔跑玩水', icon: '🏃', isSafe: false, voice: '在岸边奔跑玩水，是安全还是危险？' },
      { text: '池边慢慢走', icon: '🐢', isSafe: true, voice: '池边慢慢走，是安全还是危险？' },
      { text: '伸手去摸喷泉的水', icon: '🖐️💧', isSafe: false, voice: '伸手去摸喷泉的水，是安全还是危险？' },
      { text: '景观水池只看不动', icon: '👀', isSafe: true, voice: '景观水池只看不动，是安全还是危险？' },
      { text: '靠近野外小河踩水', icon: '🦶💧', isSafe: false, voice: '靠近野外小河踩水，是安全还是危险？' },
      { text: '主动远离野外水域', icon: '🏃‍♀️💨', isSafe: true, voice: '主动远离野外水域，是安全还是危险？' },
      { text: '洗澡的时候一个人玩', icon: '🙋‍♂️', isSafe: false, voice: '洗澡的时候一个人玩，是安全还是危险？' },
      { text: '大人陪着洗澡玩水', icon: '👨‍👩‍👧', isSafe: true, voice: '大人陪着洗澡玩水，是安全还是危险？' },
      { text: '在水乐园推人泼水', icon: '🤼‍♂️💦', isSafe: false, voice: '在水乐园推人泼水，是安全还是危险？' },
      { text: '文明玩水保持距离', icon: '🤝', isSafe: true, voice: '文明玩水保持距离，是安全还是危险？' }
    ],
    voiceStart: '终极挑战来啦！判断下面的行为是安全还是危险！',
    voiceCorrect: '答对啦！你真厉害！',
    voiceWrong: '答错啦！记住这个安全知识哦！',
    voiceFinish: '挑战完成！你太棒啦！',
    btnSafe: '👍 安全',
    btnDanger: '👎 危险',
    btnNext: '下一题',
    btnFinish: '🏆 领取奖状',
    labelSafe: '✅ 这是安全行为！',
    labelDanger: '⚠️ 这是危险行为！'
  },

  summary: {
    title: '恭喜完成全部水域安全学习！',
    subtitle: '你已掌握：儿童溺水隐形风险规避能力',
    childTitle: '你学会了：',
    childText: '不打闹、不冲撞、不近险、不乱救',
    childText2: '懂得敬畏水域、保护自己，非常棒！',
    parentTitle: '家长必须知道的隐形溺水真相',
    parentTips: [
      { title: '浅水区是儿童重症溺水高发地', desc: '溺水往往不是不会游泳，而是滑倒、被冲撞、失衡呛水。', icon: '🌊' },
      { title: '孩童追逐、推搡、冲撞，是室内泳池最大隐患', desc: '绝大多数家长完全忽略此风险。', icon: '⚠️' },
      { title: '溺水无声、很快发生', desc: '短短几秒即可缺氧窒息，不会大声呼救。', icon: '⏱️' },
      { title: '监护的核心是：视线永不离开', desc: '玩手机、闲聊、转头一秒，都可能造成终身遗憾。', icon: '👀' }
    ],
    rulesTitle: '六大终极安全准则',
    rules: [
      '泳池不跑、不推、不冲撞',
      '池边湿滑，缓步慢行',
      '景观水池、野外水域只看不碰',
      '玩水全程家长紧盯',
      '他人落水不伸手、立刻找大人',
      '不嬉戏疯玩，平稳玩水最安全'
    ],
    slogan: '孩子的平安，不是运气，是日积月累的安全习惯。',
    btnCert: '🏆 领取奖状',
    btnShare: '📤 分享给小伙伴'
  },

  certificate: {
    title: '「儿童水域安全小卫士」认证证书',
    body: '兹证明：',
    body2: '小朋友已完成全部六大水域安全情景学习',
    body3: '掌握室内泳池、水边、野外水域、居家玩水',
    body4: '完整避险规则与应急知识',
    checks: ['不打闹冲撞', '远离危险水域', '正确应对落水险情', '具备合格自我保护意识'],
    footer: '亲子安全教育公益课堂',
    btnSave: '📸 保存奖状到手机'
  },

  share: {
    title: '一场真实事故，总结出的儿童防溺水安全系统',
    content: '很多家长以为：溺水只发生在大河、深水区。',
    content2: '但溺水安全研究告诉我们：最危险的溺水，发生在室内泳池、浅水区、孩子打闹冲撞瞬间。',
    features: ['温柔不吓人', '孩子能听懂', '家长能补盲区', '游戏化轻松学习'],
    call: '建议每位家长带孩子闯关一次，把安全刻进孩子习惯里。',
    slogan: '教育一次，平安一生',
    btnShare: '转发分享｜守护更多孩子'
  },

  shareConfig: {
    title: '亲子安全卡牌闯关',
    desc: '基于溺水安全研究总结，教会孩子避开隐形水域风险，建议每位家长带孩子学习一次。'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TEXT;
}
