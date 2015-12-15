
var activityData = {activity: [ {actTitle: "Fishing with a Mission", actDesc: "Fishing trip for students and Alumni of Boston Higashi School", actDate: "2016-8-15", actTime: "10:00 am"}]};

/* var activityData = {activity: [ {actTitle: "Fishing with a Mission", actDesc: "Fishing trip for students and Alumni of Boston Higashi School", actDate: "2016-8-15", actTime: "10:00 am"}]}; */

var blogData = {blogs: [ {blogName: "My Biking Passion", name: "My first blog", details: "I created a blog!", date: "2015-10-15"}, {blogName: "My Biking Passion", name: "Essential Biking Safety Gear", details: "I created a blog!", date: "2015-10-15"},{blogName: "Rachel's blog", name: "My third blog", details: "I created a thing!", date: "2015-10-15"}]};

var navData = {username: "Rachel", url: "/Rachel/dogs", blogs: [ {blogName: "My Biking Passion", name: "My first blog", details: "I created a blog!", date: "2015-10-15"}, {blogName: "My Biking Passion", name: "Essential Biking Safety Gear", details: "I created a blog!", date: "2015-10-15"},{blogName: "Rachel's blog", name: "My third blog", details: "I created a thing!", date: "2015-10-15"}]};


/*
var bhHandlebars = {
  displayHomepage: function(data){
    var blogPostsTemplate = Handlebars.compile($('#blogPosts').html());
    var newHTML = blogPostsTemplate(data);
    $("#putBlogPosts").html(newHTML);
  },

  navbar: function(){

  },
*/


  var actHandlebars = {
  displayHomepage: function(data){
    console.log(data);
    var activitiesTemplate = Handlebars.compile($('#activitiesList').html());
    var newHTML = activitiesTemplate({activity: data});
    $("#putActivitiesList").html(newHTML);
  },

  navbar: function(){

  },

  editPost: function(data){
    console.log(data);
    var editData = data;
    var editPostTemplate = Handlebars.compile($("#dashboardEditPost").html());
    var newHTML = editPostTemplate(editData);
    $('#putEditPostHere').html(newHTML);
  },

  refreshPosts: function(data){
    var blogPostsDashboardTemplate = Handlebars.compile($('#blogPostsDashboard').html());newHTML= blogPostsDashboardTemplate(data);
      $('#blogListGoesHere').html(newHTML);

  },

  refreshPages: function(data){
    var pageListTemplate = Handlebars.compile($('#pageList').html());
    newHTML= pageListTemplate(data);
      $('#pageListGoesHere').html(newHTML);

  },

  displayDashboard: function(navData){

    var navbarTemplate = Handlebars.compile($("#dashboardNavbar").html());
    Handlebars.registerPartial('navbarPartial', navbarTemplate);

    var createPageTemplate = Handlebars.compile($("#dashboardCreatePage").html());
    Handlebars.registerPartial('createPagePartial', createPageTemplate);
    console.log("This is where it ACUTALLY FINDS IT");
    console.log($("#dashboardCreatePost").html());
    var createPostTemplate = Handlebars.compile($("#dashboardCreatePost").html());
    Handlebars.registerPartial('createPostPartial', createPostTemplate);

    var pageListTemplate = Handlebars.compile($('#pageList').html());
    Handlebars.registerPartial('pageListPartial', pageListTemplate);

    var blogPostsDashboardTemplate = Handlebars.compile($('#blogPostsDashboard').html());
    Handlebars.registerPartial('blogPostDashboard', blogPostsDashboardTemplate);


    var wholeDashboardTemplate = Handlebars.compile($("#wholeDashboard").html());
    newHTML= wholeDashboardTemplate(navData);
    $('#everythingExceptTemplates').html(newHTML);


  }

};

var blogHandlebars = {
 displayDashboard: function(blogData){
    var blogsTemplate = Handlebars.compile($('#blogLists').html());
    var newHTML = blogsTemplate(blogData);
    $("#putBlogLists").html(newHTML);
  }
};

// bhHandlebars.displayDashboard(navData);
// blogHandlebars.displayDashboard(blogData);
actHandlebars.displayHomepage(activityData);


