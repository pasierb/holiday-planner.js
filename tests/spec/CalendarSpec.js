describe("Calendar", function () {

  beforeEach(function () {
    var flag = false;
    var that = this;

    require(['models/calendar'],function (Calendar) {
      that.Calendar = Calendar;
      flag = true;
    });

    waitsFor(function () {
      return flag;
    });
  });

  it("to have year", function () {
    var calendar = new this.Calendar({ year: (new Date).getFullYear() });
    expect(calendar.get('year')).toEqual((new Date()).getFullYear());
  });

  describe("print", function () {
    var calendar;

    beforeEach(function () {
      calendar = new this.Calendar({ year: 2013 });
    });

    it("should print a week day", function () {
      var date = new Date();
      date.setFullYear(2013);
      date.setMonth(0);
      date.setDate(2);
      expect(calendar.printDay(date)).toEqual(""+
        "<td><div class=\"day-label\">2</div>"+
        "<a class=\"day\" href=\"#\"></a></td>"
      );
    });

    it("should print a weekend day", function () {
      var date = new Date();
      date.setFullYear(2013);
      date.setMonth(0);
      date.setDate(5);
      expect(calendar.printDay(date)).toEqual(""+
        "<td><div class=\"day-label\">5</div>"+
        "<div class=\"weekend\"></div></td>"
      );
    });

  });

});
