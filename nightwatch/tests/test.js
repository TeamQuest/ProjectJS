export default {
  'Test if server run' : function (browser) {
    browser
      .url('http://0.0.0.0:8000')
      .pause(1000)
      .assert.title("ProjectJS")
      .end();
  },

  before: function(browser){
    browser.resizeWindow(1024, 768);
  },


  'Phaser Game Boots Test' : function (client) {
    var thrustEngine = client.page.ProjectJS();
    thrustEngine.navigate()
      .waitForElementVisible('body', 1000)
  },

};
