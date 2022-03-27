import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'; 
export function dateFormat(date){
  date = new Date(date).toUTCString();
  date = date.split(' ').slice(1, 4).join('-')
  return date;
}

export function totalFormat(value){
  value = parseFloat(value);
  if(isNaN(value)){
    return <span>Rs 0</span>;
  }
  value = value.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  return <span>Rs {value}</span>;
}

export function amountFormat(value){
  value = parseFloat(value);
  if(isNaN(value)){
    return <span>Rs 0</span>;
  }
  value = value.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  return <span>Rs {value}</span>;
}
export function getTimeAgo(getDate) {

    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "Updated less than a minute",
        minute: "Updated a minute",
        minutes: "%d minutes",
        hour: "Updated an hour",
        hours: "Updated %d hours",
        day: "Updated a day",
        days: "Updated %d days",
        month: "Updated a month",
        months: "Updated %d months",
        year: "Updated a year",
        years: "Updated %d years"
    };
    var template = function(t, n) {
      return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function(time) {
        if (!time)
            return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

    return templates.prefix + (
      seconds < 45 && template('seconds', seconds) ||
      seconds < 90 && template('minute', 1) ||
      minutes < 45 && template('minutes', minutes) ||
      minutes < 90 && template('hour', 1) ||
      hours < 24 && template('hours', hours) ||
      hours < 42 && template('day', 1) ||
      days < 30 && template('days', days) ||
      days < 45 && template('month', 1) ||
      days < 365 && template('months', days / 30) ||
      years < 1.5 && template('year', 1) ||
      template('years', years)
      ) + templates.suffix;
    };

    return timer(getDate);

}
export function htmlDecode(str){
  if(str && typeof str === 'string') {
    var element = document.createElement('div');
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }
  return str;
}
export function Decodetohtml(str){
  var str_html = str;
  return <div dangerouslySetInnerHTML = {{__html : str_html }}/>;
}
export function ucwords(str){
  if(str && typeof str === 'string') {
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
  }
  return str;
}

export function toHtml(str){
  var str_html = $("<div/>").html(str).text();
  return <div dangerouslySetInnerHTML = {{__html : str_html }}/>;
}

export function focusDiv(get_ref) {
  window.location.hash = get_ref;
}

export function strtotime(date){
  /*import strtotime from 'locutus/php/datetime/strtotime';
  return strtotime(date);*/
  //require('locutus/php/datetime/strtotime');
  return date;
}

export function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

export function onlyTimeFormat(str){
  var open = str.split(":");
  var hours = open[0];
  var minutes = open[1];
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//make list
//https://jsfiddle.net/justindevs/wgk63o1y/
export function getTimeIntervals(time1, time2, interval) {
  time1 = parseIn(time1);
  time2 = parseIn(time2);

  var arr = [];
  while(time1 < time2){
    arr.push(time1.toTimeString().substring(0,5));
    time1.setMinutes(time1.getMinutes() + interval);
  }
  return arr;
}

//Parse In
export function parseIn(date_time){
  var d = new Date();
  d.setHours(date_time.substring(11,13));
  d.setMinutes(date_time.substring(14,16));

  return d;
}

export function setCityURL(city_name, path){
  var pathname = "/admin/"+path.replace(":city", city_name.toLowerCase());
 // browserHistory.push(pathname);
}

export function changeURL(city_name, keyword){
  var pathname = "/admin/"+city_name.toLowerCase()+"/"+keyword;
  //browserHistory.push(pathname);
}

//title, summary, details, severity, dismissible, autoDismiss, appendToId
export function createAlert(alert_data) {
  //https://codepen.io/codysechelski/pen/dYVwjb?q=alert&limit=all&type=type-pens
  if(alert_data.type == undefined || !alert_data.type){
    alert_data.class = 'success';
  } else {
    alert_data.class = alert_data.type;
  }
  if(alert_data.dismissible == undefined){
    alert_data.dismissible = true;
  }
  if(alert_data.autoDismiss == undefined){
    alert_data.autoDismiss = true;
  }


  var iconMap = {
    info: "fa fa-info-circle",
    success: "fa fa-thumbs-up",
    warning: "fa fa-exclamation-triangle",
    danger: "fa ffa fa-exclamation-circle"
  };

  var iconAdded = false;

  var alertClasses = ["alert", "animated", "flipInX"];
  alertClasses.push("alert-" + alert_data.class.toLowerCase());


  if (alert_data.dismissible != undefined && alert_data.dismissible) {
    alertClasses.push("alert-dismissible");
  }

  var msgIcon = $("<i />", {
    "class": iconMap[alert_data.class] // you need to quote "class" since it's a reserved keyword
  });

  var msg = $("<div />", {
    "class": alertClasses.join(" ") // you need to quote "class" since it's a reserved keyword
  });
  if (alert_data.title) {
    var msgTitle = $("<h4 />", {
      html: alert_data.title
    }).appendTo(msg);

    if(!iconAdded){
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  } else {
    var msgTitle = $("<h4 />", {
      html: 'Success'
    }).appendTo(msg);

    if(!iconAdded){
      msgTitle.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (alert_data.sub_title != undefined && alert_data.sub_title) {
    var msgSummary = $("<strong />", {
      html: alert_data.sub_title
    }).appendTo(msg);

    if(!iconAdded){
      msgSummary.prepend(msgIcon);
      iconAdded = true;
    }
  }

  if (alert_data.message) {
    var msgDetails = $("<p />", {
      html: alert_data.message
    }).appendTo(msg);

    if(!iconAdded){
      msgDetails.prepend(msgIcon);
      iconAdded = true;
    }
  }


  if (alert_data.dismissible) {
    var msgClose = $("<span />", {
      "class": "close", // you need to quote "class" since it's a reserved keyword
      "data-dismiss": "alert",
      html: "<i class='fa fa-times-circle'></i>"
    }).appendTo(msg);
  }

  //$('#' + appendToId).prepend(msg);
  $('#pageMessages').prepend(msg);
  if (alert_data.play_sound != undefined && alert_data.play_sound == true) {
    document.getElementById('sound').play();
  }
  if(alert_data.autoDismiss){
    setTimeout(function(){
      msg.addClass("flipOutX");
      setTimeout(function(){
        msg.remove();
      },1000);
    }, 5000);
  }
}

export function getFullYear() {
  var d = new Date();
  return d.getFullYear();
}

export function formatDateForDifference(date) {
  var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

export function wildcardMatch(sSource, sMatch) {
  var wildcardRight = false;
  if (sMatch.charAt(sMatch.length - 1) == "*"){
    wildcardRight = true;
    sMatch = sMatch.substring(0, sMatch.length - 1);
  }

  if (wildcardRight){
    return (sSource.indexOf(sMatch) == 0);
  } else {
    return sSource == sMatch;
  }
}

export function getTodayString(option) {
  var d = new Date();
  var weekday = new Array(7);
  weekday[0]=  "sunday";
  weekday[1] = "monday";
  weekday[2] = "tuesday";
  weekday[3] = "wednesday";
  weekday[4] = "thursday";
  weekday[5] = "friday";
  weekday[6] = "saturday";
  return weekday[d.getDay()];
}
