"use strict";

// Global variable definitions

var token = "";
var userId = 0;
// var propId = 0;
var actId = 0;

var fwmapi = {
  fwm: 'http://localhost:3000',
  // fwm: 'https://morning-reaches-9856.herokuapp.com',
  // var fwmapi = {

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
      debugger;
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

    // List all the event Participants - AJAX call
    listParticipants: function (token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/participants',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- List all the event Participants - AJAX call

    // Search for a single particpant by ID
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
    // END --- Search for a single particpant by ID

    // Search for a single particpant by ID
    searchByTeamId: function (id, token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/teams/'+ id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- Search for a single particpant by ID

    // Search for a list of particpants by their role
    searchByRole: function (role, token, callback) {
      this.ajax({
        method: 'GET',
        url: this.fwm + '/participants/?role=' + role,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- Search for list of particpants by role

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

    // Search for a single Boat ----- NEEDS TESTING
    searchByBoatId: function (id, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/boats/' + id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- search for a single boat

    // Search for a single Team ----- NEEDS TESTING
    searchByTeamId: function (id, token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/teams/' + id,
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
    // END --- search for a single team

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

    updateBoat: function (id, data, token, callback) {
     this.ajax({
      method: 'PATCH',
      url: this.fwm + '/boats/' + id, // id is the boat id
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
      }, callback);
    },

    addBoat: function (formdata, token, callback) {
      debugger;
      console.log(formdata);
      this.ajax({
        method: 'POST',
        url: this.fwm + '/boats',
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

    addTeam: function (formdata, token, callback) {
      console.log(formdata);
      this.ajax({
        method: 'POST',
        url: this.fwm + '/teams',
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

    listBoats: function (token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/boats',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    listTeams: function (token, callback) {
      debugger;
      this.ajax({
        method: 'GET',
        url: this.fwm + '/teams',
        headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },


    deleteBoat: function (id, token, callback) {
      console.log(id);
      this.ajax({
      method: 'DELETE',
      url: this.fwm + '/boats/'+ id,
      headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },

    deleteTeam: function (id, token, callback) {
      console.log(id);
      this.ajax({
      method: 'DELETE',
      url: this.fwm + '/teams/'+ id,
      headers: {
          Authorization: 'Token token=' + token
        },
        dataType: 'json'
      }, callback);
    },
  };

$(document).ready(function() {

   $('#chooseBoatDiv').hide();

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

    $('.updateParticipant').each(function(){
    this.reset();
    });

    $('.addParticipant').each(function(){
    this.reset();
    });

    $('#participantFormDiv').hide();
    $('#showParticipantUpdate').hide();
  };

  var registerCB = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    $('.text input[name="register"]').prop('checked', true);
    $('.login').show();
    $('#registerDiv').hide();
    $('.register').hide();
    $('#registerDiv').css("display", "none");
    $('.register').css("display", "none");
  };


  var loginCB = function callback(error, data) {
    debugger;
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
    fwmapi.listBoats(token, boatSelectCB);
    fwmapi.listTeams(token, teamSelectCB);
    fwmapi.listTeams(token, teamsTableCB);
    fwmapi.listParticipants(token, participantsTableCB);
    // $('#chooseBoat').trigger('change');
  };


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
    $('#showParticipants').show();
    $('#showBoats').hide();
  };
   // END --- allParticipantCB

   // window.Handlebars.registerHelper('select', function( value, options ){
    //     var $el = $('<select />').html( options.fn(this) );
    //     $el.find('[value="' + value + '"]').attr({'selected':'selected'});
    //     return $el.html();
    // });

   var boatsTableCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log('got to Handlebars to boats table function');
    console.log(data);
    var boatsTemplate = Handlebars.compile($('#boatsList').html());
    var newHTML = boatsTemplate(data);
    $("#boat-body").html(newHTML);
    $('#showParticipants').hide();
    $('#showBoats').show();
  };
   // END --- allParticipantCB

   var teamsTableCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log('got to Handlebars to teams table function');
    console.log(data);
    var teamsTemplate = Handlebars.compile($('#teamsList').html());
    var newHTML = teamsTemplate(data);
    $("#team-body").html(newHTML);
    $('#showTeams').show();
    $('showTeamAdd').hide();
    $('#showTeamUpdate').hide();
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

  // populate data from an single boat query into a form
  var boatFormCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    // $('#result').val(JSON.stringify(data, null, 4));
    $('form').loadJSON(data);
    $('#showBoats').hide();
    $('#showBoatUpdate').show();
    $('#status').val('you can now update the boat info');
  };
  // END --- populate a single record of boat data

  // populate data from an single boat query into a form
  var teamFormCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    // $('#result').val(JSON.stringify(data, null, 4));
    $('form').loadJSON(data);
    $('#showTeams').hide();
    $('#showTeamUpdate').show();
  };
  // END --- populate a single record of team data

  // populate data into a Boat Selector search field
  var boatSelectCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    for (var i = 0; i < data.boats.length; i++) {
      console.log(chooseBoat);
      $('#chooseBoat').append('<option value="' + data.boats[i].id + '">' + data.boats[i].title + '</option>');
      $('#chooseUpdateBoat').append('<option value="' + data.boats[i].id + '">' + data.boats[i].title + '</option>');
    };
  };
  // END --- populate data into a Boat Selector search field

  // populate data into a Team Selector search field
  var teamSelectCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }

    for (var i = 0; i < data.teams.length; i++) {
      console.log(chooseTeam);
      $('#chooseTeam').append('<option value="' + data.teams[i].id + '">' + data.teams[i].team_name + '</option>');
      $('#chooseUpdateTeam').append('<option value="' + data.teams[i].id + '">' + data.teams[i].team_name + '</option>');
    };
  };
  // END --- populate data into a Team Selector search field

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
    $('#chooseBoatDiv').show();
    $('#chooseTeamDiv').show();
    $('#showParticipantUpdate').show();
    $('#showParticipants').hide();
    $('#status').val('you can now update the participants info');
  };
  // END --- show a single participants info

  var addBoatCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
    console.log(data);
    fwmapi.listBoats(token, boatsTableCB);
    $('.addBoat').each(function(){
      this.reset();
    });
    $('.updateBoat').each(function(){
      this.reset();
    });

    $('#showBoatAdd').hide();
    $('#showBoatUpdate').hide();
    // $('#showBoats').show();
  };

  var addTeamCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    console.log(data);
    $('.addTeam').each(function(){
      this.reset();
    });
    $('.updateTeam').each(function(){
      this.reset();
    });

    $('#showTeamAdd').hide();
    $('#showTeamUpdate').hide();
    fwmapi.listTeams(token, teamsTableCB);
    // $('#showBoats').show();
  };

  // var updateBoatCB = function callback(err, data) {

  // };

  // Delete Participant Callback
  var deleteCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    fwmapi.listParticipants(token, participantsTableCB);
    $('#status').val('you successfully deleted the participant');
    $(event.target).parents("tr").remove();
  };
  // ----- end of Delete processing ----- //

  // Delete Boat Callback
  var deleteBoatCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    fwmapi.listBoats(token, boatsTableCB);
    $('#status').val('you successfully deleted the boat');
    // $(event.target).parents("tr").remove();
  };
  // ----- end of Delete Boat processing ----- //

  // Delete Team Callback
  var deleteTeamCB = function callback(error, data) {
    debugger;
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    fwmapi.listTeams(token, teamsTableCB);
  };
  // ----- end of Delete Team processing ----- //

  // If user has not registered this register checkbox will be clicked
  $('.checkbox').on('click', function(e){
    $('#registerDiv').css("display", "block");
    $('.register').css("display", "block");
    $('.login').css("display", "none");
  });  // end of register checkbox processing

  // Register button processing
  $('.register').on('submit', function(e) {
    debugger;
    e.preventDefault();
    var credentials = wrap('credentials', form2object(this));
    fwmapi.register(credentials, registerCB);
    });
  // ----- end of Register processing ----- //

  // Login button processing
  $('.login').on('submit', function(e) {
    e.preventDefault();
    debugger;
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

  // Show All Boats processing
  $('.listBoats').on('click', function(e) {
    e.preventDefault();
    fwmapi.listBoats(token, boatsTableCB);
  });
  // ----- end of Show All Boats processing ----- //

    // Show All Teams processing
  $('.listTeams').on('click', function(e) {
    e.preventDefault();
    fwmapi.listTeams(token, teamsTableCB);
  });
  // ----- end of Show All Teams processing ----- //

  // Show All Particioants processing
  $('.listParticipants').on('click', function(e)
    {
    e.preventDefault();
    fwmapi.listParticipants(token, participantsTableCB);
  });
  // ----- end of Show All Activities processing ----- //

  // Show Single Activity processing
  // $('.getact').on('click', function(e) {
  //   debugger;
  //   e.preventDefault();
  //   console.log('got to list one activity function', token);
  //   // var id = $(".listOneActivity input[id=act-id]").val();
  //   var id = $("#searchDiv input[id=actid]").val();
  //   actId = id;
  //   console.log("acitivty id is: " + id);
  //   fwmapi.searchById(id, token, actFormCB);
  // });
  // ----- end of Show Single Activity processing ----- //


  // Show Single Particpant
  $('#searchById').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one participant function', token);
    var id = $("#searchDiv input[id=participantid]").val();
    console.log("participant id is: " + id);
    fwmapi.searchById(id, token, participantFormCB);
  });
  // ----- end of Show Single Participant processing ----- //

   // Show Single Boat
  // $('#searchByBoatId').on('click', function(e) {
  //   debugger;
  //   e.preventDefault();
  //   console.log('got to list one boat function', token);
  //   var id = $("#showBoatUpdate input[id=boatId]").val();
  //   console.log("boat id is: " + id);
  //   fwmapi.searchByBoatId(id, token, boatFormCB);
  // });
  // ----- end of Show Single Boat processing ----- //

   // Show Single Team
  $('#searchByTeamId').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one team function', token);
    var id = $("#showTeamUpdate input[id=teamId]").val();
    console.log("team id is: " + id);
    fwmapi.searchById(id, token, teamFormCB);
  });
  // ----- end of Show Single Participant processing ----- //

  // Show Particpants by role
  $('#searchByRole').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to search participant by role function', token);
    var role = $("#searchDiv input[id=role]").val();
    console.log("participant search role is: " + role);
    fwmapi.searchByRole(role, token, participantsTableCB);
  });
  // ----- end of Show Participant by role processing ----- //

  // Show Single Boat processing ------ NEDDS TESTING
  $('#searchByBoat').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to list one boat function', token);
    var boatName = $("#searchDiv input[id=boatid]").val();
    console.log("The boat name is: " + boatName);
    fwmapi.searchByBoat(boatName, token, boatsTableCB);
  });
  // ----- end of Show Single Boat processing ----- //

  // Choose a Boat processing
  // $('#chooseBoat').on('change', function(e) {
  //   debugger;
  //   e.preventDefault();
  //   console.log('got to choose a boat function', token);
  //   fwmapi.listBoats(token, boatSelectCB);
  // });
  // ----- end Choose a Boat processing ----- //

  // Choose a Team processing ------ NEDDS TESTING
  // $('#chooseTeam').on('change', function(e) {
  //   debugger;
  //   e.preventDefault();
  //   console.log('got to choose a team function', token);
  //   fwmapi.listTeams(token, teamSelectCB);
  // });
  // ----- end Choose a Team processing ----- //

  // Search for participants by Team ------ NEDDS TESTING
  $('#searchByTeam').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to search by team_name', token);
    var team_name = $("#searchDiv input[id=teamid]").val();
    console.log("The teams name is: " + team_name);
    fwmapi.searchByTeamId(team_name, token, allActivityCB);
  });
  // ----- end of Search for participants by Teams  ----- //

  // Search for activities by Date
  $('#searchByDate').on('click', function(e) {
    debugger;
    e.preventDefault();
    console.log('got to search by date', token);
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
        name: $(".updateParticipant input[id=name]").val(),
        email: $(".updateParticipant input[id=email]").val(),
        phone: $(".updateParticipant input[id=phone]").val(),
        role: $(".updateParticipant input[id=role]").val(),
        boat_id: $("#chooseUpdateBoat").val(),
        team_id: $("#chooseUpdateTeam").val()
      }
    };
    // dataForServer.participant.name = $(".updateParticipant input[id=name]").val();
    // dataForServer.participant.email = $(".updateParticipant input[id=email]").val();
    // dataForServer.participant.phone = $(".updateParticipant input[id=phone]").val();
    // dataForServer.participant.role = $(".updateParticipant input[id=role]").val();
    // dataForServer.participant.boat_id = $(".updateParticipant input[id=boat_id]").val();
    // dataForServer.participant.team_id = $(".addParticipant input[id=team_id]").val();
    var id = $('#participantId').val(); //captuers particicpants id

    fwmapi.updateParticipant(id, dataForServer, token, callback);
  });


  $('.updateBoat').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      boat : {
        title: $(".updateBoat input[id=title]").val(),
        description: $(".updateBoat input[id=description]").val(),
        avatar: $(".updateBoat input[id=avatar]").val(),
        capacity: $(".updateBoat input[id=capacity]").val()
      }
    };
    // dataForServer.participant.name = $(".updateParticipant input[id=name]").val();
    // dataForServer.participant.email = $(".updateParticipant input[id=email]").val();
    // dataForServer.participant.phone = $(".updateParticipant input[id=phone]").val();
    // dataForServer.participant.role = $(".updateParticipant input[id=role]").val();
    // dataForServer.participant.boat_id = $(".updateParticipant input[id=boat_id]").val();
    // dataForServer.participant.team_id = $(".addParticipant input[id=team_id]").val();
    var id = $('#boatId').val(); //captuers particicpants id
    fwmapi.updateBoat(id, dataForServer, token, addBoatCB);
  });

  // Delete An Activity processing
  $('deleteact').on('click', function(e){
    e.preventDefault();
    console.log('got to delete Acivity');
    console.log("acitivty id is: " + actId);
    fwmapi.deleteActivity(actId, token, deleteCB);
  });
  // end of Delete Activity processing



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

  $(document).on("click", "#edit-boat-button", function(event){
  var id = $(event.target).data("id");
  console.log(id);
  fwmapi.searchByBoatId(id, token, boatFormCB);
  });

  $(document).on("click", "#delete-boat-button", function(event){
    var id = $(event.target).data("id");
    fwmapi.deleteBoat(id, token, deleteBoatCB);
    console.log('the boat was deleted');
  });

  $(document).on("click", "#edit-team-button", function(event){
  var id = $(event.target).data("id");
  console.log(id);
  fwmapi.searchByTeamId(id, token, teamFormCB);
  });

  $(document).on("click", "#delete-team-button", function(event){
    var id = $(event.target).data("id");
    fwmapi.deleteTeam(id, token, deleteTeamCB);
    console.log('the team was deleted');
  });


  $('#showParticipantForm').on('click', function(e) {
    // $('#participantFormDiv').css("display", "block");
    // $('#putActivitiesList').css("display", "none");
    $('#participantFormDiv').show();
    $('#showParticipants').hide();
    $('#chooseBoatDiv').show();
    $('#chooseTeam').show();

  });

  $('#showSearch').on('click', function(e) {
    $('#searchDiv').css("display", "block");
    $('#chooseBoatDiv').show();
    $('#chooseTeamDiv').show();
    $('#showParticipants').hide();
    $('#showBoats').hide();
  });

  $('#showBoatForm').on('click', function(e) {
    $('#showBoatAdd').show();
  });

  $('#showTeamForm').on('click', function(e) {
    $('#showTeamAdd').show();
    $('#showTeams').hide();
  });

  // Create a Boat processing
  $('.addBoat').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      boat : {
        "title": $(".addBoat input[id=title]").val(),
        "description": $(".addBoat input[id=description]").val(),
        "avatar": $(".addBoat input[id=avatar]").val(),
        "capacity": $(".addBoat input[id=capacity]").val(),
        "open_seats":$(".addBoat input[id=capacity]").val()
      }
    };
    fwmapi.addBoat(dataForServer, token, addBoatCB);
  });
  // ----- END of Create Boat processing ----- //


  // Create an Participant processing
  $('.addParticipant').on('submit', function(e) {
    debugger;
    e.preventDefault();

    var dataForServer = {
      participant : {
        "name": $(".addParticipant input[id=name]").val(),
        "email": $(".addParticipant input[id=email]").val(),
        "phone": $(".addParticipant input[id=phone]").val(),
        "role": $(".addParticipant input[id=role]").val(),
        "boat_id": $("#chooseBoat").val(),
        "team_id": $("#chooseTeam").val()
      }
    };



    fwmapi.addParticipant(dataForServer, token, callback);
  });
  // ----- end of Create Participant processing ----- //

  // Create a Team processing
  $('.addTeam').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      team : {
        "team_name": $(".addTeam input[id=teamAddName]").val()
      }
    };
    fwmapi.addTeam(dataForServer, token, addTeamCB);
  });
  // ----- END of Create Team processing ----- //

  // Update a Team processing
  $('.updateTeam').on('submit', function(e) {
    e.preventDefault();
    debugger;
    var dataForServer = {
      team : {
        "team_name": $(".updateTeam input[id=teamUpName]").val(),
      }
    };
    fwmapi.updateTeam(dataForServer, token, updateTeamCB);
  });
  // ----- END of Update Team processing ----- //

});
