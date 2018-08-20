const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Settings = require('./settings-bill');
const app = express();
let Moment = require('moment')
let moment = Moment()
const sett = Settings();

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helper: {
    'changeDate': function() {
    return moment(this.time).fromNow();
    }
  }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/', function(req, res) {
  let calls = sett.getsetcall();
  let sms = sett.getsetsms();
  let warnings = sett.getWarning();
  let critical = sett.getCritical();

  let grandtotals = sett.getsettotal();
  let calltotals = sett.getcall();
  let smstotals = sett.getsms();

  let color;

  if (critical > 0 && grandtotals >= critical) {
    color = "danger";
  } else if (warnings > 0 && grandtotals >= warnings) {
    color = "warning";

  }

  res.render('home', {
    grandtotals,
    calltotals,
    smstotals,
    calls,
    sms,
    warnings,
    critical,
    color
  });
});

app.post('/settings', function(req, res) {
  let calls = parseFloat(req.body.callCost);
  let sms = parseFloat(req.body.smsCost);
  let warnings = parseFloat(req.body.warningLevel);
  let critical = parseFloat(req.body.criticalLevel);

  sett.settingCalls(calls);
  sett.settingSms(sms);
  sett.settingWarning(warnings);
  sett.settingCritical(critical);
  res.redirect('/');
});

app.post('/action', function(req, res) {
  let action = req.body.actiontype;
  // console.log(action);
  sett.calculateSettings(action);
  res.redirect('/');
});

app.get('/actions', function(req, res) {
  sett.timestamp()
  res.render('actions', {
    actionsArray: sett.actions()
  });
});

app.get('/actions/:type', function(req, res) {
  let actions = req.params.type;
  sett.timestamp()
  res.render('actions', {
    actionsArray: sett.actions(actions)
  });
});

app.get('/reset', function(req, res) {
  sett.reset();
  res.redirect('/');
});

let PORT = process.env.PORT || 3011;
app.listen(PORT, function() {
  console.log("App started on Port", PORT);
});
