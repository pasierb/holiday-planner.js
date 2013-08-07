describe("CalendarView", function () {
  var view;
  var container;

  beforeEach(function () {
    var flag = false;
    var that = this;

    require(['views/planner/calendar'],function (CalendarView) {
      that.CalendarView = CalendarView;
      view = new CalendarView();
      flag = true;
    });

    waitsFor(function () {
      return flag;
    });
  });

  describe("when view is constructing", function () {
    it("should exist", function () {
      expect(view).toBeDefined();
    });
  });

  describe("when view is rendered", function () {

    beforeEach(function () {
      container = $("<div />", { class: "page" });
      $("body").append(container);
      view = new this.CalendarView();
      view.render();
      console.log(view.$el);
    });

    afterEach(function () {
      container.remove();
    });

    it("should have calendar", function () {
      expect($(".calendar-container", view.$el).length).toEqual(1);
    });
  });
});
