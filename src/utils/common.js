import Vue from 'vue';
export default {
    install: function(Vue) {
        Vue.prototype.$setMenuActiveIndex = function (index) {
            sessionStorage.setItem("activeIndex", index);
            this.$store && this.$store.commit("setActiveIndex", index);
        }
    },
    toZero: function(num) {
        return num < 10 ? '0' + num : num;
    },
    isValidDate(date) {
        return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
    },
    timeFormat: function(times) {
        var time = new Date(times);
        if(!this.isValidDate(time)) {
            return ''
        }
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.toZero(m) + '-' + this.toZero(d) + ' ' + this.toZero(h) + ':' + this.toZero(mm) + ':' + this.toZero(s);
    },
    // $alert second function
    deleteConfirm: function(message) {
        return Vue.prototype.$alert(
            '<div style="background:#ffffff;font-family: Arial, Helvetica, sans-serif;color:#1c1c1c"><h3 style="font-size:24px;position: relative;top:-10px;left:14px;width:50%;color:#1c1c1c">Warning</h3><div style="min-height:20px;width:100%;display: flex;align-items:center;padding-top:10px;"><img style="width:45px;margin-left: 14px;" src="data:image/png;base64,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"><span style="margin-left:20px;">'+ message +'</span></div></div>',
            {
                dangerouslyUseHTMLString: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }
        )
    }, 
    alertConfirm: function(tittle, msg) {
        return Vue.prototype.$alert(
            '<div style="background:#ffffff;font-family: Arial, Helvetica, sans-serif;color:#1c1c1c"><h3 style="font-size:24px;position: relative;top:-10px;left:14px;width:50%;color:#1c1c1c">'+ tittle +'</h3><div style="min-height:20px;width:100%;display: flex;align-items:center;padding-top:10px;"><img style="width:45px;margin-left: 14px;" src="data:image/png;base64,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"><span style="margin-left:20px;">'+ msg +'</span></div></div>',
            {
                dangerouslyUseHTMLString: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }
        )
    },
    
    alertMessage: function(tittle,message) {
        return Vue.prototype.$alert(
            '<div style="background:#ffffff;font-family: Arial, Helvetica, sans-serif;color:#1c1c1c"><h3 style="font-size:24px;position: relative;top:-10px;left:14px;width:50%;color:#1c1c1c">'+ tittle +'</h3><div style="min-height:20px;width:100%;display: flex;align-items:center;padding-top:10px;"><img style="width:45px;margin-left: 14px;" src="data:image/png;base64,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"><span style="margin-left:20px;max-height:100px;overflow-y:auto;"> '+message+' </span></div></div>',
            {
                dangerouslyUseHTMLString: true,
            }
        )
    },

    alertWarning: function (msg) {
       return Vue.prototype.$message.error(msg);
    },
    // time diff
    timeDiff: function(hadTime) {
        const byTime = [365 * 24 * 60 * 60 * 1000, 30 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
        const unit = ["year", "month", "week", "day", "hour", "minute", "second"];
        let diffTime = new Date().getTime() - new Date(hadTime).getTime();
        if (diffTime < 0) {
            return "error";
        }
        let diffArr = [];
        for (let i = 0; i < byTime.length; i++) {
            if (diffTime < byTime[i]) {
                continue;
            }
            let item = Math.floor(diffTime / byTime[i]);
            diffTime = diffTime % byTime[i];
            if (item > 0) {
                let unitStr = unit[i] + (item > 1 ? "s " : " ")
                diffArr.push(item + " " + unitStr);
            }
            if (diffArr.length >= 1) {
                break;
            }
        }
        return diffArr.join("") + "ago";
    },
    
    milliFormat: function (num) {
        return num && num.toString()
            .replace(/\d+/, function(s){
                 return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
             })
    },
   
    fileLengthFormat: function(total, totalUnit) {
        var format;
        var len = total / (1024.0);
        if (len > 1000) {
            return this.fileLengthFormat(len, ++totalUnit);  
        } else {
            switch (totalUnit) {
                case 1:
                    format = len.toFixed(2) + "KB";
                    break;
                case 2:
                    format = len.toFixed(2) + "MB";
                    break;
                case 3:
                    format = len.toFixed(2) + "GB";
                    break;
                case 4:
                    format = len.toFixed(2) + "TB";
                    break;
            }
            return format;
        }
    }
}