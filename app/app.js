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
        url: this.fwm + '/activitiess/?provider=' + provider,
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
        url: this.fwm + '/activitiess/?dov=' + dov,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },


    // Search for a single particpant by ID ----- NEEDS TESTING
    searchById: function (id, token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/participants/'+ id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END ----- Search for a single particpant by ID ----- NEEDS TESTING

    // Search for a single Boat ----- NEEDS TESTING
    searchByBoat: function (title, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/boats/?title=' + title,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- search for a single boat

    // Search participants by Team ---- NEEDS TESTING
    searchByTeam: function (team_name, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/teams/?team_name=' + team_name,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- Search participants by Team

    // Update a participant AJAX call
    updateParticipant: function (id, data, token, callback) {
     debugger;
     this.ajax({
      method: 'PATCH',
      url: this.fwm + '/participants/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
      }, callback);
    },
    // END --- Update a participant AJAX call

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

    deleteParticipant: function (id, token, callback) {
      debugger;
      console.log(id);
      this.ajax({
      method: 'DELETE',
      url: this.fwm + '/participants/'+ id,
      headers: {
          Authorization: 'Token token=' + token
        },
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

    fwmapi.listParticipants(token, participantsTableCB);

    $( '.addParticipant' ).each(function(){
    this.reset();
    });


    $( '.updateParticipant' ).each(function(){
    this.reset();
    });

    $('#participantFormDiv').hide();
    $('#showParticipantUpdate').hide();
    // $('#putActivitiesList').css("display", "block");
    // $('#updateAcivityDiv').css("display", "none");
    // $('#participantFormDiv').css("display", "none");
  };

  var loginCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    token = data.user.token;
    userId = data.user.id;
    // fwmapi.listActivities(token, allActivityCB);
    $('#status').val('you successfully logged in');
    $('.login').css("display", "none");
    $('#activityFormDiv').css("display", "none");
    $('#putActivitiesList').css("display", "block");
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

  // allParticipantCB - callback processes return of participant data &
  // renders it, via handlebars into a table
  var participantsTableCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log('got to Handlebars to  participants table function');
    console.log(data);
    var participantsTemplate = Handlebars.compile($('#participantsList').html());
    var newHTML = participantsTemplate(data);
    $("#participant-body").html(newHTML);
    $('#showParticipants').css("display", "block");
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

  // populate data from an single participant query into a form
  var participantFormCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    $('form').loadJSON(data);
    $('#showParticipantUpdate').css("display", "block");
    $('#status').val('you can now update the participants info');
  };
  // END --- show a single participants info

  // Delete Activity Callback
  var deleteCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    fwmapi.listParticipants(token, participantsTableCB);
    $('#status').val('you successfully deleted the activity');
    $(event.target).parents("tr").remove();
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
    fwmapi.listParticipants(token, participantsTableCB);
  });
  // ----- end of Show All Activities processing ----- //

  // Show Single Activity processing
  $('.getact').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one activity function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $("#searchDiv input[id=actid]").val();
    actId = id;
    console.log("acitivty id is: " + id);
    fwmapi.searchById(id, token, actFormCB);
  });
  // ----- end of Show Single Activity processing ----- //

  /* Show Single Particpant ---
  $('.searchById').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one participant function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $(".updateActivity input[id=actid]").val();
    actId = id;
    console.log("participant id is: " + id);
    fwmapi.listOneActivity(id, token, actFormCB);
  }); */
  // ----- end of Show Single Participant processing ----- //

  // Show Single Activity processing
  /*
  $('#searchById').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one participant function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $("#searchDiv input[id=actid]").val();
    actId = id;
    console.log("acitivty id is: " + id);
    fwmapi.listOneActivity(id, token, actFormCB);
  });
*/
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

  // Show Single Particpant
  $('#searchById').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one participant function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var id = $("#searchDiv input[id=actid]").val();
    // actId = id;
    console.log("participant id is: " + id);
    fwmapi.searchById(id, token, participantFormCB);
  });
  // ----- end of Show Single Participant processing ----- //

  // Show Single Boat processing ------ NEDDS TESTING
  $('#searchByBoat').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one boat function', token);
    // var id = $(".listOneActivity input[id=act-id]").val();
    var boatName = $("#searchDiv input[id=boatid]").val();
    console.log("The boat name is: " + boat);
    fwmapi.searchByBoat(boatName, token, allActivityCB);
  });
  // ----- end of Show Single Boat processing ----- //

  // Search for participants by Team ------ NEDDS TESTING
  $('#searchByTeam').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to search by team_name', token);
    var team_name = $("#searchDiv input[id=teamid]").val();
    console.log("The teams name is: " + team_name);
    fwmapi.searchByTeam(team_name, token, allActivityCB);
  });
  // ----- end of Search for participants by Teams  ----- //

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

  // Update a Participant processing
  $('.updateParticipant').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      participant : {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        role: $('#role').val(),
        boat_id: $('#boat_id').val(),
        team_id: $('#team_id').val(),
      }
    };
    dataForServer.participant.name = $(".updateParticipant input[id=name]").val();
    dataForServer.participant.email = $(".updateParticipant input[id=email]").val();
    dataForServer.participant.phone = $(".updateParticipant input[id=phone]").val();
    dataForServer.participant.role = $(".updateParticipant input[id=role]").val();
    dataForServer.participant.boat_id = $(".updateParticipant input[id=boat_id]").val();
    dataForServer.participant.team_id = $(".addParticipant input[id=team_id]").val();
    var id = $('#participantId').val(); //captuers particicpants id
    fwmapi.updateParticipant(id, dataForServer, token, callback);
  });

  // Delete An Activity processing
  $('.deleteact').on('click', function(e){
    e.preventDefault();
    console.log('got to delete Acivity');
    console.log("acitivty id is: " + actId);
    fwmapi.deleteActivity(actId, token, deleteCB);
  });
  // end of Delete Activity processing

  /*
  $("#participant-body").on("click", function(event){
    debugger;
    var elementId = $(event.target).data("id");
    if(elementId === undefined){
      return;
    }
    if($('a#delete-button').hasClass('deletepart')){
     //append the button
      fwmapi.deleteParticipant(elementId, token, deleteCB);
      } else {
        console.log('edit button was clicked');
        }
  });
  */

  // $("#participant-body").on("click", function(event){
  //   debugger;
  //   var elementId = $(event.target).data("id");
  //   if(elementId === undefined){
  //     return;
  //   }
  //   if($($(this)).hasClass('deletepart')){
  //    //append the button
  //    // fwmapi.deleteParticipant(elementId, token, deleteCB);
  //     console.log('delete button was clicked');
  //     } else {
  //       console.log('edit button was clicked');
  //       }
  // });

  $(document).on("click", "#delete-button", function(event){
    var elementId = $(event.target).data("id");
    fwmapi.deleteParticipant(elementId, token, deleteCB);
    console.log('the participant was deleted');
  });

  $(document).on("click", "#edit-button", function(event){
    var participantId = $(event.target).data("id");
    console.log(participantId);
    fwmapi.searchById(participantId, token, participantFormCB);
  });

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
    e.preventDefault();
    var dataForServer = {
      participant : {
        "name":$("name").val(),
        "email":$("email").val(),
        "phone":$("phone").val(),
        "role":$("role").val(),
        "boat_id":0,
        "team_id":0
      }
    };

    dataForServer.participant.name = $(".addParticipant input[id=name]").val();
    dataForServer.participant.email = $(".addParticipant input[id=email]").val();

    dataForServer.participant.phone = $(".addParticipant input[id=phone]").val();
    dataForServer.participant.role = $(".addParticipant input[id=role]").val();
    dataForServer.participant.boat_id = $(".addParticipant input[id=boat_id]").val();
    dataForServer.participant.team_id = $(".addParticipant input[id=team_id]").val();


    fwmapi.addParticipant(dataForServer, token, callback);
  });
  // ----- end of Create Participant processing ----- //


});
