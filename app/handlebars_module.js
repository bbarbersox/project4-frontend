'use strict';

var actHandlebars = (function() {
  var activityData = {activities: [ {actTitle: "Fishing with a Mission", actDesc: "Fishing trip for students and Alumni of Boston Higashi School", actDate: "2016-8-15", actTime: "10:00 am"}, {actTitle: "Christmas Caroling", actDesc: "Christmas Caroling in Rockland Bradley Park", actDate: "2015-12-22", actTime: "7:00 pm"}, {actTitle: "Roller Skating", actDesc: "Roller Skating - Abington Skating Rink", actDate: "2016-1-12", actTime: "2:00 pm"}]};

  var activityClickShow = function activityClick(event) {
      var id = $(event.target).parent().data('id');
      fwmapi.listOneActivity(id, token, actFormCB);
  };

  var activityClickEdit = function activityClick(event) {
      var id = $(event.target).parent().data('id');
      fwmapi.listOneActivity(id, token, actFormCB);
  };

  var activityClickDelete = function activityClick(event) {
      var id = $(event.target).parent().data('id');
      fwmapi.deleteActivity(id, token, deleteCB);
  };

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
    $('.getact').css("display", "block");
    $('#putActivitiesList').css("display", "none");
    $('#updateAcivityDiv').css("display", "block");
  };
    // END --- populate a single record of activity data


  // delete a single activity from the database
  var deleteCB = function callback(error, data) {
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' +error.error);
        return;
      }
      console.log('you successfully deleted the activity' + data);
      $('#status').val('you successfully deleted the activity');
      // $('#result').val(JSON.stringify(data, null, 4));
    };
  // ----- end of Delete processing ----- //

    var actHandlebars = {
    displayHomepage: function(data){
      console.log('got to actHandlers');
      console.log(data);
      var activitiesTemplate = Handlebars.compile($('#activitiesList').html());
      var newHTML = activitiesTemplate(activityData);
      $("#putActivitiesList").html(newHTML);
    },

    displayActivities: function(data){
      console.log('got to actHandlebars');
      console.log(data);
      var activitiesTemplate = Handlebars.compile($('#activitiesList').html());
      var newHTML = activitiesTemplate(data);
      $("#putActivitiesList").html(newHTML);

      data.activities.forEach(function(act) {
        $($('div[data-id=' + act.id + ']').children('button').get(0)).on('click', activityClickShow);
        $($('div[data-id=' + act.id + ']').children('button').get(1)).on('click', activityClickEdit);
        $($('div[data-id=' + act.id + ']').children('button').get(2)).on('click', activityClickDelete);
      });
    },
      // setup handler for Show Activities function

    displayParticipants: function(data){

      console.log('got to actHandlebars');
      console.log(data);
      var participantsTemplate = Handlebars.compile($('#participantsList').html());
      var newHTML = participantsTemplate(data);
      $("#putParticipantsList").html(newHTML);

      data.participants.forEach(function(participant) {
        $($('div[data-id=' + participant.id + ']').children('button').get(0)).on('click', activityClickShow);
        $($('div[data-id=' + participant.id + ']').children('button').get(1)).on('click', activityClickEdit);
        $($('div[data-id=' + participant.id + ']').children('button').get(2)).on('click', activityClickDelete);
      });
    }
  };

  // actHandlebars.displayHomepage(activityData);

  // actHandlebars.displayActivities(activityData);

  return actHandlebars;
})();



