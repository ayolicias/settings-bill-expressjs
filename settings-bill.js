module.exports = function Settings() {
  let setcall = 0;
  let setsms = 0;
  let settotal = 0;

  let list = [];

  let callCost =0;
  let smsCost = 0;
  let warningLevel = 0;
  let criticalLevel = 0;

  function calculateSettings(settingsItem) {
    if (settingsItem === 'call') {
      setcall += callCost;
      settotal += callCost;

      list.push({
        type: settingsItem,
        cost: settotal,
        time: new Date()
      });
      if (settotal > criticalLevel) {
        let diff = settotal - criticalLevel;
        setcall -= diff;
        settotal -= diff;
      }
    } else if (settingsItem === 'sms') {
      setsms += smsCost;
      settotal += smsCost;

      list.push({
        type: settingsItem,
        cost: settotal,
        time: new Date()
      });

      if (settotal > criticalLevel) {
        let diff = settotal - criticalLevel;
        setsms -= diff;
        settotal -= diff;
      }
    }
    settotal = setcall + setsms;
  }

  function actions() {
    return list;
  }

  function reset() {
    callCost ;
    smsCost;
    warningLevel= 20;
    criticalLevel = 30;
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
  }getsettotal

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
    reset
  }
}
