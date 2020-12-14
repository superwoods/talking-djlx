const MAIN_url = '/talking/djlx/';

// 如果地址有 index
if (/index/.test(window.location.href)) {
	window.location.href = MAIN_url;
}

const cid = [
	// {
	// 	name: '河北雄安新区国际交流合作中心',
	// 	cid: 11224954,
	// 	nid: 11225273,
	// 	nav: true,
	// 	isPage: true,
	// 	isBlank: false
	// },
	{
		name: '新华网独家连线',
		cid: 11230092,
		nid: 11230411,
		nav: true,
		isPage: 1,
	},

	// {
	// 	name: '因公出国（境）',
	// 	cid: 11224956,
	// 	nid: 11225275,
	// 	nav: true,
	// 	isPage: 1,
	// 	child: [
	// 		{
	// 			name: '服务介绍',
	// 			cid: 11224963,
	// 			nid: 11225282,
	// 			nav: true,
	// 			isPage: 0,
	// 			// child: [
	// 			// 	{
	// 			// 		name: '申办因公护照指南',
	// 			// 		cid: 11224965,
	// 			// 		nid: 11225284,
	// 			// 		nav: true,
	// 			// 		isPage: 0,
	// 			// 	}, {
	// 			// 		name: '因公申办签证指南',
	// 			// 		cid: 11224966,
	// 			// 		nid: 11225285,
	// 			// 		nav: true,
	// 			// 		isPage: 0,
	// 			// 	},
	// 			// ]
	// 		}, {
	// 			name: '表格下载',
	// 			cid: 11224964,
	// 			nid: 11225283,
	// 			nav: true,
	// 			isPage: 0,
	// 		}
	// 	]
	// }, {
	// 	name: 'APEC商务旅行卡',
	// 	cid: 11224957,
	// 	nid: 11225276,
	// 	nav: true,
	// 	isPage: true,
	// 	child: [
	// 		{
	// 			name: '简介',
	// 			cid: 11224967,
	// 			nid: 11225286,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '申办指南',
	// 			cid: 11224968,
	// 			nid: 11225287,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '申办答疑',
	// 			cid: 11224969,
	// 			nid: 11225288,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '制式及表格下载',
	// 			cid: 11224970,
	// 			nid: 11225289,
	// 			nav: true,
	// 			isPage: 0,
	// 		},
	// 	]
	// }, {
	// 	name: '邀请外国人来华',
	// 	cid: 11224958,
	// 	nid: 11225277,
	// 	nav: true,
	// 	isPage: true,
	// 	child: [
	// 		{
	// 			name: '非公单位邀请外国人',
	// 			cid: 11224971,
	// 			nid: 11225290,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '个人邀请外国人',
	// 			cid: 11224972,
	// 			nid: 11225291,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '申办答疑',
	// 			cid: 11224973,
	// 			nid: 11225292,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '表格下载',
	// 			cid: 11224974,
	// 			nid: 11225293,
	// 			nav: true,
	// 			isPage: 0,
	// 		},
	// 	]
	// }, {
	// 	name: '领事认证',
	// 	cid: 11224959,
	// 	nid: 11225278,
	// 	nav: true,
	// 	isPage: 1,
	// 	child: [
	// 		{
	// 			name: '服务介绍',
	// 			cid: 11224975,
	// 			nid: 11225294,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '表格下载',
	// 			cid: 11224976,
	// 			nid: 11225295,
	// 			nav: true,
	// 			isPage: 0,
	// 		},
	// 	]
	// }, {
	// 	name: '翻译服务',
	// 	cid: 11224960,
	// 	nid: 11225279,
	// 	nav: true,
	// 	isPage: true,
	// 	child: [
	// 		{
	// 			name: '服务介绍',
	// 			cid: 11224977,
	// 			nid: 11225296,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '翻译报价',
	// 			cid: 11224978,
	// 			nid: 11225297,
	// 			nav: true,
	// 			isPage: 0,
	// 		},
	// 	]
	// }, {
	// 	name: '礼品服务',
	// 	cid: 11224961,
	// 	nid: 11225280,
	// 	nav: true,
	// 	isPage: true,
	// 	child: [
	// 		{
	// 			name: '服务介绍',
	// 			cid: 11224979,
	// 			nid: 11225298,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '礼品推荐',
	// 			cid: 11224980,
	// 			nid: 11225299,
	// 			nav: true,
	// 			isPage: 0,
	// 		},
	// 	]
	// }, {
	// 	name: '服务指南',
	// 	cid: 11224962,
	// 	nid: 11225281,
	// 	nav: true,
	// 	isPage: true,
	// 	child: [
	// 		{
	// 			name: '出国前',
	// 			cid: 11224981,
	// 			nid: 11225300,
	// 			nav: true,
	// 			isPage: 0,
	// 		}, {
	// 			name: '出国中',
	// 			cid: 11224982,
	// 			nid: 11225301,
	// 			nav: true,
	// 			isPage: 0,
	// 		}
	// 	]
	// }
];


if (isDev) {
	cid[0].cid = 11216706;
	// cid[1].cid = 11217530;
	// cid[1].child[0].cid = 11208880;
	// 	cid[2].cid = 11217531;
	// 	cid[2].child[3].cid = 11207721;
	// 	cid[3].cid = 11111888;
	// 	// cid[4].cid = 11208880;
	// 	// cid[5].cid = 11207723;
	// 	// cid[6].cid = 11207721;
	// 	// cid[0].cid = 11207721;
	// 	// cid[1].cid = 11207722;
	// 	// cid[2].cid = 11207723;
	// 	// cid[3].cid = 11208880;
	// 	// cid[4].cid = 11208881;
}
