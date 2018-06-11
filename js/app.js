$('#getWeatherbtn').click(function () {
    $('#chart-container').hide();
    console.log('button clicked');
    var cityName = $('#cityInput').val();
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=239e74eb5071fd8dfb58caa184e2da74',
        success: function (data) {
            console.log('In success callback');
            console.log(data);
            var currentTemp = Math.round(data.main.temp - 270);
            var currentPresuure = data.main.pressure;
            var humidity = data.main.humidity;
            $('#currentTemperature').html(currentTemp);
            $('table').removeClass('results-hide');
            $('table').show();
        },
        error: function (err) {
            console.log('In error callback');
            console.log(err);
        }
    });
})

$('#getForecastbtn').click(function () {
    $('table').hide();
    var cityName = $('#cityInput').val();
    $.ajax({
        type: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=239e74eb5071fd8dfb58caa184e2da74',
        success: function (data) {
            console.log('In success callback');
            console.log(data);

            listOfDates = data.list.map(function (ele) {
                var temp=moment(ele.dt  * 1000).format('dddd, h:mm a');
                return temp;
            });
            console.log(listOfDates);
            listOfTemp = data.list.map(function (ele) { return Math.round(ele.main.temp -270) });
            console.log(listOfTemp);
            plotchart(listOfTemp,listOfDates);
        },
        error: function (err) {
            console.log('In error callback');
            console.log(err);
        }
    });

    function plotchart(tempArr, datesArr) {
        $('#chart-container').removeClass('results-hide');
        $('#chart-container').show();
        Highcharts.chart('chart-container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter:function() {
                        return this.value + '°';
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared:true 
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth:1
                    }
                }
            },
            series: [{
                name: cityName,
                marker:{
                    symbol: 'square'
                },
                data: tempArr
            }]
        });
    }                                              
})
   



