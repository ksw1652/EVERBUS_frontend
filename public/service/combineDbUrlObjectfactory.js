/**
 * Created by kimsungwoo on 15. 7. 13..
 */
angular.module('globus.service')
    .factory('combimeDbUrlObject',[function(){
        var data = {};
        return {
            combine_object : function(getdbObject, geturlStationobject){
                if(getdbObject[0].citycd == 508 ) {
                    for(var i in getdbObject) {
                        for (var j in geturlStationobject) {
                            if(getdbObject[i].routeid == geturlStationobject[j].routeid){
                                getdbObject[i].arrive_time = geturlStationobject[j].arrive_time;
                                getdbObject[i].cur_pos = geturlStationobject[j].cur_pos;
                                geturlStationobject.splice(j, 1);
                            }
                        }
                    }

                    data = getdbObject;

                } else if(getdbObject[0].citycd == 507) {
                    var array = [];
                    for(var i in geturlStationobject) {
                        for (var j in getdbObject) {
                            if(geturlStationobject[i].routeid == getdbObject[j].routeid){


                                var temp = {};

                                temp.routeid = geturlStationobject[i].routeid;
                                temp.routenm = geturlStationobject[i].routenm
                                temp.arrive_time = geturlStationobject[i].arrive_time;
                                temp.curr_pos = geturlStationobject[i].curr_pos;

                                temp.arsid = getdbObject[j].arsid;
                                temp.citycd = getdbObject[j].citycd;
                                temp.latix = getdbObject[j].latix;
                                temp.longy = getdbObject[j].longy;
                                temp.nextstopnm = getdbObject[j].nextstopnm;
                                temp.rid = getdbObject[j].rid;
                                temp.routetype = getdbObject[j].routetype;
                                temp.seq = getdbObject[j].seq;
                                temp.sid = getdbObject[j].sid;
                                temp.stopid = getdbObject[j].stopid;
                                temp.stopnm = getdbObject[j].stopnm;
                                temp.stopsubnm = getdbObject[j].stopsubnm;

                                array.push(temp);
                            }
                        }
                    }

                    data = array;

                } else {
                    for(var i in getdbObject){
                        for(var j in geturlStationobject){
                            if(getdbObject[i].routeid == geturlStationobject[j].routeid  || //arrive_time을 위해 두 배열을 합침
                                getdbObject[i].routenm == geturlStationobject[j].routenm){

                                getdbObject[i].arrive_time = geturlStationobject[j].arrive_time;
                                getdbObject[i].cur_pos = geturlStationobject[j].cur_pos;
                                geturlStationobject.splice(j, 1);
                            }
                        }
                    }
                    data = getdbObject;

                }

                /*if(geturlStationobject.length != 0) { //방어코딩 디비내의 노선 갯수가 실시간 보다 적을 경우 --> 해당 항목 추가
                    for(var i in geturlStationobject){
                        getdbObject.push(geturlStationobject[i]);
                    }
                }*/




            },
            get_combined_object : function(){
                return data;
            }
        }
    }]);
