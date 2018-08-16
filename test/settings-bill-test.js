const assert = require('assert');

const Settings = require('../settings-bill');

describe('settings-bill', function() {

  const setting = Settings();

  it('should be able to record calls', function() {
    setting.calculateSettings('call');
    assert.equal(1, setting.actionsFor('call').length);

  });

  it('should be able to record sms', function() {
    setting.calculateSettings('sms');
    assert.equal(1, setting.actionsFor('sms').length);

  });

  it('should be able to record totals', function() {
    setting.calculateSettings('sms', 'call', 'sms', 'call');
    assert.equal(2, setting.actionsFor('sms', 'call', 'sms', 'call').length);

  });
  it('should set callCost, smsCost,criticalLevel and warningLevel ', function() {
    const setting = Settings();

    setting.calculateSettings('call');
    setting.calculateSettings('sms');
    setting.calculateSettings('criticalLevel');
    setting.calculateSettings('warningLevel');

    assert.equal(setting.getWarning(), 20);
    assert.equal(setting.getCritical(), 30);
    assert.equal(setting.getsetsms(), 0.75);
    assert.equal(setting.getsetcall(), 2.75);
  });
  it('should add totalBill for sms and calls ', function() {
    var update = Settings();
    update.calculateSettings('call');
    update.calculateSettings('call');
    update.calculateSettings('call');
    update.calculateSettings('call');
    update.calculateSettings('call');

    update.calculateSettings('sms');
    update.calculateSettings('sms');
    update.calculateSettings('sms');
    update.calculateSettings('sms');
    update.calculateSettings('sms');
    assert.equal(update.getsettotal(), 17.50);
  });
});
