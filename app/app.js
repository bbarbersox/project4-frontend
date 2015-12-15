"use strict";

// Global variable definitions

var userEmail = "";
var token = "";
var userId = 0;
var dataReturned ={};
var propId = 0;
var actId = 0;

var fwmapi = {
  fwm: 'http://localhost:3000',

  // var fwmapi = {
  //fwm: 'https://glacial-taiga-1244.herokuapp.com/',
  //  fwm: 'http://localhost:3000',

// validation ajax functionality
  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
    },

    // Registration Ajax call
    register: function register(credentials, callback) {
      this.ajax({
        method: 'POST',
        url: this.fwm + '/register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(credentials),
        dataType: 'json',
      }, callback);
      $('#registerDiv').css("display", "none");
      $('#loginDiv').css("display", "block");
    },
    // End of register ajax logic

    // Login Ajax call
    login: function login(credentials, callback) {
      this.ajax({
        method: 'POST',
        url: this.fwm + '/login',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(credentials),
        dataType: 'json',
      }, callback);
      $('#loginDiv').css("display", "none");
      $('#dashboard').css("display", "block");
      $('.listOneActivity').css("display", "block");
      $('.listActivities').css("display", "block");
      $('#activityFormDiv').css("display", "none");
    },
    // End of login ajax logic

    // Logout Ajax logic --- NEEDS TO BE TESTED
    logout: function(id, token,callback) {
      this.ajax({
        method: "DELETE",
        url: this.fwm + "logout" + id,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(),
        dataType: 'json',
      }, callback);
    },
    // End of logout ajax logic
  // end of validation ajax routines

    listActivities: function (token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/activities',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    listParticipants: function (token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/participants',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    listOneActivity: function (id, token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/activities/'+id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    SearchActivityByProvider: function (provider, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/activities/?provider=' + provider,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    SearchActivityByDate: function (dov, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/activities/?dov=' + dov,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    updateActivity: function (id, data, token, callback) {
     this.ajax({
      method: 'PATCH',
      url: this.fwm + '/activities/' + id, // id is the activity id
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
      }, callback);
    },

    addActivity: function (formdata, token, callback) {
      console.log(formdata);
      this.ajax({
        method: 'POST',
        url: this.fwm + '/activities',
        headers: {
          Authorization: 'Token token=' + token
        },
        contentType : 'application/json',
        data: JSON.stringify(formdata),
        dataType: 'json'
      }, callback);
    },

    addParticipant: function (formdata, token, callback) {
      console.log(formdata);
      this.ajax({
        method: 'POST',
        url: this.fwm + '/participants',
        headers: {
          Authorization: 'Token token=' + token
        },
        contentType : 'application/json',
        data: JSON.stringify(formdata),
        dataType: 'json'
      }, callback);
    },


    deleteActivity: function (id, token, callback) {
      console.log(id);
      this.ajax({
      method: 'DELETE',
      url: this.fwm + '/activities/'+ id,
      headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },


    listProperties: function (token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/properties',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    listOneProperty: function (id, token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/properties/'+id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    updateProperty: function (id, data, token, callback) {
      this.ajax({
        method: 'PATCH',
        url: this.fwm + '/properties/' + id, // id is the activity id
        headers: {
          Authorization: 'Token token=' + token
        },
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        dataType: 'json'
      }, callback);
    },

    addProperty: function (formdata, token, callback) {
      this.ajax({
        method: 'POST',
        url: this.fwm + '/properties',
        headers: {
          Authorization: 'Token token=' + token
        },
        contentType : 'application/json',
        data: JSON.stringify(formdata),
        dataType: 'json'
      }, callback);
    },
  };

$(document).ready(function() {
  // logic to take data from a form an put it into an object
  var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
  };
  // END --- logic to take data from a form an put it into an object //

  var wrap = function wrap(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    fwmapi.listActivities(token, allActivityCB);
    $('#status').val('you successfully logged in');
    $('.login').css("display", "none");
    $('#activityFormDiv').css("display", "none");
    $('#putActivitiesList').css("display", "block");
    $('#updateAcivityDiv').css("display", "none");
    $('.getact').css("display", "none");
  };

  var loginCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    fwmapi.listActivities(token, allActivityCB);
    $('#status').val('you successfully logged in');
    $('.login').css("display", "none");
    $('#activityFormDiv').css("display", "none");
    $('#putActivitiesList').css("display", "block");
  };

  var tableCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    var newHTML = propertyList({properties: data.properties});
    $('#allProperties').html(newHTML);
  };


  // allActivityCB - callback processes return of activity data
  var allActivityCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    var activityData = data;
    console.log('got to callback to process all activity data');
    console.log(data);
    $('#putActivitiesList').css("display", "block");
    $('#activityFormDiv').css("display", "none");
    $('#updateAcivityDiv').css("display", "none");
    actHandlebars.displayActivities(data);
  };
  // END --- allActivityCB

   // allParticipantCB - callback processes return of participant data
  var allParticipantsCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log('got to callback to process all participant data');
    console.log(data);
    $('#putParticipantsList').css("display", "block");
    $('#participantFormDiv').css("display", "none");
    $('#updateAcivityDiv').css("display", "none");
    actHandlebars.displayParticipants(data);
  };
  // END --- allParticipantCB


  /////////
  var formCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    // $('form').loadJSON(data);
    // var newHTML = propertyList({properties: data.properties});
    // $('#allProperties').html(newHTML);

    $.each(data, function(i, item) {
      ($('#'+i).val(item));
    });
  };
  /////////

  // populate data from an single activity query into a form
  var actFormCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    $('form').loadJSON(data);
    $('#updateAcivityDiv').css("display", "block");
    $('.getact').css("display", "none");

  };
  // END --- populate a single record of activity data

  // Delete Activity Callback
  var deleteCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    // fwmapi.listActivities(token, allActivityCB);
    $('#status').val('you successfully deleted the activity');
    // $('#result').val(JSON.stringify(data, null, 4));
  };
  // ----- end of Delete processing ----- //

  // If user has not registered this register checkbox will be clicked
  $('.checkbox').on('click', function(e){
    $('#registerDiv').css("display", "block");
    $('.register').css("display", "block");
    $('.login').css("display", "none");
  });  // end of register checkbox processing

  // Register button processing
  $('.register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    fwmapi.register(credentials, callback);
    e.preventDefault();
    });
  // ----- end of Register processing ----- //

  // Login button processing
  $('.login').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      token = data.user.token;
      userId = data.user.id;
    };

    fwmapi.login(credentials, loginCB);
  });
  // ----- end of Login processing ----- //

  // Show All Activities processing
  $('.listActivities').on('click', function(e) {
    e.preventDefault();
    fwmapi.listActivities(token, allActivityCB);
  });
  // ----- end of Show All Activities processing ----- //

  // Show All Activities processing
  $('.listParticipants').on('click', function(e)
    {
      debugger;
    e.preventDefault();
    fwmapi.listParticipants(token, allParticipantsCB);
  });
  // ----- end of Show All Activities processing ----- //

  // Show Single Activity processing
  $('.getact').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one activity function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $(".updateActivity input[id=actid]").val();
    actId = id;
    console.log("acitivty id is: " + id);
    fwmapi.listOneActivity(id, token, actFormCB);
  });
  // ----- end of Show Single Activity processing ----- //

  // Show Single Activity processing
  $('#searchById').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one activity function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $("#searchDiv input[id=actid]").val();
    actId = id;
    console.log("acitivty id is: " + id);
    fwmapi.listOneActivity(id, token, actFormCB);
  });
  // ----- end of Show Single Activity processing ----- //

  // Show Single Activity processing
  $('#searchByProvider').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one activity function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var provider = $("#searchDiv input[id=providerid]").val();
    console.log("The provider is: " + provider);
    fwmapi.SearchActivityByProvider(provider, token, allActivityCB);
  });
  // ----- end of Show Single Activity processing ----- //

   // Search for activities by Date
  $('#searchByDate').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to search by date', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var dateOfVisit = $("#searchDiv input[id=dateid]").val();
    console.log("The date is: " + dateOfVisit);
    fwmapi.SearchActivityByDate(dateOfVisit, token, allActivityCB);
  });
  // ----- end of Search for activities by Date  ----- //

  // Delete An Activity processing
  $('.deleteact').on('click', function(e){
    e.preventDefault();
    // debugger;
    console.log('got to delete Acivity');
    // var actId = $(".addActivity input[id=actid]").val();
    console.log("acitivty id is: " + actId);
    fwmapi.deleteActivity(actId, token, deleteCB);
  });
  // end of Delete Activity processing

  $('#activitytest').on("click", "button", function(event){
    debugger;
    var activityID = $(event.target).data("id");

    console.log("acitivty id is: " + actId);
    fwmapi.deleteActivity(actId, token, deleteCB);
  });

  // Update an Activity processing
  $('.updateActivity').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      activity : {
        name: $('#upName').val(),
        provider: $('#upProvider').val(),
        prono: $('#upProno').val(),
        prostreet: $('#upProstreet').val(),
        procity: $('#upProcity').val(),
        prostate: $('#upProstate').val(),
        zip: $('#upZip').val(),
        dov: $('#upDov').val(),
        tov: $('#upTov').val(),
        length: $('#upLength').val(),
        participant: $('#upParticipant').val()
      }
    };

    var actId = $('#activityId').val(); //captuers activity
    // dataForServer.activity.key = $('#act-field').val();
    // dataForServer[dataForServer.activity.key] = $('#act-value').val();

    fwmapi.updateActivity(actId, dataForServer, token, callback);
  });
  // ----- end of Update Activity processing ----- //

  $('#showActivityForm').on('click', function(e) {
    $('#activityFormDiv').css("display", "block");
    $('#putActivitiesList').css("display", "none");
  });


  $('#showParticipantForm').on('click', function(e) {
    $('#participantFormDiv').css("display", "block");
    $('#putActivitiesList').css("display", "none");
  });

  $('#showSearch').on('click', function(e) {
    $('#activityFormDiv').css("display", "none");
    $('#putActivitiesList').css("display", "none");
    $('#updateAcivityDiv').css("display", "none");
    $('#searchDiv').css("display", "block");
    $('.getact').css("display", "none");
  });

  // Create an Activity processing
  $('.addActivity').on('submit', function(e) {
    var dataForServer = {
      activity : {
        "name":$('#name').val(),
        "provider":$("provider").val(),
        "prono":$("prono").val(),
        "prostreet":$("prostreet").val(),
        "procity":$("procity").val(),
        "prostate":$("prostate").val(),
        "zip":$("zip").val(),
        "dov":$("dov").val(),
        "tov":$("tov").val(),
        "length":$("length").val(),
        "participant":$("participant").val(),
        "user_id":userId
      }
    };

    dataForServer.activity["name"] = $(".addActivity input[id=name]").val();
    dataForServer.activity.provider = $(".addActivity input[id=provider]").val();

    dataForServer.activity.prono = $(".addActivity input[id=proNo]").val();
    dataForServer.activity.prostreet = $(".addActivity input[id=prostreet]").val();
    dataForServer.activity.procity = $(".addActivity input[id=procity]").val();
    dataForServer.activity.prostate = $(".addActivity input[id=prostate]").val();
    dataForServer.activity.zip = $(".addActivity input[id=azip]").val();
    dataForServer.activity.dov = $(".addActivity input[id=dov]").val();
    dataForServer.activity.tov = $(".addActivity input[id=tov]").val();
    dataForServer.activity["length"] = $(".addActivity input[id=length]").val();
    dataForServer.activity.participant = $(".addActivity input[id=participant]").val();
    dataForServer.activity.user_id = userId;

    e.preventDefault();
    fwmapi.addActivity(dataForServer, token, callback);
  });
  // ----- end of Create Activity processing ----- //


  // Create an Participant processing
  $('.addParticipant').on('submit', function(e) {
    debugger;
    var dataForServer = {
      participant : {
        "name":$('#name').val(),
        "email":$("email").val(),
        "phone":$("phone").val(),
        "role":$("role").val(),
        "boat_id":$("boat").val(),
        "team_id":$("team").val()
      }
    };

    dataForServer.participant["name"] = $(".addParticipant input[id=name]").val();
    dataForServer.participant.email = $(".addParticipant input[id=email]").val();

    dataForServer.participant.phone = $(".addParticipant input[id=phone]").val();
    dataForServer.participant.role = $(".addParticipant input[id=role]").val();
    dataForServer.participant.boat_id = $(".addParticipant input[id=boat]").val();
    dataForServer.participant.team_id = $(".addParticipant input[id=team]").val();

    e.preventDefault();
    fwmapi.addParticipant(dataForServer, token, callback);
  });
  // ----- end of Create Participant processing ----- //




  /* Property Management Logic
  $('.listProperties').on('submit', function(e) {
    console.log('got to list properties function', token);
    e.preventDefault();
    fwmapi.listProperties(token, tableCB);
  });

  $('.getprop').on('click', function(e) {
      debugger;
      console.log('got to list one property function', token);
      // var id = $(".listOneActivity input[id=act-id]").val();
      var id = $(".addProperty input[id=propid]").val();
      // var id = 5;
      e.preventDefault();
      fwmapi.listOneProperty(id, token, formCB);
    });

  $('.addProperty').on('submit', function(e) {
    var dataForServer = {
      property : {
        "no":$('#no').val(),
        "street":$('#street').val(),
        "city":$('#city').val(),
        "state":$('#state').val(),
        "zip":$('#zip').val(),
        "house_mgmt_co":$('#house_mgmt_co').val(),
        "manager":$('#manager').val(),
        "user_id":0
      }
    };



    // dataForServer.property.no = $(".addProperty input[id=streetNo]").val();
    // dataForServer.property.street = $(".addProperty input[id=street]").val();
    // dataForServer.property.city = $(".addProperty input[id=city]").val();
    // dataForServer.property.state = $(".addProperty input[id=state]").val();
    // dataForServer.property.zip = $(".addProperty input[id=zipcode]").val();
    // dataForServer.property.house_mgmt_co = $(".addProperty input[id=propertyMgmtCo]").val();
    // dataForServer.property.manager = $(".addProperty input[id=manager]").val();
    // dataForServer.property.user_id = userId;

    console.log('got to add property function', dataForServer);
    e.preventDefault();
    fwmapi.addProperty(dataForServer, token, callback);
  });

  $('.updateprop').on('click', function(e) {
    // var token = $(this).children('[name="token"]').val();
    var dataForServer = {
      property : {
        no: $('#name').val(),
        street: $('#provider').val(),
        city: $('#prono').val(),
        state: $('#prostreet').val(),
        zip: $('#procity').val(),
        house_mgmt_co: $('#prostate').val(),
        ['zip']: $('#zip').val()
      }
    };

    var propId = $('#propid').val(); //captuers activity

    e.preventDefault();
    fwmapi.updateProperty(propId, dataForServer, token, callback);
    });
    END --- Property Management logic */
  // });

});
