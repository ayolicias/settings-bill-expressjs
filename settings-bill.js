var Moment = require('moment');
let moment = Moment()
module.exports = function Settings() {
  let setcall = 0;
  let setsms = 0;
  let settotal = 0;

  let list = [];

  let callCost = 2.75;
  let smsCost = 0.75;
  let warningLevel = 20;
  let criticalLevel = 30;

  function calculateSettings(settingsItem) {
    if (settingsItem === 'call') {
       setcall += callCost;
       settotal += callCost;
       list.push({
         type: settingsItem,
         cost: settotal,
         time: new Date(),
       });
       if (settotal > criticalLevel) {
         var diff = settotal - criticalLevel;
         setcall -= diff;
         settotal -= diff;
       }
     } else if (settingsItem === 'sms') {
       setsms += smsCost;
       settotal += smsCost;
       list.push({
         type: settingsItem,
         cost: settotal,
         time: new Date(),
       });
       if (settotal > criticalLevel) {
         var diff = settotal - criticalLevel;
         setsms -= diff;
         settotal -= diff;
       }
     }
     settotal = setcall + setsms

   }
 function hasReachcritical(){
   return getsettotal() >= getCritical();
 }

  function actions(type) {

    if (type === undefined) {
      return list;

    } else {
      return list.filter(current => current.type === type);
    }
  }

  function timestamp() {
    // const time = [];
    for (var i = 0; i < list.length; i++) {
      let time = Moment(list[i].time).fromNow()
      list[i].ago = time;
    }
    return list;
  }

  function reset() {
    callCost = 0;
    smsCost = 0;
    warningLevel = 0;
    criticalLevel = 0;
    setcall = 0;
    setsms = 0;
    settotal = 0;
    list = []
  }

  function actionsFor(type) {
    const filteredActions = [];
    for (let index = 0; index < list.length; index++) {
      const actions = list[index];
      if (actions.type === type) {
        filteredActions.push(actions);
      }
    }

    return filteredActions;
  }

  function hasReachcritical() {
    return getsettotal() > getCritical();
  }

  function getsetcall() {
    return callCost;
  }

  function getsetsms() {
    return smsCost;
  }

  function getcall() {
    return setcall.toFixed(2);
  }

  function getsms() {
    return setsms.toFixed(2)
  }

  function gettotal() {
    return settotal.toFixed(2)
  }

  function getsettotal() {
    return settotal.toFixed(2);
  }

  function getWarning() {
    return warningLevel;
  }

  function getCritical() {
    return criticalLevel;
  }

  function settingCalls(num) {
    callCost = parseFloat(num);
  }
  getsettotal

  function settingSms(num) {
    smsCost = parseFloat(num);
  }

  function settingWarning(num) {
    warningLevel = parseFloat(num);
  }

  function settingCritical(num) {
    criticalLevel = parseFloat(num);
  }

  return {
    getcall,
    getsms,
    gettotal,
    getsetcall,
    getsetsms,
    getsettotal,
    settingCalls,
    settingSms,
    settingWarning,
    settingCritical,
    getWarning,
    getCritical,
    hasReachcritical,
    calculateSettings,
    actions,
    actionsFor,
    reset,
    timestamp
  }
}
