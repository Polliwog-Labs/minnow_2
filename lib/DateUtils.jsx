DateUtils={
  getTripDate(array){
  //takes an array of numerical dates in Unix time
  //and returns the first date in string form
    var tripDate = {string:'(TBD)'};
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
      tripDate.day = startDate.getDate();
      tripDate.year = startDate.getFullYear();
      tripDate.string = `${tripDate.day} ${tripDate.month}, ${tripDate.year}`
    }
    return tripDate.string;
  },

  dateConvert (date, time) {
    //time convert
    time = time.split(':')
    var hour = parseInt(time[0]);
    var min = parseInt(time[1]);

    //date
    date = date.split('-');
    var year = date[0]
    var month = date[1]
    var day = date[2]

    return new Date(year, month, day, hour, min)
  },

  getHTMLDate(value){
    var date = new Date(value);
    return date.getFullYear()+'-'+(date.getMonth() >= 9 ? '' : '0')+(date.getMonth()+1)+'-'+(date.getDate() >= 10 ? '' : '0')+date.getDate();
  }
  
}