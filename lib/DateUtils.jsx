DateUtils={
  getTripDate(array){
  //takes an array of numerical dates in Unix time
  //and returns the first date in string form
    var tripDate = {string:'Date Not Set'};
    var months = ['January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December'];
    if (array && array[0] && (array[0]!== NaN)){
      var startDate = new Date(array[0]);
      tripDate.month = months[startDate.getMonth()];
      tripDate.day = startDate.getDay();
      tripDate.year = startDate.getFullYear();
      tripDate.string = `${tripDate.day} ${tripDate.month}, ${tripDate.year}`
    }
    return tripDate.string;
  },

  toMilitary (time) {
    var hour = parseInt(time.match(/[0-9]{1,2}/)[0]);
    if (/pm/i.test(time) && hour < 12) hour = hour+12;
    if (hour === 12 && /am/i.test(time)) hour = 0;
    hour = hour >= 10 ? hour.toString() : '0'+hour.toString();
    return hour+time.match(/:[0-9]{2}/)[0];
  },

  dateConvert (date, time) {
    //time convert
    time = this.toMilitary(time).split(':')
    var hour = parseInt(time[0]);
    var min = parseInt(time[1]);
    console.log('time: ', hour, min)

    //date
    date = date.split('-');
    var year = date[0]
    var month = date[1]
    var day = date[2]

    return new Date(year, month, day, hour, min)
  }
}