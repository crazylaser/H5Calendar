$(document).ready(function(){
    var nowdate = new Date();
    var d = nowdate.getDate();
    var m = nowdate.getMonth();
    var y = nowdate.getFullYear();

    log = console.log;

    function getuuid(){
        return new Date().getTime();
    }


    function getColor() {
        var listColor = ["#33BCFC", '#2FD6E5', '#BE5FF2', '#FFC62E', '#3FC25F', '#DA346D',   //mindnodepro 配色
            "#CC9999","#FFFF99","#666699","#FF9900","#CCCC99","#CC3399","#99CC00","#3399CC","#999999","#CCCC33","#FF9933","#FFFFCC","#009933","#0099CC","#CCCCCC","#FF6666","#FF6600","#FFFF66","#009966","#CC6633","#FFCC99","#CC6600","#CC0066","#009999","#FFCC33"//常用互联网配色 活泼
        ];
        var color = listColor[Math.floor(Math.random()*listColor.length)];
        return color;
    }


    Date.prototype.Format = function(fmt)
    { //author: meizz
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    };

    var trasformdate_minus8hours = function(arg1){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setHours(newDate.getHours()-8);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };

    var trasformdate = function(arg1){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };

    var trasformdate_add1day = function(arg1){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setHours(newDate.getHours()-8);
        newDate.setDate(newDate.getDate()+1);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };

    var trasformdate_minus1day = function(arg1){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setHours(newDate.getHours()-8);
        newDate.setDate(newDate.getDate()-1);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };

    var trasformdate_add2hours = function(arg1){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setHours(newDate.getHours()-6);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };


    var trasformdate_addMonths = function(arg1,times){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setMonth(newDate.getMonth()+times);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };


    var trasformdate_addDays = function(arg1,times){
        str1 = arg1.split(" ").splice(0,5);
        newDate = new Date(str1);
        newDate.setDate(newDate.getDate()+times);
        return newDate.Format("yyyy-MM-dd hh:mm")
    };


    var events = [];
    t.execute("select id,title,starttime,endtime,allday,isdone,color from calendar",function(results){
        for (var m = 0; m < results.length; m++) {
            //log((results[m].starttime));
            var json1 = {};
            json1.title = results[m].title;
            json1.id = results[m].id;
            json1.color = results[m].color;
            if(results[m].isdone == '1'){
                // 'red' '#FF0000' 'rgb(255,0,0)'
                //json1.backgroundColor = 'white';
                //json1.borderColor = 'gary';
                json1.color = 'lightgray';
                json1.className = 'complete';
                //json1.textColor= 'lightgray'
            }
            if(results[m].allday == "1"){
                //全天事件，长距离事件
                //json1.start = new Date(results[m].startdate.split("-")[0], results[m].startdate.split("-")[1]-1, results[m].startdate.split("-")[2]);
                //json1.end = new Date(results[m].enddate.split("-")[0], results[m].enddate.split("-")[1]-1, results[m].enddate.split("-")[2]);
                json1.start = new Date(results[m].starttime);
                json1.end = new Date(results[m].endtime);
                json1.allDay=true;
            }else{
                //json1.start=new Date(results[m].startdate.split("-")[0], results[m].startdate.split("-")[1]-1, results[m].startdate.split("-")[2],results[m].starttime.split(":")[0],results[m].starttime.split(":")[1]);
                //json1.end=new Date(results[m].enddate.split("-")[0], results[m].enddate.split("-")[1]-1, results[m].enddate.split("-")[2],results[m].endtime.split(":")[0],results[m].endtime.split(":")[1]);
                json1.start = new Date(results[m].starttime);
                json1.end = new Date(results[m].endtime);
                json1.allDay=false
            }
            events.push(json1);
        }

        if($('#calendar').length > 0){
            log(events);
            var $el = $('.dialog');
            $el.hDialog();
            $('.demo0').hDialog({title:'新建事件',height:320,resetForm: false});
            $('.demo1').hDialog({title:'编辑事件',height:320,resetForm: false});

            $('#calendar').fullCalendar({
                //header: {
                //    right: 'month,agendaWeek,agendaDay,listDay,listWeek,listMonth,basicWeek,basicDay,listYear'
                //},

                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'month,agendaWeek,listDay,listWeek'
                },
                views: {
                    agendaWeek: { buttonText: '周视图' },
                    month: { buttonText: '月视图' },
                    listDay: { buttonText: '日计划' },
                    listWeek: { buttonText: '周计划' }
                },
                //locale: "zh-cn",
                //默认日期
                //defaultDate: '2018-03-12',
                //businessHours: true, // display business hours 淡红色禁止拖放
                weekNumbers: true,
                weekNumbersWithinDays: true,
                weekNumberCalculation: 'ISO',
                monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                dayNamesShort:['周日','周一','周二','周三','周四','周五','周六'],
                dayNames:['周日','周一','周二','周三','周四','周五','周六'],
                buttonIcons: true, // show the prev/next text
                defaultView: 'month',
                displayEventTime: true, // don't show the time column in list view
                eventLimit: false, // allow "more" link when too many events
                navLinks: true, // can click day/week names to navigate views
                buttonText:{
                    today:'跳转到当天'
                },
                StartEditable:true,
                editable: true,  //事件是否拖拽更改时间长短
                //事件拖动不透明度
                dragOpacity: {
                    agenda: .5, //agenda视图
                    '':.6 //其他视图
                },
                weekends:true,
                events:events,
                weekMode:"variable",
                //拖动事件
                eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
                    log("eventDropFunction");
                    //console.log(event)
                    //console.log(event.start._d)
                    //console.log(event.start._d.toString())
                    newstart = trasformdate_minus8hours(event.start._d.toString());
                    //console.log(newstart)
                    //endweitrue 全天事件拖动
                    if(event.end == null){
                        //往上拖
                            if(event.allDay){
                                newend = trasformdate_add1day(event.start._d.toString());
                            //往下拖
                            }else{
                                newend =trasformdate_add2hours(event.start._d.toString());
                            }
                        }else{
                            newend = trasformdate_minus8hours(event.end._d.toString());
                        }
                    if(event.allDay){
                        allday = 1;
                    }else{
                        allday = 0;
                    }
                    //不变化为全天时间
                    var sql = "UPDATE calendar SET allday = "+allday+" , starttime ='"+newstart+"',endtime='"+newend+"' WHERE id="+event.id;
                    t.execute(sql);

                    event.start = new Date(newstart);
                    event.end = new Date(newend);
                    //render事件的时间非字符串是date格式
                    $('#calendar').fullCalendar('removeEvents', event.id);
                    $('#calendar').fullCalendar('renderEvent', event); // stick? = true
                },

                eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
                    //项目时间跨度变化事件
                    //log(event)
                    allday=0;
                    if(event.allDay){
                        allday = 1;
                    }
                    //title = event.title
                    newstart = trasformdate_minus8hours(event.start._d.toString());
                    newend = trasformdate_minus8hours(event.end._d.toString());
                    var sql = "UPDATE calendar SET allday = '"+allday+"' , starttime ='"+newstart+"',endtime='"+newend+"' WHERE id="+event.id;
                    //log(sql)
                    t.execute(sql);

                    event.start = new Date(newstart);
                    event.end = new Date(newend);
                    //render事件的时间非字符串是date格式
                    $('#calendar').fullCalendar('removeEvents', event.id);
                    $('#calendar').fullCalendar('renderEvent', event); // stick? = true

                },


                //框选事件
                selectable: true,
                selectHelper: true,  //空白的时候框选显示占位符
                select: function(start, end ,arg1 ,arg2) {
                    newstart = trasformdate_minus8hours(start._d.toString());
                    newend = trasformdate_minus8hours(end._d.toString());
                    //log(newstart);
                    //log(newend);
                    clickmonth = false;
                    log(arg1.target.className);
                    list1 = ["fc-highlight","fc-content-skeleton","fc-conten-skeleton","","fc-day-cnDate","fc-day-top fc-fri fc-other-month fc-future","fc-content-skeleton","fc-day-top fc-sat fc-future","fc-day-number","fc-day-top fc-sun fc-other-month fc-future","fc-day-top fc-thu fc-future","fc-day-cnTerm","fc-day-top fc-sat fc-other-month fc-future","fc-day-top fc-thu fc-other-month fc-future","fc-day-top fc-wed fc-other-month fc-future","fc-day-top fc-fri fc-today",'fc-event-container','fc-day-top fc-tue fc-other-month fc-future','fc-day-top fc-fri fc-future','fc-day-top fc-fri fc-today ','fc-day-top fc-wed fc-future '];
                    if(list1.indexOf(arg1.target.className)>-1){
                        log("点击了月视图");
                        clickmonth = true;
                    }else{
                        log('没有点击月视图');
                    }
                    //log(arg2)
                    $("#titleInput").val("");
                    //判断是否超过一天
                    $("#allDayCheck").prop("checked",true);
                    $("#remberCheck").prop("checked",false);
                    $("#repeat").css("display","none");
                    $("#repeatSelect").css("display","none");
                    $("#startli").css("display","none");
                    $("#endli").css("display","none");
                    var datestr = newstart.split(" ")[0];
                    var dateendstr = newend.split(" ")[0];
                    $("#startTimeInput").val(newstart.split(" ")[1]);
                    $("#endTimeInput").val(newend.split(" ")[1]);
                    $(".demo0").click();
                    var submitclicktag = true;
                    $("#submitBtn").off('click');
                    $("#submitBtn").click(function(e){
                        $("#submitBtn").off('click');  //按回车键调用方法 需将此条写在函数内部
                            //console.log($("#titleInput").val());
                        if(submitclicktag){
                            title = $("#titleInput").val();
                            if($("#titleInput").val() == ''){
                                $.tooltip('日程内容还没写呢...');
                                $("#titleInput").focus();
                                return 0;
                            }

                            if($("#times").val() == '' && $("#remberCheck").get(0).checked && $("#repeatSelect").val() != "rember"){
                                $.tooltip('重复次数还未填写...');
                                $("#titleInput").focus();
                                return 0;
                            }

                            startinputval = $("#startTimeInput").val();
                            endinputval = $("#endTimeInput").val();
                            if(startinputval.length == 4){
                                startinputval = "0"+startinputval
                            }else if(startinputval.length == 1){
                                startinputval = "0"+startinputval+":00"
                            }else if(startinputval.length == 2){
                                startinputval = startinputval+":00"
                            }else if(startinputval.length > 5){
                                $.tooltip('开始时间错误...');
                                $("#startTimeInput").focus();
                                return 0;
                            }

                            if(endinputval.length == 4){
                                endinputval = "0"+endinputval
                            }else if(endinputval.length == 1){
                                endinputval = "0"+endinputval+":00"
                            }else if(endinputval.length == 2){
                                endinputval = endinputval+":00"
                            }else if(endinputval.length > 5){
                                $.tooltip('开始时间错误...');
                                $("#endTimeInput").focus();
                                return 0;
                            }

                            console.log("运行了新建");
                            submitclicktag = false;
                            alldayflag = $("#allDayCheck").get(0).checked;
                            remberflag = $("#remberCheck").get(0).checked;
                            if (alldayflag) {
                                //勾选了整天
                                allDay = 1;
                                if(!clickmonth){
                                    dateendstr =  trasformdate_add1day(end._d.toString()).split(" ")[0];
                                }
                                startinputval = datestr +" 00:00";
                                endinputval = dateendstr+" 00:00";
                            } else {
                                //未勾选整天
                                allDay = 0;
                                if(clickmonth){
                                    dateendstr =  trasformdate_minus1day(end._d.toString()).split(" ")[0];
                                }
                                startinputval = datestr +" "+startinputval;
                                endinputval = dateendstr +" "+endinputval;
                            }
                            var color = getColor();
                            var uuid = getuuid();
                            eventData = {
                                id:uuid,
                                title: title,
                                start: new Date(startinputval),
                                end: new Date(endinputval),
                                allDay: alldayflag,
                                color:color
                            };
                            $('#calendar').fullCalendar('renderEvent', eventData,true); // stick? = true
                            var sql = "INSERT INTO calendar (id,title, starttime, endtime, allday, isdone, color) VALUES ('"+uuid+"','"+title+"', '"+startinputval+"', '"+endinputval+"', "+allDay+", 0, '"+color+"');";
                            t.execute(sql);


                            log("是否重复："+remberflag);
                            log($("#repeatSelect").val());
                            if(remberflag) {
                                //循环次数
                                var times = $("#times").val();
                                //log(times);
                                if ($("#repeatSelect").val() == "month") {
                                    for (var i = 1; i < times; i++) {
                                        repeatStart = trasformdate_addMonths(startinputval, i);
                                        repeatEnd = trasformdate_addMonths(endinputval, i);
                                        log("第" + i + "次循环");
                                        log(repeatStart);
                                        sql = "INSERT INTO calendar (id,title, starttime, endtime, allday, isdone, color) VALUES ('" + getuuid() + "','" + title + "', '" + repeatStart + "', '" + repeatEnd + "', " + allDay + ", 0, '"+color+"');";
                                        t.execute(sql);
                                    }
                                } else if ($("#repeatSelect").val() == "week") {
                                    for (var i = 1; i < times; i++) {
                                        repeatStart = trasformdate_addDays(startinputval, i * 7);
                                        repeatEnd = trasformdate_addDays(endinputval, i * 7);
                                        log("第" + i + "次循环");
                                        log(repeatStart);
                                        sql = "INSERT INTO calendar (id,title, starttime, endtime, allday, isdone, color) VALUES ('" + getuuid() + "','" + title + "', '" + repeatStart + "', '" + repeatEnd + "', " + allDay + ", 0, '"+color+"');";
                                        t.execute(sql);
                                    }
                                } else if ($("#repeatSelect").val() == "day") {
                                    for (var i = 1; i < times; i++) {
                                        repeatStart = trasformdate_addDays(startinputval, i);
                                        repeatEnd = trasformdate_addDays(endinputval, i);
                                        log("第" + i + "次循环");
                                        log(repeatStart);
                                        sql = "INSERT INTO calendar (id,title, starttime, endtime, allday, isdone, color) VALUES ('" + getuuid() + "','" + title + "', '" + repeatStart + "', '" + repeatEnd + "', " + allDay + ", 0, '"+color+"');";
                                        t.execute(sql);
                                    }
                                } else if ($("#repeatSelect").val() == "rember") {
                                    var list1 = [2, 4, 7, 15, 30];
                                    for (i in list1) {
                                        repeatStart = trasformdate_addDays(startinputval,list1[i]-1);
                                        repeatEnd = trasformdate_addDays(endinputval, list1[i]-1);
                                        log(repeatStart);
                                        sql = "INSERT INTO calendar (id,title, starttime, endtime, allday, isdone, color) VALUES ('" + getuuid() + "','" + title + "', '" + repeatStart + "', '" + repeatEnd + "', " + allDay + ", 0, '"+color+"');";
                                        t.execute(sql);
                                    }
                                }
                            }
                            //关闭表单
                            $el.hDialog('close', {box: '#HBox'});
                            setTimeout(function(){submitclicktag = true;},5000);
                        }
                    });
                    $('#calendar').fullCalendar('unselect');
                },

                dayClick: function(date, allDay, jsEvent, view) {
                    //空白处点击添加事件
                    return 0;
                },


                //点击任务修改事件
                eventClick: function(calEvent, jsEvent, view) {
                    //log(calEvent);
                    id = calEvent.id;
                    title = calEvent.title;
                    color = calEvent.color;
                    allDay = calEvent.allDay;
                    $("#repeat").css("display","none");
                    $("#repeatSelect").css("display","none");
                    $("#remberCheck").css("display","none");
                    $("#repeatLable").css("display","none");
                    if(allDay){
                        $("#allDayCheck").prop("checked",true);
                        $("#startli").css("display","none");
                        $("#endli").css("display","none");
                        start = trasformdate_minus8hours(calEvent.start._d.toString());
                        end = trasformdate_minus8hours(calEvent.end._d.toString());
                    }else{
                        $("#allDayCheck").prop("checked",false);
                        $("#startli").css("display","inline-block");
                        $("#endli").css("display","inline-block");
                        start = trasformdate(calEvent.start._d.toString());
                        end = trasformdate(calEvent.end._d.toString());
                    }

                    $("#titleInput").val(title);
                    var datestr = start.split(" ")[0];
                    var dateendstr = end.split(" ")[0];
                    $("#startTimeInput").val(start.split(" ")[1]);
                    $("#endTimeInput").val(end.split(" ")[1]);
                    $(".demo1").click();
                    var submitclicktag = true;
                    $("#submitBtn").click(function(e){
                        $("#submitBtn").off('click');
                        if(submitclicktag) {
                            title = $("#titleInput").val();
                            if($("#titleInput").val() == ''){
                                $.tooltip('日程内容还没写呢...');
                                $("#titleInput").focus();
                                return 0;
                            }
                            startinputval = $("#startTimeInput").val();
                            endinputval = $("#endTimeInput").val();
                            if(startinputval.length == 4){
                                startinputval = "0"+startinputval
                            }else if(startinputval.length == 1){
                                startinputval = "0"+startinputval+":00"
                            }else if(startinputval.length == 2){
                                startinputval = startinputval+":00"
                            }else if(startinputval.length > 5){
                                $.tooltip('开始时间错误...');
                                $("#startTimeInput").focus();
                                return 0;
                            }

                            if(endinputval.length == 4){
                                endinputval = "0"+endinputval
                            }else if(endinputval.length == 1){
                                endinputval = "0"+endinputval+":00"
                            }else if(endinputval.length == 2){
                                endinputval = endinputval+":00"
                            }else if(endinputval.length > 5){
                                $.tooltip('开始时间错误...');
                                $("#endTimeInput").focus();
                                return 0;
                            }

                            submitclicktag = false;
                            console.log("运行了修改");
                            title = $("#titleInput").val();
                            alldayflag = $("#allDayCheck").get(0).checked;
                            if (alldayflag) {
                                allDayinsert = 1;
                                if(allDay){
                                    //全天变全天
                                }else{
                                    //非全天变全天 结束天+1
                                    dateendstr =  trasformdate_add1day(calEvent.end._d.toString()).split(" ")[0];
                                }
                                $("#startTimeInput").val("00:00");
                                startinputval = "00:00";
                                $("#endTimeInput").val("00:00");
                                endinputval = "00:00"
                            } else {
                                if(allDay){
                                    //全天变非全天 结束天-1
                                    dateendstr =  trasformdate_minus1day(calEvent.end._d.toString()).split(" ")[0];
                                }else{
                                    //非全天变非全天
                                }
                                allDayinsert = 0;
                            }
                            start = datestr +" "+startinputval;
                            end = dateendstr +" "+endinputval;
                            var sql = "UPDATE calendar SET title = '" + title + "', allday = " + allDayinsert + " , starttime ='" + start + "',endtime='" + end + "' WHERE id=" + id
                            t.execute(sql);

                            eventData = {
                                id:calEvent.id,
                                title: title,
                                start: new Date(start),
                                end: new Date(end),
                                allDay: alldayflag,
                                color:color
                            };
                            $('#calendar').fullCalendar('removeEvents', calEvent.id);
                            $('#calendar').fullCalendar('renderEvent', eventData); // stick? = true
                            //关闭表单
                            $el.hDialog('close', {box: '#HBox'});
                            setTimeout(function(){submitclicktag = true;},3000);
                        }
                    });
                    $("#completeBtn").click(function(e){
                        //console.log(typeof(calEvent.id) == undefined)
                        //log(calEvent);
                        sql = "UPDATE calendar SET isdone = '1' WHERE id="+calEvent.id;
                        t.execute(sql);
                        calEvent.className='complete';
                        calEvent.color='lightgray';
                        $('#calendar').fullCalendar('removeEvents', calEvent.id);
                        $('#calendar').fullCalendar('renderEvent', calEvent); // stick? = true
                        $el.hDialog('close',{box:'#HBox'});
                    });
                    $("#delBtn").click(function(e){
                        //console.log(typeof(calEvent.id) == undefined)
                        sql = "DELETE FROM calendar WHERE  id="+calEvent.id;
                        t.execute(sql);
                        //$('#calendar').fullCalendar('refetchEvents',calEvent.id);
                        $('#calendar').fullCalendar('removeEvents',calEvent.id);
                        //关闭表单
                        $el.hDialog('close',{box:'#HBox'});
                    });

                }
            });
        }




    });

    $("#allDayCheck").click(function(){
        if ($("#allDayCheck").get(0).checked) {
            //log("勾选了");
            $("#startli").css("display","none");
            $("#endli").css("display","none");
        } else {
            $("#startli").css("display","inline-block");
            $("#endli").css("display","inline-block");
        }
    });

    $("#remberCheck").click(function(){
        if (!$("#remberCheck").get(0).checked) {
            //log("没有勾选隐藏");
            $("#repeat").css("display","none");
            $("#repeatSelect").css("display","none");
        } else {
            $("#repeat").css("display","inline-block");
            $("#repeatSelect").css("display","inline-block");
        }
    })

});