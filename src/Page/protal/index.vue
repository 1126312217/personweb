<template>
  <div class="portal-content">
    <Banner :bannerList="bannerList"></Banner>
    <Statistical></Statistical>
    <Solution></Solution>
    <Cases></Cases>
    <Boutique></Boutique>
    <Partner></Partner>
  </div>
</template>
<script>
import Banner from "@/components/home/Banner";
import Statistical from "./components/statistical";
import Solution from "./components/solution";
import Cases from "./components/cases";
import Partner from "./components/partner";
import Boutique from "./components/boutique";
// import bannerApi from "@/api/home/bannerApi";
export default {
  components: {
    Banner,
    Statistical,
    Solution,
    Cases,
    Boutique,
    Partner,
  },
  name: "portal",
  data() {
    return {
      bannerList: [
        {
          id: 1,
          imgSrc: require("@/assets/images/portal/banner1.png"),
          title: "工业互联网打破智慧与机器的边界",
          desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
        },
        {
          id: 2,
          imgSrc: require("@/assets/images/portal/banner2.png"),
          title: "工业互联网打破智慧与机器的边界",
          desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
     // this.getBannerData();
    },
    //获取banner数据
   /*  getBannerData() {
      bannerApi.getDictionary({ dictType: 5 }).then((res) => {
        if (res.data && res.data.code == 200) {
          let belongPageId = res.data.data.find(
            (item) => item.dictValue == "门户网站"
          ).id;
          this.getBannerDetail(belongPageId);
        } else {
          this.bannerList = [
            {
              id: 1,
              imgSrc: require("@/assets/images/portal/banner1.png"),
              title: "工业互联网打破智慧与机器的边界",
              desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
            },
            {
              id: 2,
              imgSrc: require("@/assets/images/portal/banner2.png"),
              title: "工业互联网打破智慧与机器的边界",
              desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
            },
          ];
        }
      });
    },
    //获取banner列表
    getBannerDetail(belongPageId) {
      bannerApi
        .getPageId({ belongPageId: belongPageId, pageNo: 1, pageSize: 10 })
        .then((res) => {
          if (
            res.data &&
            res.data.code == 200 &&
            res.data.data.rows.length > 0 &&
            res.data.data.rows[0].status == 1
          ) {
            let rows = res.data.data.rows;
            let _bannerList = [];
            for (let i = 0; i < rows.length; i++) {
              for (let j = 0; j < rows[i].bannerSize; j++) {
                _bannerList.push({
                  desc: rows[i].bannerDescribe,
                  title: rows[i].title,
                  belongPageId: rows[i].belongPageId,
                  id: rows[i].id,
                  imgSrc: rows[i].bannerImg[j],
                  bannerSize: rows[i].bannerSize,
                  status: rows[i].status,
                });
              }
            }
            this.bannerList = _bannerList;
          } else {
            this.bannerList = [
              {
                id: 1,
                imgSrc: require("@/assets/images/portal/banner1.png"),
                title: "工业互联网打破智慧与机器的边界",
                desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
              },
              {
                id: 2,
                imgSrc: require("@/assets/images/portal/banner2.png"),
                title: "工业互联网打破智慧与机器的边界",
                desc: "对人、机、物的全面互联，实现对工业数据全面深度感知、实时传输交换、快速计算处理,从而推动智能控制、运营优化和生产组织方式的变革，形成全新的工业生产制造和服务体系",
              },
            ];
          }
        });
    }, */
  },
};
</script>
<style lang="scss" scoped>
.portal-content {
  min-width: 1200px;
  width: 100%;
  overflow: auto;
  margin: 0 auto 120px;
  ::v-deep .inside .banner-text p {
    color: #ffffff;
  }
}
</style>
