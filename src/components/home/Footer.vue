<template>
  <div class="footer-component">
    <div class="footer-text">
      <div class="footer-content">
        <div class="footer-left" v-if="leftList && leftList.length">
          <!-- 类型：0：标题， 1：文字，2：链接， 3：图片，-->
          <ul
            class="footer-left-info"
            v-for="(parentList, index) in leftList"
            :key="index"
            :item="parentList"
          >
            <li :title="parentList.programaName">
              {{ parentList.programaName }}
            </li>
            <li
              :title="childrenList.programaName"
              v-for="(childrenList, index) in parentList.childrenNavigationList"
              :key="index"
              :item="childrenList"
            >
              <span v-if="childrenList.programaType == 1">{{
                childrenList.programaName
              }}</span>
              <a
                :href="childrenList.programaValue"
                target="_blank"
                v-if="
                  childrenList.programaType == 2 && childrenList.programaValue
                "
              >
                {{ childrenList.programaName }}
              </a>
              <span
                style="color: #a3a9b7"
                v-if="
                  childrenList.programaType == 2 && !childrenList.programaValue
                "
              >
                {{ childrenList.programaName }}
              </span>
              <span v-if="childrenList.programaType == 3" class="img-txt"
                ><img
                  referrerpolicy="no-referrer"
                  :src="domain + childrenList.programaValue"
              /></span>
            </li>
          </ul>
        </div>
        <div
          class="footer-right"
          :class="`${centerList && centerList.length === 0 ? 'no-center' : ''}`"
          v-if="rightList.length"
        >
          <ul
            class="footer-right-info"
            v-for="(parentList, index) in rightList"
            :key="index"
            :item="parentList"
          >
            <li :title="parentList.programaName">
              {{ parentList.programaName }}
            </li>
            <li
              :title="childrenList.programaName"
              v-for="(childrenList, index) in parentList.childrenNavigationList"
              :key="index"
              :item="childrenList"
              v-bind:class="{ ftg: childrenList.programaType == 3 }"
            >
              <span
                v-if="childrenList.programaType == 1"
                data-sensors-click
                :track-id="
                  'ClickFooter_' +
                  childrenList.id +
                  '_' +
                  childrenList.programaName
                "
                >{{ childrenList.programaName }}</span
              >
              <a
                :href="childrenList.programaValue"
                target="_blank"
                v-if="
                  childrenList.programaType == 2 && childrenList.programaValue
                "
                data-sensors-click
                :track-id="
                  'ClickFooter_' +
                  childrenList.id +
                  '_' +
                  childrenList.programaName
                "
              >
                {{ childrenList.programaName }}
              </a>
              <span
                style="color: #a3a9b7"
                v-if="
                  childrenList.programaType == 2 && !childrenList.programaValue
                "
              >
                {{ childrenList.programaName }}
              </span>
              <span v-if="childrenList.programaType == 3" class="img-txt"
                ><img
                  referrerpolicy="no-referrer"
                  :src="domain + childrenList.programaValue"
                />
                <p>{{ childrenList.programaName }}</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <p class="copy-txt">
        <span>Copyright © 安徽海螺信息技术工程有限责任公司. </span>
        <span>
          <!-- <a target="_blank" href="https://beian.miit.gov.cn" class='icp-link'><span class="bei-no">京ICP备09083730号-9 </span></a> -->
          <span class="bg bg-icp"></span>
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802031854"
          >
            <span class="bei-no"> 京公网安备 11010802031854号</span>
          </a>
        </span>
      </p>
      <div class="footer-contact">
        本站所有信息未经授权不得转载，转载须注明出处，安徽海螺信息技术工程有限责任公司保留追究法律责任的权利
      </div>
    </div>
  </div>
</template>

<script>
import headApi from "@/api/home/headApi";
export default {
  data() {
    return {
      domain: null, //域名
      centerList: [],
      leftList: [
        {
          id: "e6df4733e7124c9798bc881274d62349",
          programaPosition: "0",
          programaType: "0",
          programaCode: "e6df4733e7124c9798bc881274d62349",
          parentCode: "",
          programaName: "通用链接",
          programaSort: 1,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "fef3e342820c4053a06e56f0f5717980",
              programaPosition: "0",
              programaType: "1",
              programaCode: "fef3e342820c4053a06e56f0f5717980",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "政府机构",
              programaSort: 1,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "7fcf5607611c419492ffa76a20b7d56f",
              programaPosition: "0",
              programaType: "2",
              programaCode: "7fcf5607611c419492ffa76a20b7d56f",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "安徽省人民政府网站",
              programaSort: 2,
              programaValue: "https://www.ah.gov.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "b8dda2bdc8a3400d802c85adb6bd43ad",
              programaPosition: "0",
              programaType: "2",
              programaCode: "b8dda2bdc8a3400d802c85adb6bd43ad",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "安徽省国资委网站",
              programaSort: 3,
              programaValue: "http://gzw.ah.gov.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "accad5ba53f14d338ab8a0a9aeef8363",
              programaPosition: "0",
              programaType: "2",
              programaCode: "accad5ba53f14d338ab8a0a9aeef8363",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "中国建筑材料联合会",
              programaSort: 4,
              programaValue: "https://www.ccement.com/zhuanti/jclhh/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "55581c93be9646c097977e909f9a32bc",
              programaPosition: "0",
              programaType: "2",
              programaCode: "55581c93be9646c097977e909f9a32bc",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "芜湖市人民政府网站",
              programaSort: 5,
              programaValue: "https://www.wuhu.gov.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "6987f357ccf54bf18a964eda0aa00d1d",
              programaPosition: "0",
              programaType: "1",
              programaCode: "6987f357ccf54bf18a964eda0aa00d1d",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "内部平台",
              programaSort: 5,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "a6ba08e61f9d4b85a21155cc6cb85a92",
              programaPosition: "0",
              programaType: "2",
              programaCode: "a6ba08e61f9d4b85a21155cc6cb85a92",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "海螺集团协调办公系统",
              programaSort: 6,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "e8cea3268156457a9b5b7b04cd4603cb",
              programaPosition: "0",
              programaType: "2",
              programaCode: "e8cea3268156457a9b5b7b04cd4603cb",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "海螺人力资源管理系统",
              programaSort: 7,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "0d7ae66d3a3d4662bb2d9304af532cb9",
              programaPosition: "0",
              programaType: "2",
              programaCode: "0d7ae66d3a3d4662bb2d9304af532cb9",
              parentCode: "e6df4733e7124c9798bc881274d62349",
              programaName: "海螺型材协调办公系统",
              programaSort: 8,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
      ],
      rightList: [
        {
          id: "80aad05d1724433997833956f09017f9",
          programaPosition: "1",
          programaType: "0",
          programaCode: "80aad05d1724433997833956f09017f9",
          parentCode: "",
          programaName: "相关企业",
          programaSort: 1,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "851271ba558d4b0a97f879f96a45bb1e",
              programaPosition: "1",
              programaType: "2",
              programaCode: "851271ba558d4b0a97f879f96a45bb1e",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "中国海螺创业控股有限公司",
              programaSort: 1,
              programaValue: "http://www.conchventure.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "c2acc5fba09d46ca9d56d9116eea520a",
              programaPosition: "1",
              programaType: "2",
              programaCode: "c2acc5fba09d46ca9d56d9116eea520a",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "海螺控股",
              programaSort: 2,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "f22ab5f1b8a44d04b65a5355fcec11c3",
              programaPosition: "1",
              programaType: "2",
              programaCode: "f22ab5f1b8a44d04b65a5355fcec11c3",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "海螺信息",
              programaSort: 3,
              programaValue: "http://www.conchit.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "8739ff476ac04980b966c05901301493",
              programaPosition: "1",
              programaType: "2",
              programaCode: "8739ff476ac04980b966c05901301493",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "省投资集团",
              programaSort: 4,
              programaValue: "http://www.ahinv.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "a5ce3e581ad7450e9db0dfe6567d9932",
              programaPosition: "1",
              programaType: "2",
              programaCode: "a5ce3e581ad7450e9db0dfe6567d9932",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "芜湖海螺医院",
              programaSort: 5,
              programaValue: "http://hospital.conch.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "4cd57cd35bf24d33afb904c91b42221a",
              programaPosition: "1",
              programaType: "2",
              programaCode: "4cd57cd35bf24d33afb904c91b42221a",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "马钢集团",
              programaSort: 6,
              programaValue: "http://www.magang.com.cn/index.xhtml",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "dbfe67afab554a188c885819e56ab2c9",
              programaPosition: "1",
              programaType: "2",
              programaCode: "dbfe67afab554a188c885819e56ab2c9",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "铜陵有色集团",
              programaSort: 7,
              programaValue: "http://www.tnmg.com.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "e032568c4b9d4a668fcdd30e6c2d824e",
              programaPosition: "1",
              programaType: "2",
              programaCode: "e032568c4b9d4a668fcdd30e6c2d824e",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "淮北矿业集团",
              programaSort: 8,
              programaValue: "http://www.hbcoal.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "956bb068456b4375b8af1897f3445a6e",
              programaPosition: "1",
              programaType: "2",
              programaCode: "956bb068456b4375b8af1897f3445a6e",
              parentCode: "80aad05d1724433997833956f09017f9",
              programaName: "淮南矿业集团",
              programaSort: 9,
              programaValue: "http://www.hnmine.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
        {
          id: "80c7f496e48d4673a7fb30bb74f05cec",
          programaPosition: "1",
          programaType: "0",
          programaCode: "80c7f496e48d4673a7fb30bb74f05cec",
          parentCode: "",
          programaName: "相关媒体",
          programaSort: 2,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "454d7106c250483ab889bd953e540e92",
              programaPosition: "1",
              programaType: "2",
              programaCode: "454d7106c250483ab889bd953e540e92",
              parentCode: "80c7f496e48d4673a7fb30bb74f05cec",
              programaName: "人民网",
              programaSort: 1,
              programaValue: "http://www.people.com.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "f356a6fe399740649c69a1cd6f8c9f6f",
              programaPosition: "1",
              programaType: "2",
              programaCode: "f356a6fe399740649c69a1cd6f8c9f6f",
              parentCode: "80c7f496e48d4673a7fb30bb74f05cec",
              programaName: "中安在线",
              programaSort: 2,
              programaValue: "http://www.anhuinews.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "2651dca13dfe421cadb874ae94fb56ab",
              programaPosition: "1",
              programaType: "2",
              programaCode: "2651dca13dfe421cadb874ae94fb56ab",
              parentCode: "80c7f496e48d4673a7fb30bb74f05cec",
              programaName: "新华网",
              programaSort: 3,
              programaValue: "http://www.xinhuanet.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "e04449a3b5724902a7988baa4a9116a4",
              programaPosition: "1",
              programaType: "2",
              programaCode: "e04449a3b5724902a7988baa4a9116a4",
              parentCode: "80c7f496e48d4673a7fb30bb74f05cec",
              programaName: "中国水泥网",
              programaSort: 4,
              programaValue: "https://www.ccement.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "6aa8277ae9dd450eb74793416753148e",
              programaPosition: "1",
              programaType: "2",
              programaCode: "6aa8277ae9dd450eb74793416753148e",
              parentCode: "80c7f496e48d4673a7fb30bb74f05cec",
              programaName: "数字水泥网",
              programaSort: 5,
              programaValue: "http://www.dcement.cn/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
        {
          id: "83721214c94347049862f759561c660f",
          programaPosition: "1",
          programaType: "0",
          programaCode: "83721214c94347049862f759561c660f",
          parentCode: "",
          programaName: "服务支持",
          programaSort: 3,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "0fd06049d33e436c942d84bc4507d240",
              programaPosition: "1",
              programaType: "2",
              programaCode: "0fd06049d33e436c942d84bc4507d240",
              parentCode: "83721214c94347049862f759561c660f",
              programaName: "用户协议",
              programaSort: 1,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "bc031b04b2e547d1996ef74bbee9a663",
              programaPosition: "1",
              programaType: "2",
              programaCode: "bc031b04b2e547d1996ef74bbee9a663",
              parentCode: "83721214c94347049862f759561c660f",
              programaName: "法律条款",
              programaSort: 2,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
        {
          id: "f615f87e92294712a10579df8f37de4c",
          programaPosition: "1",
          programaType: "0",
          programaCode: "f615f87e92294712a10579df8f37de4c",
          parentCode: "",
          programaName: "关于我们",
          programaSort: 4,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "4a33b63e372746dfbc82852cd7048516",
              programaPosition: "1",
              programaType: "2",
              programaCode: "4a33b63e372746dfbc82852cd7048516",
              parentCode: "f615f87e92294712a10579df8f37de4c",
              programaName: "品牌介绍",
              programaSort: 1,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "061cf50414c9497e9278602ef47e868e",
              programaPosition: "1",
              programaType: "2",
              programaCode: "061cf50414c9497e9278602ef47e868e",
              parentCode: "f615f87e92294712a10579df8f37de4c",
              programaName: "企业荣誉",
              programaSort: 2,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "66d57c6a507142ee829dd9756812dcc7",
              programaPosition: "1",
              programaType: "2",
              programaCode: "66d57c6a507142ee829dd9756812dcc7",
              parentCode: "f615f87e92294712a10579df8f37de4c",
              programaName: "资讯中心",
              programaSort: 3,
              programaValue: "http://yungongplat.com/",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
        {
          id: "9d205a406ad946ac89f854fcedf4671a",
          programaPosition: "1",
          programaType: "0",
          programaCode: "9d205a406ad946ac89f854fcedf4671a",
          parentCode: "",
          programaName: "联系我们",
          programaSort: 5,
          programaValue: "",
          delStatus: "0",
          websiteCode: null,
          websiteFootCode: null,
          childrenNavigationList: [
            {
              id: "d96b12273ad64063b8f772e12ce9c860",
              programaPosition: "1",
              programaType: "1",
              programaCode: "d96b12273ad64063b8f772e12ce9c860",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "地点:安徽省芜湖市镜湖区文化路39号",
              programaSort: 1,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "9be382e3a1974c53b4dcbe2c347cc2a8",
              programaPosition: "1",
              programaType: "1",
              programaCode: "9be382e3a1974c53b4dcbe2c347cc2a8",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "电话:0553-8399432(销售)8399502(办公室)",
              programaSort: 2,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "c6cd9b6303b44407a0a57f1a1dc7bba5",
              programaPosition: "1",
              programaType: "1",
              programaCode: "c6cd9b6303b44407a0a57f1a1dc7bba5",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "传真:0553-8398205",
              programaSort: 3,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "941238f991d247e8baa9380fbe0f01c2",
              programaPosition: "1",
              programaType: "1",
              programaCode: "941238f991d247e8baa9380fbe0f01c2",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "邮箱：Auto@chinaconch.com",
              programaSort: 4,
              programaValue: "",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "c50fb28b261b4f82937f698ed2f17c7e",
              programaPosition: "1",
              programaType: "3",
              programaCode: "c50fb28b261b4f82937f698ed2f17c7e",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "海螺集团官网",
              programaSort: 5,
              programaValue:
                "api/common/dfs/preview?fileId=c87e24e4c5e949f48342fe5acbe2b267",
              //programaValue:"http://www.chinaconch.com/conch/resource/cms/2016/04/2016042916573525539.jpg",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
            {
              id: "fc9e042cfe3b405c9d6747ae36ce4afd",
              programaPosition: "1",
              programaType: "3",
              programaCode: "fc9e042cfe3b405c9d6747ae36ce4afd",
              parentCode: "9d205a406ad946ac89f854fcedf4671a",
              programaName: "微信公众号",
              programaSort: 6,
              //programaValue:"http://www.chinaconch.com/conch/resource/cms/2016/04/2016042916443187327.jpg",
              programaValue:
                "api/common/dfs/preview?fileId=c72d43b411e7455898c86f3b3db0a6ad",
              delStatus: "0",
              websiteCode: null,
              websiteFootCode: null,
              childrenNavigationList: null,
            },
          ],
        },
      ],
    };
  },
  created() {
    if (process.env.NODE_ENV === "development") {
      this.domain = "http://yungongplat.com/";
    }
    if (process.env.NODE_ENV === "production") {
      this.queryFootNav();
      //获取当前域名
      this.domain = "http://" + window.location.host + "/";
    }
  },
  methods: {
    queryFootNav() {
      headApi.getFootNav().then((res) => {
        if (res && res.result) {
          this.leftList = res.obj.left;
          this.rightList = res.obj.right;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-component {
  font-size: 16px;
  .bg-icp {
     vertical-align: sub;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url(https://cloudbroker-dev-test.obs.cn-north-4.myhuaweicloud.com/images/obs-img/home/css_sprites.png) -184px -86px;
  }
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  .ftg {
    float: left;
    font-size: 14px;
    margin-top: 30px;
  }
  .ftg:last-child {
    margin-left: 55px;
  }
  .img-txt {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 90px;
    }
  }
  .footer-text {
    width: 100%;
    height: auto !important;
    border-bottom: 1px solid #3e4860;
    background: #212a40;
  }
  .footer-content {
    width: 1200px;
    padding: 48px 0 84px;
    margin: 0 auto;
    display: flex;

    .footer-left {
      // border-right: 1px solid #3e4860;
      &.no-center {
        /*padding-right: 166px;*/
      }
      .footer-left-info li {
        padding-bottom: 20px;
        color: #ffffff;
        max-width: 380px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .footer-left-info li a,
      .footer-left-info li span {
        font-size: 14px;
        color: #a3a9b7;
        line-height: 24px;
        text-decoration: none;
      }
      .footer-left-info li a:hover {
        cursor: pointer;
        color: #ffffff;
      }
      .footer-left-info li span {
        color: #ffffff;
      }
    }
    .sqrcode {
      padding-right: 80px;
      text-align: center;
      .img-txt {
        img {
          width: 100px;
        }
        margin-bottom: 6px;
      }
      .text {
        font-size: 12px;
        color: #ffffff;
        line-height: 20px;
        text-decoration: none;
      }
    }
    .footer-center {
      padding-right: 80px;
      text-align: center;
      // .footer-left-info .center-li {
      //   padding: 3px 0;
      // }
      .footer-left-info li:first-child {
        color: #fff;
        margin-bottom: 6px;
      }
      .footer-left-info li a,
      .footer-left-info li span {
        font-size: 12px;
        color: #a3a9b7;
        line-height: 20px;
        // margin-bottom: 6px;
        text-decoration: none;
      }
      .img-txt img {
        width: 100px;
        height: 100px;
      }
    }
    .footer-right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .footer-right-info li {
        white-space: nowrap;
        /* max-width: 128px; */
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .footer-right-info li:first-child {
        color: #fff;
        line-height: 24px;
        margin-bottom: 20px;
      }
      .footer-right-info li a,
      .footer-right-info li span {
        font-size: 14px;
        color: #a3a9b7;
        line-height: 30px;
        text-decoration: none;
        white-space: nowrap;
        max-width: 128px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .footer-right-info {
        float: left;
        // margin-right: 100px;

        &:first-child {
          margin-left: 112px;
        }
        &:last-child {
          margin-right: 0;
        }

        li:hover a {
          color: #fff;
        }
      }
      &.no-center {
        .footer-right-info {
          // margin-right: 120px;
          &:first-child {
            margin-left: 120px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .footer-contact {
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
    color: #6d7383;
    padding-top: 0;
    padding-bottom: 10px;
  }
  .bei-no {
    transition: color 0.2s ease-out;
  }
  .bei-no:hover {
    color: #fff;
  }
  .footer-copyright {
    width: 100%;
    background: #212a40;
    .copy-txt {
      height: 40px;
      line-height: 40px;
    }
    p {
      margin: 0 auto;
      text-align: center;
      font-size: 12px;
      color: #6d7383;
    }
    a {
      color: #6d7383;
    }
    .icp-link {
      margin: 0 8px;
    }
    .bg-icp {
      vertical-align: sub;
    }
  }
}
</style>
