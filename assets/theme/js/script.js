$(function () {
    $('.checkbox input').on('click', function () {
        $(this).parent().toggleClass('active');
    })
})

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [55.759520, 37.622154],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'МЧС России',
            balloonContentHeader: 'МЧС России',
            balloonContent: 'телефон: (495) 624-19-46'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/theme/icons/icon-map.png',
            iconImageSize: [70, 53],
            iconImageOffset: [-20, -38]
        });

    myMap.geoObjects
        .add(myPlacemark);
});

// Карта с учреждениями


var map1;
var mapCollection1;
var mapPoints1;

ymaps.ready(init1);

function showMapPoints1() {
    mapCollection1 = undefined;
    map1.geoObjects.removeAll();
    console.log(mapCollection1);

    if (!mapCollection1) {
        mapCollection1 = new ymaps.GeoObjectCollection();
        map1.geoObjects.add(mapCollection1);
    }

    var icon1 = 'assets/theme/icons/map-gu_ico1.png';
    var icon2 = 'assets/theme/icons/map-gu_ico2.png';
    var icon3 = 'assets/theme/icons/map-gu_ico3.png';
    var icon4 = 'assets/theme/icons/map-gu_ico4.png';
    var icon5 = 'assets/theme/icons/map-gu_ico5.png';
    var icon6 = 'assets/theme/icons/map-gu_ico3.png';

    var type1 = $('#type1').parent().hasClass('active');
    var type2 = $('#type2').parent().hasClass('active');
    var type3 = $('#type3').parent().hasClass('active');
    var type4 = $('#type4').parent().hasClass('active');
    var type5 = $('#type5').parent().hasClass('active');
    var type6 = $('#type6').parent().hasClass('active');

    $.each(mapPoints1, function (i, item) {
        if (!type1 && item.type == 1)
            return;

        if (!type2 && item.type == 2)
            return;

        if (!type3 && item.type == 3)
            return;

        if (!type4 && item.type == 4)
            return;

        if (!type5 && item.type == 5)
            return;

        if (!type6 && item.type == 6)
            return;

        var coords = [
            parseFloat(item.lng),
            parseFloat(item.lat)
        ];

        var body = '';

        if (item.description)
            body += '<p><i>' + item.description + '</i></p>';

        if (item.address)
            body += '<p><i>' + item.address + '</i></p>';

        for (var i = 0; i < item.children.length; i++) {
            var child = item.children[i];
            body += '<p><a href="' + child.url + '">' + child.title + '</a></p>';
        }
        if (item.type == 1) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico1.png',
                iconImageSize: [41, 49],
                iconImageOffset: [-20, -38]
            });
        } else if (item.type == 2) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico2.png',
                iconImageSize: [39, 49],
                iconImageOffset: [-20, -38]
            });
        } else if (item.type == 3) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico3.png',
                iconImageSize: [46, 51],
                iconImageOffset: [-20, -38]
            });
        } else if (item.type == 4) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico4.png',
                iconImageSize: [39, 49],
                iconImageOffset: [-20, -38]
            });
        } else if (item.type == 5) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico5.png',
                iconImageSize: [39, 49],
                iconImageOffset: [-20, -38]
            });
        } else if (item.type == 6) {
            myPlacemark1 = new ymaps.Placemark(coords, {
                balloonContentHeader: item.title,
                balloonContentBody: body
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'assets/theme/icons/map-gu_ico6.png',
                iconImageSize: [41, 48],
                iconImageOffset: [-20, -38]
            });
        }
        mapCollection1.add(myPlacemark1);
    });

    console.log(mapCollection1);
}

function init1() {
    map1 = new ymaps.Map("map1", {
        center: [65, 104],
        zoom: 2,
        behaviors: ['default', 'scrollZoom']
    });

    // Сменить адрес где будет лежать json файл
    mapPoints1 = (function () {
        $.ajax({
            'async': false,
            'global': false,
            'url': 'http://localhost:3000/objects',
            'dataType': "json",
            'success': function (data) {
                mapPoints1 = data;
            }
        });
        return mapPoints1;
    })();

    showMapPoints1();

    $('#type1, #type2, #type3, #type4, #type5, #type6').change(function() {
        showMapPoints1();
    });
}