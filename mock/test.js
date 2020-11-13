var Mock = require("mockjs")
var express = require("express")
var router = express.Router();

router.use("/profile",function (req,res) {
    console.log(req.body);
    //调用mock方法模拟数据
    var data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'data': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'activity1': {
                    'acimg':'http://bbs.jooyoo.net/attachment/Mon_0905/24_65548_2835f8eaa933ff6.jpg',
                    'acname':'2020重庆·大足环龙水湖半程马拉松',
                    'acstart':'2020-10-18 09:00:00',
                    'acplace':'重庆市大足龙水湖度假区',
                    'actype':'马拉松',
                    'acmaster':'中国田径协会 重庆市体育局 重庆市大足区人民政府',
                    'acdetail':'龙水湖nb',
                    'acteams':{
                        'namelists':{'name':['我是哥哥','我是弟弟','我是姐姐','我是爸爸']},
                        'team1':{
                            'teamimg':'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg',
                            'teamname':'重庆壁跑团',
                            'crtime':'2020-03-31',
                            'peolimit':'无限制',
                            'ined':'5人',
                            'loading':'进行中'
                        },
                        'team2':{
                            'teamimg':'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=0&spn=0&di=181940&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=2534506313%2C1688529724&os=1097436471%2C408122739&simid=3354786982%2C133358663&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fp7rtwg_z%26e3Bkwthj_z%26e3Bv54AzdH3Ftrw1AzdH3Fwn_89_0c_a8naaaaa8m98bm8d8nmm0cmbanmbm_3r2_z%26e3Bip4s&gsm=1&islist=&querylist=',
                            'teamname':'重庆壁跑团',
                            'crtime':'2020-03-31',
                            'peolimit':'无限制',
                            'ined':'5人',
                            'loading':'进行中'
                        },
                    },
                    'news':[
                        {
                        'id':1,
                        'name':'2020重庆·大足环龙水湖半程马拉松赛 竞赛规程',
                        'time':'2020-03-30 15：51：43',
                        'newsDetail':'在人类的心理状态和性格倾向都能被数值化的未来。所有的感情、欲望、社会病态心理倾向等全部被记录并管理，大众以“好的人生”作为目标，竭力于数值性地实现它'
                        },
                        {
                        'id':2,
                        'name':'2020重庆·大足环龙水湖半程马拉松赛 竞赛规程',
                        'time':'2020-03-30 15：51：43',
                        'newsDetail':'在人类的心理状态和性格倾向都能被数值化的未来。所有的感情、欲望、社会病态心理倾向等全部被记录并管理，大众以“好的人生”作为目标'
                        }
                    ]
                }
            }]
        }
    );
    return res.json(data);
})

module.exports = router;