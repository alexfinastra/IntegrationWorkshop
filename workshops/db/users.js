var records = [
    { id: 1, username: 'alex', password: '1', displayName: 'Alex', emails: [ { value: 'alexander.perman@finastra.com' } ], workshopIndex: 'gpp_integration _workshop_ca_cib_5_8_march_ 2018' }
    { id: 1, username: 'arnab', password: '1', displayName: 'Alex', emails: [ { value: 'alexander.perman@finastra.com' } ], workshopIndex: 'gpp_integration _workshop_ca_cib_5_8_march_ 2018' }
  , { id: 2, username: 'admin', password: 'admin', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ], workshopIndex: 'gpp_integration _workshop'  }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    console.log("Username : " + username);
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
