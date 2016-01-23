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
  }
}